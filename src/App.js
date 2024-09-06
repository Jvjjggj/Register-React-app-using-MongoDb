import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import Home from './components/Home'
import ProjectHome from './components/HomeProject'
import ProtectedRoute  from './components/ProtectedRoute'
import Forgot from './components/Forgot'
import './App.css'




// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ProjectHome}/>
      <ProtectedRoute exact path='/user-details' component={Home}/>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={SignUp}/>
      <Route exact path="/forget-password" component={Forgot}/>
    </Switch>
  </BrowserRouter>
)

export default App