import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../actions/authActions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(loginUser(values));
        if (localStorage.getItem("token")) {
          navigate("/home");
          toast.success("Login successful");
        } else {
          console.error("Login failed:", Response.error);
        }
      } catch (error) {
        console.error("Login failed:", error);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-25 border">
        <h2>Login LMS</h2>
        <form onSubmit={formik.handleSubmit} >
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" id="email" name="email" className="form-control rounded-0" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" id="password" name="password" className="form-control rounded-0" {...formik.getFieldProps("password")} />
            {formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">SignIn</button>
          <p>Not Have an Account then click on Login</p>
          <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Signup</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
