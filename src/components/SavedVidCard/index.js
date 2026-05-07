import { Component } from "react";
import { Link } from "react-router-dom";

import { FetchDate } from "../../utilities";
class SavedVidCard extends Component 
{
    render() 
    {
        const { id,title,thumbnailUrl,viewCount,publishedAt,channel } = this.props.VideoArrayObj
        const {name} = channel
        const SavedVidCardEl =
            
                        <Link to={`/videos/${id}`} className="individual-trending-video-container">
                            <img src={thumbnailUrl} alt="thumbnail" className="trending-thumbnail" />
                                <div className="itvc-text-container">
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

export default SavedVidCard