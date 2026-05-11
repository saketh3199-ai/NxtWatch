import { Component } from "react";
import "./index.css"
import { Link } from "react-router-dom";
import SavedVidContextObj from "../../context/SavedVidContext";



class SideNav extends Component
{
    render()
    {
        const SideNavBarConsumer =
        <SavedVidContextObj.Consumer>
            {

                (value)=>
                {
                    
                    const {ThemeColor} = value

                    const SideNavBar = 
                    <nav className={ThemeColor==="black"?"side-nav black-theme":"side-nav white-theme"}>

                    {/* SECTION 1 */}
                    <div className="side-section-1">
                        <Link to="/" className={ThemeColor==="black"?"nav-item black-theme-side-nav":"nav-item white-theme-side-nav"}>Home</Link>
                        <Link to="/trending" className={ThemeColor==="black"?"nav-item black-theme-side-nav":"nav-item white-theme-side-nav"}>Trending</Link>
                        <Link to="/gaming" className={ThemeColor==="black"?"nav-item black-theme-side-nav":"nav-item white-theme-side-nav"}>Gaming</Link>
                        <Link to="/saved-videos" className={ThemeColor==="black"?"nav-item black-theme-side-nav":"nav-item white-theme-side-nav"}>Saved Videos</Link>
                    </div>

                    {/* SECTION 2 (BOTTOM) */}
                    <div className="side-section-2">

                        <p className="contact-title">CONTACT US</p>

                        <div className="social-icons">
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                            alt="facebook logo"
                            className="social-icon"
                        />

                        <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                            alt="twitter logo"
                            className="social-icon"
                        />

                        <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                            alt="linked in logo"
                            className="social-icon"
                        />
                        </div>

                        <p className="side-description">
                        Enjoy! Now to see your channels and recommendations!
                        </p>

                    </div>
                    </nav>


                    return SideNavBar
                }


            }

        </SavedVidContextObj.Consumer> 
         
        return SideNavBarConsumer
    }
}

export default SideNav