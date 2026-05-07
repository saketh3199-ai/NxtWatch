import Popup from "reactjs-popup"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoCloseSharp } from "react-icons/io5"
import { Link } from "react-router-dom"
import "./index.css"

const HamPopUp = () => 
{
    const PopUpHamBurgerMenu=
    <div className="popup-container">
        <Popup modal
        trigger={
            <button type="button" className="trigger-button">
            <GiHamburgerMenu />
            </button>
        }
        >
        {close => (
            <div className="popup-content">

            {/* Close button (top-right) */}
            <button type="button" className="close-button" onClick={() => close()}>
                <IoCloseSharp />
            </button>

            {/* Menu items */}
            <ul className="menu-list">
                <Link to="/"><li>HOME</li></Link>
                <Link to="/trending"><li>TRENDING</li></Link>
                <Link to="/gaming"><li>GAMING</li></Link>
                <Link to="/saved-videos"><li>SAVED VIDEOS</li></Link>
            </ul>

            </div>
        )}
        </Popup>
    </div>

    return PopUpHamBurgerMenu
}

export default HamPopUp