import { Component } from "react";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import { FaFire } from "react-icons/fa";
import "./index.css"
import TrendingIndividualCard from "../TrendingIndividualCard";
import Cookies from "js-cookie"
import SavedVidContextObj from "../../context/SavedVidContext";
import { ApiStatusArr } from "../../utilities";
import { ThreeDots } from 'react-loader-spinner'

class Trending extends Component
{

    state = {
        VideoArray:null,
        ApiStatus:ApiStatusArr[0]
    }


















    componentDidMount()
    {
        this.CallApi()
    }
















    CallApi = async ()=>
    {
        this.setState({ApiStatus:ApiStatusArr[0]})
        const jwtToken = Cookies.get("jwtToken")
        const TrendApi = "https://apis.ccbp.in/videos/trending"
        const options = {method:"GET",headers:{Authorization:`Bearer ${jwtToken}`}}
        const response = await fetch(TrendApi,options)

        if (response.ok)
        {
            // console.log("Api calling is done and status is success")
            const Data = await response.json()
            const {videos} = Data
            const ReformattedVideos = videos.map
            (
                (videoObject)=>
                {
                    const individualVidObj = {
                        id:videoObject.id,
                        title:videoObject.title,
                        thumbnailUrl:videoObject.thumbnail_url,
                        channel:{name:videoObject.channel.name,profileImageUrl:videoObject.channel.profile_image_url},
                        viewCount:videoObject.view_count,
                        publishedAt:videoObject.published_at
                    }

                    return individualVidObj
                }
            )

            // console.log(ReformattedVideos)
            this.setState({VideoArray:ReformattedVideos,ApiStatus:ApiStatusArr[1]})

        }
        else
        {
            this.setState({ApiStatus:ApiStatusArr[2]})
        }
    }














    
    
    
    renderTrendingStrip = ()=>
    {
        const TrendingStripEl = 
        <div className="trending-heading-container">
                            <div className="trending-icon-wrapper">
                                    <FaFire className="trending-icon" />
                            </div>
                            <h1 className="trending-heading">Trending</h1>
        </div>

        return TrendingStripEl


    }



    renderSuccessView = ()=>
    {
        const {VideoArray} = this.state
         if (VideoArray === null) 
        {
                return null
        }  

        const SuccessView = 
        <div className="trending-videos-container">

                                            {
                                                VideoArray.map
                                                (
                                                    (VideoArrayObj)=>
                                                    {
                                                        return <TrendingIndividualCard key={VideoArrayObj.id} VideoArrayObj={VideoArrayObj}  /> 
                                                    }
                                                )                                   
                                            }


        </div>


        return SuccessView
    }



    renderFailureView = (ThemeColor) =>
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
        <button className="failure-retry-btn" onClick={this.CallApi}>Retry</button>
    </div>

    return FailureView
}



     renderLoadingView = ()=>
    {
        const LoadingView = 
        <ThreeDots height="180" width="180" color="red" visible={true}/>

        return LoadingView
    }









    render()
    {
        const {VideoArray,ApiStatus} = this.state
        

      
        
        
        
        const TrendingRouteConsumer = 
         <SavedVidContextObj.Consumer>
                {
                    (value)=>
                    {

                        const {ThemeColor} = value

                        const TrendRoute = 
                        <>
                            <TopNav />
                            <div className={ThemeColor==="black"?"down-section-container black-theme":"down-section-container white-theme"}>
                                <SideNav />
                                <div className="main-section">
                                        {this.renderTrendingStrip()}
                                        {ApiStatus===ApiStatusArr[0]?this.renderLoadingView():null}
                                        {ApiStatus===ApiStatusArr[1]?this.renderSuccessView():null}
                                        {ApiStatus===ApiStatusArr[2]?this.renderFailureView(ThemeColor):null}
                                </div>
                            
                            </div>
                        
                        
                        </>

                        return TrendRoute
                    }

                }
        </SavedVidContextObj.Consumer>

        return TrendingRouteConsumer
    }
}


export default Trending