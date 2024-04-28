import { useEffect, useState } from "react";
import "./Login.scss";
import { GoPerson } from "react-icons/go";
import { ImSpinner2 } from 'react-icons/im'
import { MdOutlineLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../redux/Auth";
function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const location = useNavigate()
  const state = useSelector((i) => i.auth);
  //useEffect(() => {
  //  location('/')
  //}, [state.isAuthenticated,location]);
  const handleInputs = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleForm = async (e) => {
    e.preventDefault();
    if (user) {
      await dispatch(fetchLogin(user));
    }
  };


  window.scrollTo(0, 0);
  return (
    <div className="login">
      <div className="login-container">
        <h1>Log In To Liverr</h1>
        {state?.response.status === 401 && state.response.message && (
          <div className="response-error">{state.response.message}</div>
        )}
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="login-email">
            <GoPerson className="email-icon" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="login-input"
              value={user.email}
              onChange={handleInputs}
              required
            />
          </div>
          <div className="login-password">
            <MdOutlineLock className="password-icon" />
            <input
              type="password"
              placeholder="password"
              name="password"
              className="login-input"
              value={user.password}
              onChange={handleInputs}
              required
            />
          </div>
          <div className="login-forget">
            <span className="forget-text">
              If you forgot your password, Click
            </span>
            <Link className="forget-link" to="/forgot-pasword">
              Forgot Password?
            </Link>
          </div>

          {state.status === "loading" ? (
            <button className="login-login-btn " onClick={handleForm} disabled>
              <ImSpinner2 className='ImSpinner2' />
            </button>
          ) : (
            <button className="login-login-btn" onClick={handleForm}>
              Log In
            </button>
          )}
        </form>
        <div className="login-signup">
          <div className="login-text-twolines">
            <span className="login-line1"></span>
            <span className="login-text-between">
              Don't have an Liverr account?
            </span>
            <span className="login-line1"></span>
          </div>
          <Link to="/register">
            <button className="login-sign-button">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
