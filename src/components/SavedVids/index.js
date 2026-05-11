import { Component } from "react";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import SavedVidCard from "../SavedVidCard";
import "./index.css"
import { FaFire } from "react-icons/fa";
import SavedVidContextObj from "../../context/SavedVidContext";


class SavedVids extends Component
{

    

















   









     
        
        renderGaminggStrip = ()=>
        {
            const GamingStripEl = 
            <div className="trending-heading-container">
                                <div className="trending-icon-wrapper">
                                        <FaFire className="trending-icon" />
                                </div>
                                <h1 className="trending-heading">Saved</h1>
            </div>
    
            return GamingStripEl
    
    
        }






    
    
    
 



















    render()
    {
        
       

       
        
        
        
        const SavedVidsRouteConsumer = 
         <SavedVidContextObj.Consumer>
                {
                    (value)=>
                    {
                        const {SavedVidArr,ThemeColor} = value

                        const renderEmptyView = ()=>
                        {
                            const EmptyViewEl = 
                            <div className="no-savied-videos-empty-container">
                                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" className="empty-view-image-styler" alt=" no saved videos"/>
                                <h1 className={ThemeColor==="black"?"no-saved-videos-black":"no-saved-videos-white"}>No saved videos found</h1>
                                <p className={ThemeColor==="black"?"no-saved-videos-para-black":"no-saved-videos-para-white"}>You can save your videos while watching them</p>
                            </div>
                            return EmptyViewEl
                        
                        }


                        const renderNonEmptySavedView = ()=>
                        {
                            const NonEmptySavedVidEl = SavedVidArr.map
                            (
                                (VideoArrayObj)=>
                                {
                                    return <SavedVidCard key={VideoArrayObj.id} VideoArrayObj={VideoArrayObj}  /> 
                                }
                            )
                            
                            return NonEmptySavedVidEl

                        }

                        const SavedVidsRoute=
                        <>
                            <TopNav />
                            <div className={ThemeColor==="black"?"down-section-container black-theme":"down-section-container white-theme"}>
                                <SideNav />
                                <div className="main-section">
                                        {this.renderGaminggStrip()}
                                        <div className={SavedVidArr.length===0?"gaming-videos-container-empty-view":"gaming-videos-container"}>

                                            {SavedVidArr.length===0?renderEmptyView():renderNonEmptySavedView()}
                                                                               
                                           


                                        </div>

                                </div>
                            
                            </div>
                        </>

                        return SavedVidsRoute
                    }
                }
        </SavedVidContextObj.Consumer>

        return SavedVidsRouteConsumer
    }
}


export default SavedVids