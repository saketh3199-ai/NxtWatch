import React from 'react'

const SavedVidContextObj = React.createContext(
    {
        SavedVidArr:[],
        AddVidItem:()=>{},
        DeleteVidItem:()=>{},
        CheckIdInLikedArr:()=>{},
        LikedArrId:[],
        CheckIdInDisLikedArr:()=>{},
        DisLikedArrId:[],
        ChangeThemeColor:()=>{},
        ThemeColor:""
    }
)


export default SavedVidContextObj