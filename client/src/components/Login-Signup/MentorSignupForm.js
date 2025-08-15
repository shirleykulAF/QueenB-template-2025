import React from "react";
import './SignupForm.css';
import { useFormState } from '../../hooks/useFormState';
import { useFormValidation } from '../../hooks/useFormValidation';
import FormField from './FormField';
import { mentorFields } from './config/formFields';

const MentorSignupForm = ( {onSuccess} ) => {
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
        passworsd: '',
        imageUrl: '',
        technologies: '',
        yearsOfExperience: '',
        linkedIn: '',
        phone: '',
        description: '',
        userType: 'mentor'
    });

    const { validateRequired, validateEmail, validateImageUrl, validatePassword } = useFormValidation();

    const validateForm = () => {
        const requiredFields = ['firstName', 'lastName', 'email', 'password', 'technologies', 'yearsOfExperience', 'linkedin', 'phone'];
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

        const passwordError = validatePassword(formData.password);
        if (passwordError) {    
            setError(passwordError);
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
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
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
                <h2>Mentor Registration</h2>

                {mentorFields.map(field => (
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

export default MentorSignupForm;


