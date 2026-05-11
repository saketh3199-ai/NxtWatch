import { Component } from "react";
import "./index.css"
import HamPopUp from "../HamPopUp";
import { IoIosLogOut } from "react-icons/io"
import {Link,withRouter} from "react-router-dom"
import SavedVidContextObj from "../../context/SavedVidContext";
import Cookies from "js-cookie"
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import LogOutPopUp from "../LogoutPopUp";

class TopNav extends Component
{


    onClickLogout = ()=>
    {
        Cookies.remove("jwtToken")
        const {history} = this.props
        history.replace("/login")
    }



















    render()
    {
        const TopNavBarConsumer =
        <SavedVidContextObj.Consumer>

            {
                (value)=>
                {
                    const {ChangeThemeColor,ThemeColor} = value


                    const OnClickChangeTheme = ()=>
                    {
                        ChangeThemeColor()
                        console.log("Hi Hi")
                        
                    }






                    const TopNavBar = 
                    <>
                         
                        <nav className={ThemeColor==="black"?"top-nav black-theme":"top-nav white-theme"}>
                            {/* Section 1 */}
                            <Link to="/" className="section-1">
                                <img src={ThemeColor==="black"?"https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png":"https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"} alt="logo" className="logo"/>
                            </Link>

                            {/* Section 2 */}
                            <div className="section-2">

                                {/* Theme text (optional keep) */}
                               <button className="theme-btn" onClick={OnClickChangeTheme}>
                                    {ThemeColor === "black" ? <FaSun /> : <FaMoon />}
                                </button>

                                {/* Profile (md+) */}
                                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" className="profile-img"/>

                                {/* Logout button (md+) */}
                                {/* <button className="logout-btn" onClick={this.onClickLogout}>Logout</button> */}
                                <LogOutPopUp onClickLogout={this.onClickLogout} />

                                {/* Mobile logout icon (xs-sm) */}
                                <LogOutPopUp onClickLogout={this.onClickLogout} trigger={<IoIosLogOut className="logout-icon-mobile" />}/>

                                {/* Hamburger Popup (mobile menu) */}
                                <HamPopUp />
                            </div>
                        </nav>
                    </>


                    return TopNavBar
                }
            }

        </SavedVidContextObj.Consumer>
        
        return TopNavBarConsumer
    }
}

export default withRouter(TopNav)