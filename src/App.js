import {Switch,Route} from 'react-router-dom';
import LoginRoute from './components/LoginRoute';
import HomeRoute from './components/HomeRoute';
import VideoItemDetails from './components/VideoItemDetails';
import Trending from './components/Trending';
import Gaming from './components/Gaming';
import SavedVidContextObj from './context/SavedVidContext';
import { Component } from 'react';
import SavedVids from './components/SavedVids';
import ProtectedRoute from './components/ProtectedRoute';


class App extends Component
{

  state = {
    SavedVidArr:[],
    LikedArrId:[],
    DisLikedArrId:[],
    ThemeColor:"white"
  }





 ChangeThemeColor = ()=>
 {
   const {ThemeColor} = this.state
   console.log("Hi from App.js")
  // (ThemeColor==="white")?this.setState({ThemeColor:"black"}):this.setState({ThemeColor:"white"})

  if (ThemeColor==="white")
  {
    this.setState({ThemeColor:"black"})
  }
  else
  {
    this.setState({ThemeColor:"white"})
  }


 }







  AddVidItem = (videoObj)=>
  {
    this.setState
    (
      (previousState)=>
      {
        const NewUpdatedState = {SavedVidArr:[...previousState.SavedVidArr,videoObj]}
        return NewUpdatedState
      }
    )

  }








DeleteVidItem = (videoId)=>
{ 
  const {SavedVidArr} = this.state

  const DeletedVidArray = SavedVidArr.filter
  (
    (videoObject)=>
    {
      if (videoObject.id !== videoId)
      {
        return videoObject
      }
    }
  )

  this.setState({SavedVidArr:DeletedVidArray})
}


















    CheckIdInLikedArr = (videoId)=>
    {
            const {LikedArrId,DisLikedArrId} = this.state
            const IdExistence = LikedArrId.some
            (
              (individualVideoId)=>
              {
                if (individualVideoId === videoId)
                {
                  return true
                }
              }
            )


            if (IdExistence)
            {
              //remove
              const RemovedIdLikedIdArr = LikedArrId.filter
              (
                (individualId)=>
                {
                  if (individualId !== videoId)
                  {
                    return individualId
                  }
                }
              )
            
              this.setState({LikedArrId:RemovedIdLikedIdArr})
            
            }

            else
            {
              const TheExistenceOfPresentIdInDislikedIdArray = DisLikedArrId.some
              (
                (individualIdDisLike)=>
                {
                  if (individualIdDisLike === videoId)
                  {
                    return true
                  }
                }
              )


              if (TheExistenceOfPresentIdInDislikedIdArray)
              {
                  const ModifiedDislikedArray = DisLikedArrId.filter
                  (
                    (DislikedIdIndividual)=>
                    {
                      if (DislikedIdIndividual !== videoId)
                      {
                        return DislikedIdIndividual
                      }
                    }
                  )

                  this.setState
                  (
                    (previousState)=>
                    {
                      return {LikedArrId:[...previousState.LikedArrId,videoId],DisLikedArrId:ModifiedDislikedArray}
                    }
                  )
                  
              }
              else
              {
                this.setState
                  (
                    (previousState)=>
                    {
                      return {LikedArrId:[...previousState.LikedArrId,videoId]}
                    }
                  )
              }
            
            }



    }






  CheckIdInDisLikedArr = (videoId)=>
  {
    const {DisLikedArrId,LikedArrId} = this.state
    const IdExistence = DisLikedArrId.some
      (
        (individualVideoId)=>
        {
          if (individualVideoId === videoId)
          {
            return true
          }
        }
      )


      if (IdExistence)
      {
        
        const RemovedIdDisLikedIdArr = DisLikedArrId.filter
        (
          (individualId)=>
          {
            if (individualId !== videoId)
            {
              return individualId
            }
          }
        )
      
        this.setState({DisLikedArrId:RemovedIdDisLikedIdArr})
      
      }

      else
      {
              const TheExistenceOfPresentIdInlikedIdArray = LikedArrId.some
              (
                (individualIdLike)=>
                {
                  if (individualIdLike === videoId)
                  {
                    return true
                  }
                }
              )


              if (TheExistenceOfPresentIdInlikedIdArray)
              {
                  const ModifiedLikedArray = LikedArrId.filter
                  (
                    (likedIdIndividual)=>
                    {
                      if (likedIdIndividual !== videoId)
                      {
                        return likedIdIndividual
                      }
                    }
                  )

                  this.setState
                  (
                    (previousState)=>
                    {
                      return {DisLikedArrId:[...previousState.DisLikedArrId,videoId],LikedArrId:ModifiedLikedArray}
                    }
                  )
                  
              }
              else
              {
                this.setState
                  (
                    (previousState)=>
                    {
                      return {DisLikedArrId: [...previousState.DisLikedArrId, videoId]}
                    }
                  )
              }
            
            }

  }











  render()
  {
    const {SavedVidArr,LikedArrId,DisLikedArrId,ThemeColor} = this.state

     const nxtWatchWebPage = 
      <SavedVidContextObj.Provider value={{SavedVidArr,AddVidItem:this.AddVidItem,DeleteVidItem:this.DeleteVidItem,CheckIdInLikedArr:this.CheckIdInLikedArr,LikedArrId,CheckIdInDisLikedArr:this.CheckIdInDisLikedArr,DisLikedArrId,ChangeThemeColor:this.ChangeThemeColor,ThemeColor}}>
        <Switch>
              <Route exact path="/login" component={LoginRoute} />
              <ProtectedRoute exact path="/" component={HomeRoute} />
              <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} />
              <ProtectedRoute exact path="/trending" component={Trending} />
              <ProtectedRoute exact path="/gaming" component={Gaming} />
              <ProtectedRoute exact path="/saved-videos" component={SavedVids} />

        </Switch>
      </SavedVidContextObj.Provider>

  return nxtWatchWebPage

  }
 
}

export default App