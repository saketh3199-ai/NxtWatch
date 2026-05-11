import { Component } from "react";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import "./index.css"
import Banner from "../Banner";
import { FaSearch } from "react-icons/fa"
import Cookies from 'js-cookie'
import VideoCard from "../VideoCard";
import SavedVidContextObj from "../../context/SavedVidContext";
import { ThreeDots } from 'react-loader-spinner'
import { ApiStatusArr } from "../../utilities";

// const ApiStatusArr = [
//     "loading",
//     "success",
//     "fail"
// ]



class HomeRoute extends Component
{
    state = {
        BannerDisplay:true,
        videoArray:[],
        searchQP:"",
        StoreSeachTextContent:"",
        ApiStatus:ApiStatusArr[0]
    
    }

    
    





    componentDidMount()
    {
        this.MakeApiCall()
    }









    MakeApiCall = async ()=>
    {
        this.setState({ApiStatus:ApiStatusArr[0]})
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
            this.setState({videoArray:ReformattedVideoData,ApiStatus:ApiStatusArr[1]})
            
            // console.log(ReformattedVideoData)
            
        }
        else
        {
            this.setState({ApiStatus:ApiStatusArr[2]})
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











    renderSuccessView = (ThemeColor)=>
    {
        const {videoArray} = this.state
        
        const renderEmptyView = ()=>
            {
                const EmptyViewEl = 
                <div className="no-search-results-container">
                    <img alt="no videos" className="empty-view-image-styler" src = "https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" />
                    <h1 className={ThemeColor==="black"?"no-search-results-heading-black":"no-search-results-heading-white"}>No Search results found</h1>
                    <p className={ThemeColor==="black"?"no-search-results-para-black":"no-search-results-para-white"}>Try different key words or remove search filter</p>
                    <button className="retry-btn" onClick={this.MakeApiCall}>Retry</button>
                </div>
                return EmptyViewEl
                
            }

        const renderFoundVideos = ()=>
        {
            const FoundVideosEl =  videoArray.map
            (
                (videoObjectIndividual)=>
                {
                    return <VideoCard videoObjectIndividual={videoObjectIndividual} key={videoObjectIndividual.id} />
                }
            )
        
            return FoundVideosEl
        }
        const SuccessView=
        <div className={videoArray.length===0?"video-grid-empty-view":"video-grid"}>

                                        {videoArray.length===0?renderEmptyView():renderFoundVideos()}
                                             
                                    


                                    

                                    

                                    

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
        <div className="failure-view-container">
            <img src={ThemeColor==="black"?"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png":"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"} alt="failure view" className="failure-img"/>
            <h2 className={ThemeColor==="black"?"failure-heading black-failure-theme":"failure-heading white-failure-theme"}>Oops! Something Went Wrong</h2>
            <p className={ThemeColor==="black"?"failure-description black-failure-theme":"failure-description white-failure-theme"}>We are having some trouble completing your request. Please try again.</p>
            <button className="failure-retry-btn" onClick={this.MakeApiCall}>Retry</button>
        </div>

        return FailureView
    }


    render()
    {
        const {ApiStatus} = this.state
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

                                    
                                    {/* When api call is sucess, the below renders */}
                                    {ApiStatus===ApiStatusArr[0]?this.renderLoadingView():null}
                                    {ApiStatus===ApiStatusArr[1]?this.renderSuccessView(ThemeColor):null}
                                    {ApiStatus===ApiStatusArr[2]?this.renderFailureView(ThemeColor):null}

                                    

                                
                                
                                
                                
                                
                                
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