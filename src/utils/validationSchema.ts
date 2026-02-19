import * as Yup from 'yup';

export const applicationValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contact: Yup.string()
    .matches(/^[0-9]+$/, 'Numbers only')
    .min(10, 'Minimum 10 digits')
    .required('Contact number is required'),
  reason: Yup.string()
    .min(20, 'Minimum 20 characters')
    .required('This field is required'),
});
