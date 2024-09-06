
import './index.css'

const ProjectHome=()=>{
    const navigateToLogin=()=>{
        window.location.href="/login"
    }
    const navigateToRegister=()=>{
        window.location.href="/register"
    }
    return(
        <div className="main-container">
            <h1>Login Register App</h1>
            <div className="login-register-card">
                <button onClick={navigateToLogin} type='button'>Login</button>
                <button onClick={navigateToRegister} type='button'>Register</button>
            </div>
        </div>
    )
}

export default ProjectHome