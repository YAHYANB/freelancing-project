import { Link } from 'react-router-dom';
import './Register.scss';
import { ImSpinner2 } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Countries from '../../Cities.json'
import { fetchRegister } from '../../redux/Auth';

const Register = () => {
  const state = useSelector((i) => i.auth);
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    country: '',
    email: "",
    password: ""

  });
  const dispatch = useDispatch();

  const handleInputs = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleForm = async (e) => {
    e.preventDefault();
    await dispatch(fetchRegister(user));
  };

  window.scrollTo(0, 0);
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Sign Up to Liverr</h1>
          <p>Find quality talent or land your dream job</p>
        </div>
        <form className="register-form" onSubmit={handleForm}>
          <div className="form-group-full-name">
            <div className='form-fname'>
              <label>First Name</label>
              <input type="text" name='fname' value={user.fname} onChange={handleInputs} />
            </div>
            <div className='form-lname'>
              <label>Last Name</label>
              <input type="text" name='lname' value={user.lname} onChange={handleInputs} />
            </div>
          </div>
          <div className="form-group">
            <label>Work email address</label>
            <input type="email" placeholder="" name='email' value={user.email} onChange={handleInputs} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name='password' placeholder="Password (8 or more characters)" value={user.password} onChange={handleInputs} />
          </div>
          <div className="country-select">
            <label>Country</label>
            <select name='country' value={user.country} onChange={handleInputs}>
              <option selected>Select Country</option>
              {Countries.map((city, index) => (
                  <option value={city} key={index}>{city}</option>
                ))
              }
            </select>
          </div>
          <div className="register-footer">
            <p >By clicking to Create My Account, you agree to the Liverr Terms of Service and Privacy Policy.</p>
          </div>
          {state.status === "loading" ? (
            <button className="login-login-btn " onClick={handleForm} disabled>
              <ImSpinner2 className='ImSpinner2' />
            </button>
          ) : (
            <button type="submit">Create My Account</button>
          )}
          <div className="register-footer">
            <p>Already have an account? <Link to='/login' className='footer-link'>Log In</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
