import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/authActions.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.auth.error);

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(registerUser(values))
            .then(() => {
                setSubmitting(false);
                navigate('/');
            })
            .catch(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='bg-white p-3 rounded w-25  border'>
                <h2>Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form >
                            <div className='mb-3'>
                                <label htmlFor='name'><strong>Name</strong></label>
                                <Field type='text' name='name' className='form-control rounded-0' />
                                <ErrorMessage name='name' component='div' className='text-danger' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='email'><strong>Email</strong></label>
                                <Field type='email' name='email' className='form-control rounded-0' />
                                <ErrorMessage name='email' component='div' className='text-danger' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='password'><strong>Password</strong></label>
                                <Field type='password' name='password' className='form-control rounded-0' />
                                <ErrorMessage name='password' component='div' className='text-danger' />
                            </div>
                            <button type='submit' className='btn btn-success w-100 rounded-0' disabled={isSubmitting}>Signup</button>
                            <p>Already Have an Account then click on Login</p>
                            <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signup;


