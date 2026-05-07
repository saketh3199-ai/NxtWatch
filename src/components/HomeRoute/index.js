import { Component } from "react";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import "./index.css"
import Banner from "../Banner";
import { FaSearch } from "react-icons/fa"
import Cookies from 'js-cookie'
import VideoCard from "../VideoCard";
import SavedVidContextObj from "../../context/SavedVidContext";


class HomeRoute extends Component
{
    state = {
        BannerDisplay:true,
        videoArray:[],
        searchQP:"",
        StoreSeachTextContent:""
    
    }

    
    





    componentDidMount()
    {
        this.MakeApiCall()
    }









    MakeApiCall = async ()=>
    {
        const {searchQP} = this.state
        const videoApiUrl = `https://apis.ccbp.in/videos/all?search=${searchQP}`
        const jwtToken = Cookies.get("jwtToken")
        const options = {method:"GET",headers:{Authorization:`Bearer ${jwtToken}`}}
        const response = await fetch(videoApiUrl,options)
        
        if (response.ok)
        {
            const Data = await response.json()
            // console.log(Data)
            const {videos} = Data
            const ReformattedVideoData = videos.map
            (
                (videoObject)=>
                {
                    const ReformattedVideoObject = {
                        id:videoObject.id,
                        title:videoObject.title,
                        thumbnailUrl:videoObject.thumbnail_url,
                        viewCount:videoObject.view_count,
                        publishedAt:videoObject.published_at,
                        channel:{name:videoObject.channel.name,profileImageUrl:videoObject.channel.profile_image_url}
                    
                    }
                    return ReformattedVideoObject
                }
            )
            this.setState({videoArray:ReformattedVideoData})
            
            // console.log(ReformattedVideoData)
            
        }
        else
        {
            
        }

    }




    







    
    //THE BELOW FUNCTION CHANGES BannerDisplay value
    changeBannerDisplayStatus = ()=>
    {
        this.setState({BannerDisplay:false})
    }
    
    
    
    








    //THE BELOW FUNCTION RENDERS BANNER
    renderBanner = ()=>
    {
        const {BannerDisplay} = this.state
        return BannerDisplay===true?<Banner changeBannerDisplayStatus={this.changeBannerDisplayStatus}/>:null
    }
    
    
    
    
    
    

    RegisterSearchInputText = (event)=>
    {
        const TextContentInSearchElement = event.target.value
        this.setState({StoreSeachTextContent:TextContentInSearchElement})
        
    }








    SearchParticularVideoContent = ()=>
    {
        const {StoreSeachTextContent} = this.state
        this.setState({searchQP:StoreSeachTextContent},this.MakeApiCall)
    }





    render()
    {
        const {videoArray} = this.state
        // console.log(this.state.StoreSeachTextContent)
        const HomeRoutePageConsumer = 
        <SavedVidContextObj.Consumer>
                {
                    (value)=>
                    {
                        const {ThemeColor} = value
                        const HomeRoutePage = 
                        <>
                            <TopNav />
                            <div className={ThemeColor==="black"?"down-section-container black-theme":"down-section-container white-theme"}>
                                <SideNav />
                                {/* This is the content of home */}
                                <div className="main-section">
                                    {this.renderBanner()}
                                    <div className="search-container">
                                        <input type="text" placeholder="Search" className="search-input" onChange={this.RegisterSearchInputText}/>
                                        <FaSearch className="search-icon" onClick={this.SearchParticularVideoContent}/>
                                    </div>

                                    <div className="video-grid">

                                        {
                                            videoArray.map
                                            (
                                                (videoObjectIndividual)=>
                                                {
                                                    return <VideoCard videoObjectIndividual={videoObjectIndividual} key={videoObjectIndividual.id} />
                                                }
                                            )
                                        
                                        }     
                                    


                                    

                                    

                                    

                                    </div>
                                </div>
                                {/* The content of home ends */}
                            </div>
                        
                        </>


                        return HomeRoutePage
                    }
                }
        </SavedVidContextObj.Consumer>

        return HomeRoutePageConsumer
    }
}

export default HomeRoute