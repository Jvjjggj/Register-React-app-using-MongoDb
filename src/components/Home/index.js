import {Component} from 'react'
import './index.css'

class Home extends Component{

    state={email:"",username:""}

    logout=()=>{
        window.localStorage.clear()
        window.location.href="/login"
    }

    componentDidMount(){
        this.getData()
    }

    getData=async()=>{

        const token=window.localStorage.getItem("jwt")
        const options={
            method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({token}),
          }
        const response=await fetch("https://register-app-node-js-with-mongodb-cbrm.onrender.com/user-details",options)
        const data=await response.json()
        const {email,username}=data.data
        this.setState({email,username})
    }

    render(){
        const {email,username}=this.state
        return(
            <div className='home'>
                <div className='card-container'>
                <h1>Hi User</h1>
                <p className='p'>Email:</p>
                <p>{email}</p>
                <p className='p'>Username:</p>
                <p>{username}</p>
                <button type='button' onClick={this.logout} className='btn btn-primary'>Logout</button>
                </div>
            </div>
        )
    }
}

export default Home