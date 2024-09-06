import './index.css'
import {Component} from 'react'

class LoginForm extends Component {
  state = {errorMsg: '', email: '', password: ''}

  navigateToHome = JwtToken => {
    
    const {history} = this.props
    history.push('/user-details')
    window.localStorage.setItem("jwt",JwtToken)
    window.location.href="./user-details"
  }

  submitDetails = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const userDetails = {
      email,
      password,
    }

    const url = 'https://register-app-node-js-with-mongodb-cbrm.onrender.com/login'
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
    console.log(data)
    if (data.status==="Login Successfully") {
      console.log(data)
      alert("Login Succesffuly")
      this.navigateToHome(data.token)
    } else {
      console.log("bye")
      this.setState({errorMsg: data.status})
    }
  }

  trackEmail= event => {
    this.setState({email: event.target.value})
  }

  trackPassword = event => {
    this.setState({password: event.target.value})
  }

  register=()=>{
    window.location.href="/register"
  }

  render() {
    const {errorMsg} = this.state
    const token=window.localStorage.getItem("jwt")
    if(token){
      window.location.href="/user-details"
    }
    return (
      <div className="bg-containerr">
        <form className="card" onSubmit={this.submitDetails}>
          <img
            className="website-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label htmlFor="user-id">Email</label>
          <input
            onChange={this.trackEmail}
            type="email"
            id="user-id"
            placeholder="email"

          />
          <label htmlFor="password-id">PASSWORD</label>
          <input
            onChange={this.trackPassword}
            id="password-id"
            type="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <span className="error-para">{errorMsg}</span>
          <div className='forget-register-container'>
            <a className='l' href="/forget-password">Forget</a>
            <a className='l' href='/register'>Register</a>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm