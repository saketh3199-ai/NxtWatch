import Popup from "reactjs-popup"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoCloseSharp } from "react-icons/io5"
import { Link } from "react-router-dom"
import "./index.css"
import SavedVidContextObj from "../../context/SavedVidContext"

const HamPopUp = () => 
{
    const PopUpHamBurgerMenuConsumer=
    <SavedVidContextObj.Consumer>
        {
            (value)=>
            {
                const {ThemeColor} = value

                const PopUpHamBurgerMenu=
                <div>
        <Popup modal
        trigger={
            <button type="button" className="trigger-button">
            <GiHamburgerMenu />
            </button>
        }
        overlayStyle={{ zIndex: 999, background: "rgba(0,0,0,0.5)" }}
        className={`popup-content ${ThemeColor === "black" ? "black-theme-popup-container" : "white-theme-popup-container"}`}
        contentStyle={{ 
        zIndex: 1000, 
        borderRadius: "8px", 
        padding: "0",
        background: ThemeColor === "black" ? "#000000" : "#ffffff"
    }}
        >
        {close => (
    <div className={`popup-content ${ThemeColor === "black" ? "black-theme-popup-container" : "white-theme-popup-container"}`}>
        <button type="button" className={`close-button ${ThemeColor === "black" ? "close-btn-dark" : "close-btn-light"}`} onClick={() => close()}>
            <IoCloseSharp />
        </button>
        <ul className="menu-list">
            <Link to="/" className={ThemeColor === "black" ? "mobile-link-dark" : "mobile-link-light"}><li>HOME</li></Link>
            <Link to="/trending" className={ThemeColor === "black" ? "mobile-link-dark" : "mobile-link-light"}><li>TRENDING</li></Link>
            <Link to="/gaming" className={ThemeColor === "black" ? "mobile-link-dark" : "mobile-link-light"}><li>GAMING</li></Link>
            <Link to="/saved-videos" className={ThemeColor === "black" ? "mobile-link-dark" : "mobile-link-light"}><li>SAVED VIDEOS</li></Link>
        </ul>
    </div>
)}
        </Popup>
                </div>


                return PopUpHamBurgerMenu
            }
        }
    </SavedVidContextObj.Consumer>

    return PopUpHamBurgerMenuConsumer
}

export default HamPopUp