import { Component } from "react";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import ReactPlayer from "react-player";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import "./index.css";
import Cookies from 'js-cookie'
import { FetchDate } from "../../utilities";
import SavedVidContextObj from "../../context/SavedVidContext";

class VideoItemDetails extends Component
{

    state = {
        videoDetailsObject:null,
        
    }









    componentDidMount()
    {
        this.MakeApiCallToVidDetailsApi()
    }












    MakeApiCallToVidDetailsApi = async ()=>
    {
        const {id} = this.props.match.params
        const DetailVideoApiUrl =`https://apis.ccbp.in/videos/${id}`
        // console.log(id)
        const jwtToken = Cookies.get("jwtToken")
        const options = {method:"GET",headers:{Authorization:`Bearer ${jwtToken}`}}
        const Response = await fetch(DetailVideoApiUrl,options)

        if (Response.ok)
        {
            const Data = await Response.json()
            // console.log(Data)
            const ReformattedVideoDetailsObject ={
                id:Data.video_details.id,
                title:Data.video_details.title,
                videoUrl:Data.video_details.video_url,
                thumbnailUrl:Data.video_details.thumbnail_url,
                channel:{name:Data.video_details.channel.name,profileImageUrl:Data.video_details.channel.profile_image_url,subscriberCount:Data.video_details.channel.subscriber_count},
                viewCount:Data.video_details.view_count,
                publishedAt:Data.video_details.published_at,
                description:Data.video_details.description
                
            }
        
            this.setState({videoDetailsObject:ReformattedVideoDetailsObject})
        }

        else
        {
            console.log("The API CALL to VIDEO DETAILS URL has failed")
        }
    }



















    render()
    {

        const {videoDetailsObject} = this.state

        if (videoDetailsObject === null)
        {
            return null
        }


        const {id,title,videoUrl,viewCount,publishedAt,description,channel} = videoDetailsObject

        const {name,profileImageUrl,subscriberCount} = channel

        const TimeGap = FetchDate(publishedAt)

        const VideoItemDetailsElementConsumer = 
          <SavedVidContextObj.Consumer>
            {

                    (value)=>
                    {
                        const {AddVidItem,SavedVidArr,DeleteVidItem,CheckIdInLikedArr,LikedArrId,CheckIdInDisLikedArr,DisLikedArrId} = value

                        
                        const IsItLiked = LikedArrId.some
                        (
                            (IndividualId)=>
                            {
                                if (IndividualId === id)
                                {
                                    return true
                                }
                            }
                        )


                        const IsItDisLiked = DisLikedArrId.some
                        (
                            (IndividualId)=>
                            {
                                if (IndividualId === id)
                                {
                                    return true
                                }
                            }
                        )

                        
                        
                        
                        
                        
                        const VideoItemExistence = SavedVidArr.some
                            (
                                (videoObject)=>
                                {
                                    if (videoObject.id === id)
                                    {
                                        return true
                                    }
                                }
                            )
                        
                        
                        
                        
                        
                      
                      



                      
                      
                        const onSaveClicked = ()=>
                        {
                            

                            if (VideoItemExistence)
                            {
                                //The video you are trying to save already exists
                                DeleteVidItem(id)
                            }

                            else
                            {
                                AddVidItem({...videoDetailsObject})
                            }
                        }

                        
                        





                        
                        
                        
                        const OnClickLike = ()=>
                        {
                            
                          CheckIdInLikedArr(id)
                        }
                        
                        






                        const OnClickDisLike = ()=>
                        {
                            CheckIdInDisLikedArr(id)
                           
                        }




                        
                        const VideoItemDetailsElement = 
                        <>
                            <TopNav />
                            <div className="down-section-container">
                                <SideNav />

                                <div className="main-section">

                                    <div className="video-container">
                                        <ReactPlayer url={videoUrl} controls={true} width="100%" height="500px"/>
                                    </div>

                                    <p className="vid-title">{title}</p>

                                    <div className="views-time-interactions-container">
                                        <div className="views-time">
                                            <span>{viewCount} views</span>
                                            <span>{TimeGap}</span>
                                        </div>
                                        <div className="interactions">
                                            <button className={IsItLiked?"interaction-btn liked":"interaction-btn"} onClick={OnClickLike}>
                                                <AiOutlineLike className="interaction-icon" />
                                                Like
                                            </button>
                                            <button className={IsItDisLiked?"interaction-btn disliked":"interaction-btn"} onClick={OnClickDisLike}>
                                                <AiOutlineDislike className="interaction-icon" />
                                                Dislike
                                            </button>
                                            <button className={VideoItemExistence?"interaction-btn interaction-icon-present ":"interaction-btn interaction-icon-absent"} onClick={onSaveClicked}>
                                                <MdPlaylistAdd className="interaction-icon"  />
                                                {VideoItemExistence?"saved":"save"}
                                            </button>
                                        </div>
                                    </div>

                                    <hr className="separator" />

                                    <div className="profileimage-description-container">
                                        <img src={profileImageUrl} alt="channel profile" className="channel-profile-img"/>
                                        <div className="description-container">
                                            <p className="channel-name">{name}</p>
                                            <p className="subscribers">{subscriberCount} subscribers</p>
                                            <p className="channel-description">
                                                {description}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        
                        
                        </>

                        return VideoItemDetailsElement
                    }


            }
                
            </SavedVidContextObj.Consumer>

        return VideoItemDetailsElementConsumer
    }
}


export default VideoItemDetails