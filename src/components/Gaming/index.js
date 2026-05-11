import { Component } from "react";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import GamingCards from "../GamingCards";
import Cookies from "js-cookie"
import { FaFire } from "react-icons/fa";
import SavedVidContextObj from "../../context/SavedVidContext";
import { ThreeDots } from 'react-loader-spinner'
import "./index.css"
import { ApiStatusArr } from "../../utilities";

class Gaming extends Component
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
        const GamingApi = "https://apis.ccbp.in/videos/gaming"
        const options = {method:"GET",headers:{Authorization:`Bearer ${jwtToken}`}}
        const response = await fetch(GamingApi,options)

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
                        viewCount:videoObject.view_count,
                       
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











     
        
        renderGaminggStrip = ()=>
        {
            const GamingStripEl = 
            <div className="trending-heading-container">
                                <div className="trending-icon-wrapper">
                                        <FaFire className="trending-icon" />
                                </div>
                                <h1 className="trending-heading">Gaming</h1>
            </div>
    
            return GamingStripEl
    
    
        }






    
    
    
        renderSucessView = ()=>
        {
            const {VideoArray} = this.state


              if (VideoArray === null)
        {
            return null
        }

            const SuccessView = 
             <div className="gaming-videos-container">

                                            {
                                                VideoArray.map
                                                (
                                                    (VideoArrayObj)=>
                                                    {
                                                        return <GamingCards key={VideoArrayObj.id} VideoArrayObj={VideoArrayObj}  /> 
                                                    }
                                                )                                   
                                            }


             </div>
        
            return SuccessView
        }













        renderLoadingView = ()=>
    {
        const LoadingView = 
        <ThreeDots height="180" width="180" color="red" visible={true}/>

        return LoadingView
        }




        renderFailureView = (ThemeColor) =>
{
    const FailureView =
    <div className="gaming-failure-container">
        <img 
            src={ThemeColor === "black" ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"} 
            alt="failure view" 
            className="gaming-failure-img"
        />
        <h2 className={ThemeColor === "black" ? "gaming-failure-heading gaming-black-theme" : "gaming-failure-heading gaming-white-theme"}>
            Oops! Something Went Wrong
        </h2>
        <p className={ThemeColor === "black" ? "gaming-failure-description gaming-black-theme" : "gaming-failure-description gaming-white-theme"}>
            We are having some trouble completing your request. Please try again.
        </p>
        <button className="gaming-failure-retry-btn" onClick={this.CallApi}>Retry</button>
    </div>

    return FailureView
    }



    render()
    {
        
        const {VideoArray,ApiStatus} = this.state

      
        
        
        
        const GamingRouteConsumer = 
         <SavedVidContextObj.Consumer>
                {
                    (value)=>
                    {

                        const {ThemeColor} = value

                        const GamingRoute = 
                        <>
                            <TopNav />
                            <div className={ThemeColor==="black"?"down-section-container black-theme":"down-section-container white-theme"}>
                                <SideNav />
                                <div className="main-section">
                                        {this.renderGaminggStrip()}
                                        {ApiStatus===ApiStatusArr[0]?this.renderLoadingView():null}
                                        {ApiStatus===ApiStatusArr[1]?this.renderSucessView():null}
                                        {ApiStatus===ApiStatusArr[2]?this.renderFailureView():null}

                                </div>
                            
                            </div>
                        
                        </>


                        return GamingRoute
                    }
                }
        </SavedVidContextObj.Consumer>

        return GamingRouteConsumer
    }
}


export default Gaming