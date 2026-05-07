import { Component } from "react";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import SavedVidCard from "../SavedVidCard";

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

                        const SavedVidsRoute=
                        <>
                            <TopNav />
                            <div className={ThemeColor==="black"?"down-section-container black-theme":"down-section-container white-theme"}>
                                <SideNav />
                                <div className="main-section">
                                        {this.renderGaminggStrip()}
                                        <div className="gaming-videos-container">

                                            {
                                               SavedVidArr.map
                                                (
                                                    (VideoArrayObj)=>
                                                    {
                                                        return <SavedVidCard key={VideoArrayObj.id} VideoArrayObj={VideoArrayObj}  /> 
                                                    }
                                                )                                   
                                            }


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