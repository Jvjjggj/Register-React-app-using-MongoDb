import { Component } from "react";

class Forgot extends Component {
    state = { email: "" }


    handleSubmit = async (e) => {
        e.preventDefault()
        const { email } = this.state
        const response = await fetch("https://register-app-node-js-with-mongodb-cbrm.onrender.com/forget-password", {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ email }),
        })
        const body=await response.json()
        
        if(body.ok==="error"){
            alert("User Not Found")
        }
        else if(body.ok==="Passwords should be same"){
            alert("Passwords should be same")
        }
        else{
            alert("Email sent")
        }
    }

    render() {
        return (
            <div className="bg-containerr">
                <form className="card" onSubmit={this.handleSubmit}>
                    <h3>Forgot Password</h3>
                    <label htmlFor="email-id">Email</label>
                    <input type="email" onChange={(e) => this.setState({ email: e.target.value })} id='email-id' />
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-right">
                        <a href="/register" className="l">Sign Up</a>
                    </p>
                </form>
            </div>
        )
    }
}

export default Forgot