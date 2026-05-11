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
import { ThreeDots } from 'react-loader-spinner'
import { ApiStatusArr } from "../../utilities";


class VideoItemDetails extends Component
{

    state = {
        videoDetailsObject:null,
        ApiStatus:ApiStatusArr[0]
        
    }









    componentDidMount()
    {
        this.MakeApiCallToVidDetailsApi()
    }












    MakeApiCallToVidDetailsApi = async ()=>
    {
        this.setState({ApiStatus:ApiStatusArr[0]})
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
        
            this.setState({videoDetailsObject:ReformattedVideoDetailsObject,ApiStatus:ApiStatusArr[1]})
        }

        else
        {
            this.setState({ApiStatus:ApiStatusArr[2]})
        }
    }









  












    render()
    {

        const {videoDetailsObject,ApiStatus} = this.state

        


        // const {id,title,videoUrl,viewCount,publishedAt,description,channel} = videoDetailsObject

        // const {name,profileImageUrl,subscriberCount} = channel

        // const TimeGap = FetchDate(publishedAt)

        const VideoItemDetailsElementConsumer = 
          <SavedVidContextObj.Consumer>
            {

                    (value)=>
                    {
                        const {AddVidItem,SavedVidArr,DeleteVidItem,CheckIdInLikedArr,LikedArrId,CheckIdInDisLikedArr,DisLikedArrId,ThemeColor} = value

                        

                        const renderSuccessView = ()=>
                        {

                            
                             if (videoDetailsObject === null)
                            {
                                return null
                            }


                                const {id,title,videoUrl,viewCount,publishedAt,description,channel} = videoDetailsObject
                                const {name,profileImageUrl,subscriberCount} = channel
                                const TimeGap = FetchDate(publishedAt)
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

                           
                            const SuccessView = 
                             <div className="main-section">

                                    <div className="video-container">
                                        <ReactPlayer url={videoUrl} controls={true} width="100%" height="500px"/>
                                    </div>

                                    <p className={ThemeColor==="black"?"vid-title title-black-theme-vd":"vid-title title-white-theme-vd"}>{title}</p>

                                    <div className="views-time-interactions-container">
                                        <div className="views-time">
                                            <span className={ThemeColor==="black"?"title-black-theme-vd":"title-white-theme-vd"}>{viewCount} views</span>
                                            <span className={ThemeColor==="black"?"title-black-theme-vd":"title-white-theme-vd"}>{TimeGap}</span>
                                        </div>
                                        <div className="interactions">
                                            <button className={`interaction-btn ${IsItLiked ? "liked" : ""} ${ThemeColor === "black" ? "title-black-theme-vd" : "title-white-theme-vd"}`} onClick={OnClickLike}>
                                                <AiOutlineLike className="interaction-icon" />
                                                Like
                                            </button>
                                            <button className={`interaction-btn ${IsItDisLiked?"disliked":""} ${ThemeColor==="black"?"title-black-theme-vd":"title-white-theme-vd"}`} onClick={OnClickDisLike}>
                                                <AiOutlineDislike className="interaction-icon" />
                                                Dislike
                                            </button>
                                         <button className={`interaction-btn ${VideoItemExistence ? "saved-active" : ""} ${ThemeColor === "black" ? "title-black-theme-vd" : "title-white-theme-vd"}`} onClick={onSaveClicked}>
                                                <MdPlaylistAdd className="interaction-icon" />
                                                    {VideoItemExistence ? "saved" : "save"}
                                        </button>
                                        </div>
                                    </div>

                                    <hr className="separator" />

                                    <div className="profileimage-description-container">
                                        <img src={profileImageUrl} alt="channel profile" className="channel-profile-img"/>
                                        <div className="description-container">
                                            <p className={ThemeColor==="black"?"channel-name title-black-theme-vd":"channel-name title-white-theme-vd"}>{name}</p>
                                            <p className={ThemeColor==="black"?"subscribers title-black-theme-vd":"subscribers title-white-theme-vd"}>{subscriberCount} subscribers</p>
                                            <p className={ThemeColor==="black"?"channel-description title-black-theme-vd":"channel-description title-white-theme-vd"}>
                                                {description}
                                            </p>
                                        </div>
                                    </div>

                            </div>

                            return SuccessView
                        }

                        const renderLoadingView = ()=>
                        {
                              const LoadingView = 
                             <ThreeDots height="180" width="180" color="red" visible={true}/>

                                return LoadingView
                        }


                        const renderFailureView = () =>
                        {
                            const FailureView =
                                <div className="failure-view-container">
                                                            <img 
                                                                src={ThemeColor === "black" ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"} 
                                                                alt="failure view" 
                                                                className="failure-img"
                                                            />
                                                            <h2 className={ThemeColor === "black" ? "failure-heading black-failure-theme" : "failure-heading white-failure-theme"}>
                                                                Oops! Something Went Wrong
                                                            </h2>
                                                            <p className={ThemeColor === "black" ? "failure-description black-failure-theme" : "failure-description white-failure-theme"}>
                                                                We are having some trouble completing your request. Please try again.
                                                            </p>
                                                            <button className="failure-retry-btn" onClick={this.MakeApiCallToVidDetailsApi}>Retry</button>
                                </div>

                            return FailureView
                        }


                        
                        const VideoItemDetailsElement = 
                        <>
                            <TopNav />
                            <div className={ThemeColor==="black"?"down-section-container black-theme":"down-section-container white-theme"}>
                                <SideNav />
                                {ApiStatus===ApiStatusArr[0]?renderLoadingView():null}
                                {ApiStatus===ApiStatusArr[1]?renderSuccessView():null}
                                {ApiStatus===ApiStatusArr[2]?renderFailureView():null}
                               
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