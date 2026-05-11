import { Component } from "react";
import "./index.css"
import Cookies from 'js-cookie'
import SavedVidContextObj from "../../context/SavedVidContext";


const LoginApiUrl = "https://apis.ccbp.in/login"


class LoginRoute extends Component
{
    
    
    
    
    state={
        userName:"",
        password:"",
        showPassword:false,
        loginStatus:true,
        errorMsg:""
    }

    
    
    
    
    
    
    
    //1.BELOW FUNCTION REGISTERS USER NAME INTO THE STATE FROM INPUT FIELD
    registerUN = (event)=>
    {
        const inputUNByUsr = event.target.value
        this.setState({userName:inputUNByUsr})
    }









    
    //2.BELOW FUNCTION REGISTERS USER PASSWORD INTO THE STATE FROM INPUT FIELD
     registerUP = (event)=>
    {
        const inputUPByUsr = event.target.value
        this.setState({password:inputUPByUsr})
    }


    
    











    //3.BELOW FUNCTION SHOWS/HIDES PASSWORD
    ShowHidePass = (event)=>
    {
        const ValueOfChecked = event.target.checked
        this.setState({showPassword:ValueOfChecked})
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //4.THE BELOW FUNCTION WILL SUBMIT THE FORM I.E CALL API
    SubmitForm = async (event)=>
    {
        event.preventDefault()
        const {userName,password} = this.state
        const userDataObj = {username:userName,password:password}
        const options = {method:"POST",body:JSON.stringify(userDataObj)}
        const response = await fetch(LoginApiUrl,options)
        const data = await response.json()
        if (response.ok)
        {
            this.setState({loginStatus:true,errorMsg:""})
            //1.access token
            //2.store in cookie
            //3.make it go to home route
            const jwtToken = data.jwt_token
            //console.log(jwtToken)
            Cookies.set('jwtToken',jwtToken, {expires: 30})
            const {history} = this.props
            history.push("/")
        
        }
        else
        {
            const ErrorMessage = data.error_msg
            this.setState({loginStatus:false,errorMsg:ErrorMessage})
            //1.show the error_msg
            // console.log(data.error_msg)

        }


    }
    
    
    
    
   
    




    //5. THE BELOW FUNCTION RENDERS ERROR MESSAGE

    renderErrorMsg = ()=>
    {
         const {loginStatus,errorMsg} = this.state

         if (loginStatus===false)
         {
            return <p className="error-message">*{errorMsg}</p>
         }
         else
         {
            return null
         }
    }







    
    
    
    render()
    {

        const {showPassword} = this.state


        const LoginRouteConsumer = 
        <SavedVidContextObj.Consumer>

            {

                (value)=>
                {
                    const {ThemeColor} = value

                    const LoginRouteEl=
                     <div className={ThemeColor==="black"?"login-container-black-theme login-container":"login-container-white-theme login-container"}>
                        <form className={ThemeColor==="black"?"form-container-black-theme form-container":"form-container-white-theme form-container"} onSubmit={this.SubmitForm}>
        
                {/* element-1: Image */}
                <img src={ThemeColor==="black"?"https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png":"https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"} alt="website logo" className="logo"/>

                {/* element-2: Username */}
                <div className="input-group">
                    <label className="label" htmlFor="username">USERNAME</label>
                    <input type="text" placeholder="Username" id="username" className="input" onChange={this.registerUN}/>
                </div>

                {/* element-3: Password */}
                <div className="input-group">
                    <label className="label" htmlFor="userpassword">PASSWORD</label>
                    <input type={showPassword?"text":"password"} id="userpassword" placeholder="Password" className="input" onChange={this.registerUP}/>
                </div>

                {/* element-4: Checkbox */}
                <div className="checkbox-group">
                    <input type="checkbox" checked={showPassword} id="showPassword" onChange={this.ShowHidePass} />
                    <label htmlFor="showPassword" className="checkbox-label">
                    Show Password
                    </label>
                </div>

                {/* element-5: Button */}
                <button className="login-button">
                    Login
                </button>
                {this.renderErrorMsg()}
            </form>
                    </div>

                    return LoginRouteEl
                }
            }


        </SavedVidContextObj.Consumer>
        
        
       

        return LoginRouteConsumer
    }
}


export default LoginRoute