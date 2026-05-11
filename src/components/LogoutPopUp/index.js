import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import "./index.css"



const LogOutPopUp = (props)=>
{
    const {onClickLogout,trigger} = props

    const onClickConfirm = ()=>
    {
        onClickLogout()
    }

    const LogOutPopUpElement = 
    
	 <div className="popup-container">
	   <Popup modal trigger={trigger || <button type="button" className="logout-btn">Logout</button>}>
		 {close => (
                <>
                    <p>Are you sure you want to logout?</p>
                    <div className="popup-btn-containers">
                             <button type="button" className="cancel-button" onClick={() => close()}>
                            Cancel
                            </button>
                            <button type="button" className="logout-btn" onClick={onClickConfirm}>
                            Confirm
                            </button>

                    </div>
                           
                   </>
        )}
	   </Popup>
	 </div>
	
	
	return LogOutPopUpElement


}


export default LogOutPopUp