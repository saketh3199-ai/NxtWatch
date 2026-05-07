import { Component } from "react";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import GamingCards from "../GamingCards";
import Cookies from "js-cookie"
import { FaFire } from "react-icons/fa";
import SavedVidContextObj from "../../context/SavedVidContext";



class Gaming extends Component
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
            this.setState({VideoArray:ReformattedVideos})

        }
        else
        {
            console.log("Api calling is failed")
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






    
    
    
 



















    render()
    {
        
        const {VideoArray} = this.state

        if (VideoArray === null)
        {
            return null
        }
        
        
        
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