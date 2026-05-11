import { Component } from "react";
import { Link } from "react-router-dom";
import { FetchDate } from "../../utilities";
import SavedVidContextObj from "../../context/SavedVidContext";
import "./index.css"

class SavedVidCard extends Component 
{
    render() 
    {
        const { id, title, thumbnailUrl, viewCount, publishedAt, channel } = this.props.VideoArrayObj
        const { name } = channel

        const SavedVidCardElConsumer =
        <SavedVidContextObj.Consumer>
            {
                (value) =>
                {
                    const { ThemeColor } = value

                    const SavedVidCardEl =
                    <Link to={`/videos/${id}`} className={`individual-trending-video-container ${ThemeColor === "black" ? "black-theme-card" : "white-theme-card"}`}>
                        <img src={thumbnailUrl} alt="thumbnail" className="trending-thumbnail" />
                        <div className={`itvc-text-container ${ThemeColor === "black" ? "black-theme-itvc" : "white-theme-itvc"}`}>
                            <h2 className="trending-video-title">{title}</h2>
                            <p className="trending-channel-name">{name}</p>
                            <div className="trending-meta">
                                <span>{viewCount} views</span>
                                <span>{FetchDate(publishedAt)}</span>
                            </div>
                        </div>
                    </Link>

                    return SavedVidCardEl
                }
            }
        </SavedVidContextObj.Consumer>

        return SavedVidCardElConsumer
    }
}

export default SavedVidCard