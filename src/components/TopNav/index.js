import { Component } from "react";
import "./index.css"
import HamPopUp from "../HamPopUp";
import { IoIosLogOut } from "react-icons/io"
import {withRouter} from "react-router-dom"
import SavedVidContextObj from "../../context/SavedVidContext";


class TopNav extends Component
{


    onClickLogout = ()=>
    {
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
                            <div className="section-1">
                                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="logo" className="logo"/>
                            </div>

                            {/* Section 2 */}
                            <div className="section-2">

                                {/* Theme text (optional keep) */}
                                <p className="theme-text" onClick={OnClickChangeTheme}>Change to Dark Mode</p>

                                {/* Profile (md+) */}
                                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" className="profile-img"/>

                                {/* Logout button (md+) */}
                                <button className="logout-btn" onClick={this.onClickLogout}>Logout</button>

                                {/* Mobile logout icon (xs-sm) */}
                                <IoIosLogOut className="logout-icon-mobile" />

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