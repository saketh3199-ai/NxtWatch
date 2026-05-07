import SavedVidContextObj from "../../context/SavedVidContext";
import { Link } from "react-router-dom";
import { FetchDate } from "../../utilities";
import "./index.css"



const VideoCard = (props)=>
{

    const {videoObjectIndividual} = props
    const {thumbnailUrl,title,viewCount,publishedAt,id} = videoObjectIndividual
    const {name,profileImageUrl} = videoObjectIndividual.channel
    const TimeDiff =  FetchDate(publishedAt)

    const VideoCardElementConsumer = 
    
        <SavedVidContextObj.Consumer>
                {
                    (value)=>
                    {
                        const {ThemeColor} = value

                        const VideoCarElement = 
                        <>
                            <Link to={`/videos/${id}`} className={ThemeColor==="black"?"individual-vc-container black-theme":"individual-vc-container white-theme"}>
                                    <div className="thumbnail-container">
                                        <img src={thumbnailUrl} alt="thumbnail" />
                                    </div>
                                    
                                    <div className="vc-description-container">
                                        <img className="profile-img" src={profileImageUrl} alt="channel profile" />
                                        <div className="title-channelName-views-container">
                                            <p className={ThemeColor==="black"?"vc-title title-black-theme":"vc-title title-white-theme"}>{title}</p>
                                            <p className={ThemeColor==="black"?"vc-channel-name title-black-theme":"vc-channel-name title-white-theme"}>{name}</p>
                                            <div className="vc-meta">
                                                <span className={ThemeColor==="black"?"title-black-theme":"title-white-theme"}>{viewCount} views</span>
                                                <span className={ThemeColor==="black"?"title-black-theme":"title-white-theme"}>{TimeDiff}</span>
                                            </div>
                                        </div>
                                    </div>
                            </Link>
                        </>


                        return VideoCarElement
                    }
                }

        </SavedVidContextObj.Consumer>
    
    
     


    return VideoCardElementConsumer

}


export default VideoCard