import React, { useEffect } from "react";
import './SignupForm.css';
import { useFormState } from '../../hooks/useFormState';
import { useFormValidation } from '../../hooks/useFormValidation';
import FormField from './FormField';
import { mentorFields } from './config/formFields';
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const MentorSignupForm = ({ onSuccess, isEditMode = false, initialData = null }) => {
    const navigate = useNavigate();
    
    const {
        formData,
        loading,
        error,
        success,
        handleChange,
        setLoading,
        setError,
        setSuccess,
        resetForm,
        setFormData
    } = useFormState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',  
        imageUrl: '',
        technologies: '',
        yearsOfExperience: '',
        linkedin: '',
        phone: '',
        description: '',
        userType: 'mentor'
    });

    // Pre-fill form data when in edit mode
    useEffect(() => {
        if (isEditMode && initialData) {
            // Create a copy of the data to avoid reference issues
            const dataToUse = { 
                ...initialData,
                technologies: Array.isArray(initialData.technologies) 
                    ? initialData.technologies.join(', ') 
                    : initialData.technologies,
                password: '' // Don't prefill password
            };
            
            // Update form data
            setFormData(dataToUse);
        }
    }, [isEditMode, initialData]);

    const { validateRequired, validateEmail, validateImageUrl, validatePassword } = useFormValidation();

    const validateForm = () => {
        const requiredFields = isEditMode 
            ? ['firstName', 'lastName', 'technologies', 'yearsOfExperience', 'linkedin', 'phone'] 
            : ['firstName', 'lastName', 'email', 'password', 'technologies', 'yearsOfExperience', 'linkedin', 'phone'];
        
        const missingFields = validateRequired(requiredFields, formData);
        if (missingFields) {    
            setError(missingFields);
            return false;
        };

        const emailError = validateEmail(formData.email);
        if (emailError) {
            setError(emailError);
            return false;
        };

        const imageError = validateImageUrl(formData.imageUrl);
        if (imageError) {   
            setError(imageError);
            return false;
        };

        // Only validate password if not in edit mode or if a new password is provided and not empty
        if (!isEditMode || (formData.password && formData.password.trim() !== '')) {
            const passwordError = validatePassword(formData.password);
            if (passwordError) {    
                setError(passwordError);
                return false;
            };
        }

        return true;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const url = isEditMode 
                ? `${baseURL}/api/mentors/update/${formData._id}`
                : `${baseURL}/api/users/register`;
                
            const method = isEditMode ? 'PUT' : 'POST';
            
            const dataToSend = { ...formData };
            
            if (isEditMode && (!dataToSend.password || dataToSend.password.trim() === '')) {
                delete dataToSend.password;
            }
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
                },
                body: JSON.stringify(dataToSend)
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                
                if (!isEditMode) {
                    sessionStorage.setItem('authToken', data.token);
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                    resetForm();
                } else {
                    // Update the user in session storage with the updated info
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                }
                
                if (onSuccess) onSuccess(data.user);
                navigate('/');
            } else {
                setError(data.message || (isEditMode ? 'Update failed' : 'Registration failed'));
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
                <h2>{isEditMode ? 'Edit Profile' : 'Mentor Registration'}</h2>

                {mentorFields.map(field => {
                    // Determine if this field should be required
                    const isRequired = isEditMode && field.name === 'password' 
                        ? false  // Not required in edit mode
                        : field.required;
                    
                    return (
                        <FormField
                            key={field.name}
                            {...field}
                            required={isRequired}  // Override the required property
                            value={formData[field.name]}
                            onChange={handleChange}
                            disabled={loading || (isEditMode && field.name === 'email')}
                        />
                    );
                })}

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                <button
                    type="submit"
                    disabled={loading}
                    className="submit-button"
                >
                    {loading ? (isEditMode ? 'Updating...' : 'Registering...') : 
                              (isEditMode ? 'Update Profile' : 'Register')}
                </button>
            </form>
        </div>
    );
};

export default MentorSignupForm;


