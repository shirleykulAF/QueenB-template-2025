const express = require('express');
const router = express.Router();
const Tip = require('../models/Tip');
const User = require('../models/User');

// Middleware to check if user is authenticated
const requireAuth = async (req, res, next) => {
    try {
        const userId = req.headers['user-id'];
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Authentication error' });
    }
};

// Middleware to check if user is a mentor
const requireMentor = (req, res, next) => {
    if (req.user.userType !== 'mentor') {
        return res.status(403).json({ error: 'Only mentors can perform this action' });
    }
    next();
};

// Get all active tips (public endpoint)
router.get('/', async (req, res) => {
    try {
        const { category, search, limit = 20, page = 1 } = req.query;
        
        let query = { isActive: true };
        
        // Filter by category if provided
        if (category && category !== 'All') {
            query.category = category;
        }
        
        // Search in title, content, and tags
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { title: searchRegex },
                { content: searchRegex },
                { tags: searchRegex }
            ];
        }
        
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const tips = await Tip.find(query)
            .populate('author', 'firstName lastName image')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Tip.countDocuments(query);
        
        res.json({
            tips,
            pagination: {
                current: parseInt(page),
                total: Math.ceil(total / parseInt(limit)),
                hasMore: skip + tips.length < total
            }
        });
    } catch (error) {
        console.error('Error fetching tips:', error);
        res.status(500).json({ error: 'Failed to fetch tips' });
    }
});

// Get a random active tip (public endpoint)
router.get('/random', async (req, res) => {
    try {
        const results = await Tip.aggregate([
            { $match: { isActive: true } },
            { $sample: { size: 1 } }
        ]);

        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'No tips available' });
        }

        const tip = results[0];
        return res.json({
            _id: tip._id,
            title: tip.title || '',
            text: tip.content || tip.title || '',
            content: tip.content || ''
        });
    } catch (error) {
        console.error('Error fetching random tip:', error);
        res.status(500).json({ error: 'Failed to fetch random tip' });
    }
});

// Get tip by ID (public endpoint)
router.get('/:id', async (req, res) => {
    try {
        const tip = await Tip.findById(req.params.id)
            .populate('author', 'firstName lastName image');
            
        if (!tip || !tip.isActive) {
            return res.status(404).json({ error: 'Tip not found' });
        }
        
        res.json(tip);
    } catch (error) {
        console.error('Error fetching tip:', error);
        res.status(500).json({ error: 'Failed to fetch tip' });
    }
});

// Create new tip (mentors only)
router.post('/', requireAuth, requireMentor, async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        
        const tip = new Tip({
            title,
            content,
            category: category || 'Other',
            tags: tags || [],
            author: req.user._id
        });
        
        await tip.save();
        
        const populatedTip = await Tip.findById(tip._id)
            .populate('author', 'firstName lastName image');
            
        res.status(201).json(populatedTip);
    } catch (error) {
        console.error('Error creating tip:', error);
        res.status(500).json({ error: 'Failed to create tip' });
    }
});

// Update tip (mentors only, only their own tips)
router.put('/:id', requireAuth, requireMentor, async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        
        const tip = await Tip.findById(req.params.id);
        if (!tip) {
            return res.status(404).json({ error: 'Tip not found' });
        }
        
        // Check if user is the author of the tip
        if (tip.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You can only edit your own tips' });
        }
        
        const updates = {};
        if (title !== undefined) updates.title = title;
        if (content !== undefined) updates.content = content;
        if (category !== undefined) updates.category = category;
        if (tags !== undefined) updates.tags = tags;
        
        const updatedTip = await Tip.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        ).populate('author', 'firstName lastName image');
        
        res.json(updatedTip);
    } catch (error) {
        console.error('Error updating tip:', error);
        res.status(500).json({ error: 'Failed to update tip' });
    }
});

// Delete tip (mentors only, only their own tips)
router.delete('/:id', requireAuth, requireMentor, async (req, res) => {
    try {
        const tip = await Tip.findById(req.params.id);
        if (!tip) {
            return res.status(404).json({ error: 'Tip not found' });
        }
        
        // Check if user is the author of the tip
        if (tip.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You can only delete your own tips' });
        }
        
        await Tip.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tip deleted successfully' });
    } catch (error) {
        console.error('Error deleting tip:', error);
        res.status(500).json({ error: 'Failed to delete tip' });
    }
});

// Get tips by author (mentors can see their own tips)
router.get('/author/:authorId', requireAuth, async (req, res) => {
    try {
        const { authorId } = req.params;
        
        // Users can only see their own tips, or all tips if they're a mentor
        if (req.user.userType !== 'mentor' && authorId !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }
        
        const tips = await Tip.find({ 
            author: authorId,
            isActive: true 
        })
        .populate('author', 'firstName lastName image')
        .sort({ createdAt: -1 });
        
        res.json(tips);
    } catch (error) {
        console.error('Error fetching author tips:', error);
        res.status(500).json({ error: 'Failed to fetch tips' });
    }
});

module.exports = router;
