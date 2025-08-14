export const menteeFields = [
  {
    name: 'firstName',
    label: 'firstName',
    type: 'text',
    required: true,
    placeholder: 'Insert your first name'
  },
  {
    name: 'lastName',
    label: 'lastName',
    type: 'text',
    required: true,
    placeholder: 'Insert your last name'
  },
  {
    name: 'email',
    label: 'email',
    type: 'email',
    required: true,
    placeholder: 'Insert your email'
  },
  {
    name: 'imageUrl',
    label: 'imageUrl',
    type: 'url',
    required: false,
    placeholder: 'https://example.com/image.jpg'
  }
];

export const mentorFields = [
  ...menteeFields,
    {
        name: 'technologies',
        label: 'technologies',
        type: 'text',
        required: true,
        placeholder: 'React, Node.js, Python'
    },
    {
        name: 'yearsOfExperience',
        label: 'Years Of Experience',
        type: 'number',
        required: true
    },
    {
        name: 'linkedin',
        label: 'Linkedin URL',
        type: 'url',
        required: true,
        placeholder: 'https://www.linkedin.com/in/yourprofile'
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: 'Insert your phone number'
    },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        required: true,
        placeholder: 'Tell us about yourself and your mentoring style'
    }
];