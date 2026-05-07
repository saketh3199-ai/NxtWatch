import { Redirect,Route } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = (props)=>
{
    const JWTToken = Cookies.get("jwtToken")


    if (JWTToken === undefined)
    {
        return <Redirect to="/login" />
    }

    return <Route {...props} />
}


export default ProtectedRoute