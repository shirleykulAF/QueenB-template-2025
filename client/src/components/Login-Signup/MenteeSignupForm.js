import React from "react";
import './MenteeSignupForm.css';
import { useFormState } from '../hooks/FormState';
import { useFormValidation } from '../hooks/FormValidation';
import FormField from '../FormField';
import { menteeFields } from './config/formFields';

const MenteeSignupForm = ( {onSuccess} ) => {
    const {
        formData,
        loading,
        error,
        success,
        handleChange,
        setLoading,
        setError,
        setSuccess,
        resetForm
    } = useFormState({
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        userType: 'mentee'
    });

    const { validateRequired, validateEmail, validateImageUrl } = useFormValidation();


    const validateForm = () => {

        const requiredFields = ['firstName', 'lastName', 'email'];
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
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    image: formData.imageUrl ? formData.imageUrl : undefined
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                resetForm();
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
                <h2>Mentee Sign Up</h2>

                {menteeFields.map(field => (
                    <FormField
                        key={field.name}
                        {...field}
                        value={formData[field.name]}
                        onChange={handleChange}
                        disabled={loading}
                    />
                ))}

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

export default MenteeSignupForm;


