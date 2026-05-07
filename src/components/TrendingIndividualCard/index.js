import { Component } from "react";
import { FetchDate } from "../../utilities";
import { Link } from "react-router-dom";
import SavedVidContextObj from "../../context/SavedVidContext";
import "./index.css"

class TrendingIndividualCard extends Component
{
    render()
    {

        const {title,thumbnailUrl,channel,viewCount,publishedAt,id} = this.props.VideoArrayObj
        const {name} = channel



        const TrendVidCardConsumer = 
        <SavedVidContextObj.Consumer>
            {

                (value)=>
                {

                    const {ThemeColor} = value


                    const TrendVidCard=
                    <>
                        <Link to={`/videos/${id}`} className="individual-trending-video-container">
                            <img src={thumbnailUrl} alt="thumbnail" className="trending-thumbnail" />
                            <div className="itvc-text-container">
                            <h2 className={ThemeColor==="black"?"trending-video-title trending-title-black-theme":"trending-video-title trending-title-white-theme"}>{title}</h2>
                            <p className={ThemeColor==="black"?"trending-channel-name trending-channel-name-black":"trending-channel-name trending-channel-name-white"}>{name}</p>
                            <div className="trending-meta">
                                <span className={ThemeColor==="black"?"view-black-theme":"view-white-theme"}>{viewCount} views</span>
                                <span className={ThemeColor==="black"?"view-black-theme":"view-white-theme"}>{FetchDate(publishedAt)}</span>
                            </div>
                            </div>
                        </Link>
                    
                    </>
                
                    return TrendVidCard
                }

            }
           
        </SavedVidContextObj.Consumer>

        return TrendVidCardConsumer
    }
}

export default TrendingIndividualCard 