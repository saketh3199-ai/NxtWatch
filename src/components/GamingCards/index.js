import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css"
import SavedVidContextObj from "../../context/SavedVidContext";

class GamingCards extends Component 
{
    render() 
    {
        const { title, thumbnailUrl, viewCount, id } = this.props.VideoArrayObj

        const GameCardConsumer =
        <SavedVidContextObj.Consumer>            
            {
                (value)=>
                {
                    const {ThemeColor} = value

                    const GameCard = 
                    <Link to={`/videos/${id}`} className="individual-gaming-card">
                        <img src={thumbnailUrl} alt="thumbnail" className="gaming-thumbnail" />
                        <div className="gaming-text-container">
                            <p className={ThemeColor==="black"?"gaming-title gaming-title-black":"gaming-title gaming-title-white"}>{title}</p>
                            <p className={ThemeColor==="black"?"gaming-views gaming-title-black":"gaming-views gaming-title-white"}>{viewCount} Watching Worldwide</p>
                        </div>
                    </Link>

                    return GameCard
                }
            }
            
            
            
        </SavedVidContextObj.Consumer>


        return GameCardConsumer
    }
}

export default GamingCards