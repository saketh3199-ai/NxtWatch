import { Component } from "react";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import { FaFire } from "react-icons/fa";
import "./index.css"
import TrendingIndividualCard from "../TrendingIndividualCard";
import Cookies from "js-cookie"
import SavedVidContextObj from "../../context/SavedVidContext";

class Trending extends Component
{

    state = {
        VideoArray:null
    }


















    componentDidMount()
    {
        this.CallApi()
    }
















    CallApi = async ()=>
    {
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
            this.setState({VideoArray:ReformattedVideos})

        }
        else
        {
            console.log("Api calling is failed")
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



















    render()
    {
        
        const {VideoArray} = this.state

        if (VideoArray === null)
        {
            return null
        }
        
        
        
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