import React, {useState} from "react";
import './MentorSignupForm.css';

const MentorSignupForm = ( {onSuccess} ) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        userType: 'mentor', // Default user type for MenteeSignupForm
        technologies: '',
        yearsOfExperience: '',
        description: '',
        phone: '',
        linkedin: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (error) setError('');
        if (success) setSuccess('');
    };
    

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.email) {
            setError('All fields are required');
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Email is invalid');
            return false;
        }
        if (formData.imageUrl && !isValidImageUrl(formData.imageUrl)) {
            setError('Please enter a valid image URL');
            return false;
        }
        return true;
    };

    const isValidImageUrl = (url) => {
        try {
            new URL(url);
            return /\.(jpg|jpeg|png|gif|webp)$/i.test(url) || url.includes('imgur') || url.includes('cloudinary') || url.includes('unsplash');
        } catch {
            console.error('Invalid URL:', url);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const submitData = new FormData();
            submitData.append('firstName', formData.firstName);
            submitData.append('lastName', formData.lastName);
            submitData.append('email', formData.email);
            submitData.append('userType', formData.userType);
            submitData.append('technologies', formData.technologies);
            submitData.append('yearsOfExperience', formData.yearsOfExperience);
            submitData.append('description', formData.description);
            submitData.append('phone', formData.phone);
            submitData.append('linkedin', formData.linkedin);
            
            if (formData.image) {
                submitData.append('image', formData.image);
            }

            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                setFormData( {
                    firstName: '',
                    lastName: '',
                    email: '',
                    image: '',
                    userType: 'mentor', // Reset to default user type  
                    technologies: '',
                    yearsOfExperience: '',
                    description: '',
                    phone: '',
                    linkedin: ''  
                } ); 
                if (onSuccess) onSuccess(data.user); // Call the onSuccess callback with the user data
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (error) {
            setError('Server error, please try again later');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mentee-signup-container">
            <form onSubmit={handleSubmit} className="mentee-signup-form">
                <h2>Sign Up</h2>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="linkedin">Linkedin URL</label>
                    <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Profile Image URL (optional) </label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        accept="imageUrl/*"
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="https://example.com/image.jpg"
                    />

                    <small className="file-help">Insert image URL path </small>
                
                    {formData.imageUrl && (
                        <div className="image-preview-container">
                            <img 
                                src={formData.imageUrl}
                                alt="Preview" 
                                className="imageUrl-preview" />
                            
                        </div>
                    )}                
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                <button
                    type="submit"
                    disabled={loading}
                    className="submit-button"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form> 
           
        </div>
    );
};

export default MentorSignupForm;


