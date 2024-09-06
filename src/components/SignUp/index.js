import './index.css'
import { Component } from 'react'
import app from '../firebase_config'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(app);



class SignUp extends Component {

  constructor(props) {
    super(props);
    this.onCaptchVerify = this.onCaptchVerify.bind(this);
  }

  state = { errorMsg: '', username: '', password: '', email: "", phoneNum: "", verifyBtn: false, verifyOtp: false, otp: "" }

  

  onCaptchVerify = () => {
    if (!document.getElementById('recaptcha-container')) {
      console.error('Recaptcha container element not found.');
      return;
    }
  
    try {
      this.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            this.onSignInSubmit();
          },
          'expired-callback': () => {
            alert("reCAPTCHA expired. Please verify again.");
          },
        },
        auth
      );
      this.recaptchaVerifier.render();
    } catch (error) {
      console.error("Error during reCAPTCHA setup:", error);
    }
  };
  
  


  verifyCode(){
    window.confirmationResult.confirm(this.state.otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user)
      alert("verification done")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      alert("Invalid Otp")
      // ...
    });
  }

  onSignInSubmit() {
    
    const { phoneNum } = "+91" + this.state
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNum, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("otp sended")
        this.setState({verifyOtp:true})
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
      });

  }

  submitDetails = async event => {
    event.preventDefault()
    const { username, password, email } = this.state
    const userDetails = {
      username: username,
      password: password,
      email: email,
    }

    const url = 'https://register-app-node-js-with-mongodb-cbrm.onrender.com/register'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (data.status === "User Created Successfully") {
      alert("User Created Successfully")
      window.location.href = "/login"
    } else {
      this.setState({ errorMsg: data.status })
    }
  }

  trackNumber = (event) => {
    this.setState({ phoneNum: event.target.value },function () {
      if (this.state.phoneNum.length === 10) {
        this.setState({ verifyBtn: true })
      }
    })
  }


  trackUsername = event => {
    this.setState({ username: event.target.value })
  }

  navigateToLoginPage = () => {
    window.location.href = "/login"
  }

  trackEmail = event => {
    this.setState({ email: event.target.value })
  }

  trackPassword = event => {
    this.setState({ password: event.target.value })
  }



  render() {
    const { errorMsg } = this.state
    return (
      <div className="bg-containerr">
        <form className="card" onSubmit={this.submitDetails}>
          <div id='recaptcha-container'></div>
          <img
            className="website-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label htmlFor="user-id">USERNAME</label>
          <div className='div1'><input
            onChange={this.trackUsername}
            type="text"
            id="user-id"
            placeholder="Username"
            required
            className='username'
          /></div>
          <div className='div1'>
            <label htmlFor="password-id">PASSWORD</label>
            <input
              onChange={this.trackPassword}
              id="password-id"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className='div1'><label htmlFor="email-id">Email</label>
            <input
              onChange={this.trackEmail}
              id="email-id"
              type="email"
              required
              placeholder="Email"
            /></div>
         
          
          <button type="submit">Sign Up</button>
          {errorMsg !== undefined ? (<p className="error-para">{errorMsg}</p>) : null}
          <button onClick={this.navigateToLoginPage} type='button'>Login</button>
        </form>
      </div>
    )
  }
}

export default SignUp