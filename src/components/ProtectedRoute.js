import {Redirect,Route} from "react-router-dom"

const ProtectedRoute=(props)=>{
    const token=window.localStorage.getItem("jwt")
    if(token===null){
        return <Redirect to='/login'/>
    }
    return <Route {...props}/>
}

export default ProtectedRoute