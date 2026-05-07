import { IoCloseOutline } from "react-icons/io5"
import "./index.css"

const Banner = (props) => 
{
  
  const {changeBannerDisplayStatus} = props

  const bannerCloserClicked = ()=>
  {
    changeBannerDisplayStatus()
  }

  const BannerElement = 
  <div className="banner-container">

            {/* TOP ROW */}
            <div className="banner-top">

                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="nxt watch logo" className="banner-logo"/>

                <IoCloseOutline className="close-icon" onClick={bannerCloserClicked} />

            </div>

            {/* TEXT */}
            <p className="banner-text">
                Buy Nxt Watch Premium prepaid plans with UPI
            </p>

            {/* BUTTON */}
            <button className="banner-btn">
                Get it Now
            </button>

  </div>

  return BannerElement
    

}

export default Banner