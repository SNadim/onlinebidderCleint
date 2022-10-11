import "./banner.scss";
import { AccessAlarm, Email, HeadsetMic, LabelImportant, LocationCityRounded, Person } from "@material-ui/icons"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout, sellerLogout } from "../../context/authContext/apiCalls";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Banner() {
    const {user,dispatch} = useContext(AuthContext);
    const [, ,removeCookie] = useCookies(["jwt"]);
    const navigate = useNavigate();
    const handleLogout = async ()=> {
        if(user.role === "seller")
        {
            sellerLogout(dispatch);
        } else {
            logout(dispatch);
        }
        removeCookie("jwt");
        navigate("/",{replace: true});
      }
    

  return (
    <div className='banner'>
        <div className="container">
            <div className="contact">
                <div className="iconWrapper">
                    <div className="item head">
                        <span><HeadsetMic /></span>
                        +880-1823786231
                    </div>
                    <div className="item">
                        <span><Email /></span>
                        shariarnadim21@gmail.com
                    </div>
                </div>
            </div>
            <div className="profile">
                <div className="iconWrapper">
                    <div className="item">
                        <LocationCityRounded />
                        Store Location
                    </div>
                    <div className="item">
                        <AccessAlarm />
                        Daily Deal
                    </div>
                    {user ?
                    <>
                    {
                        user.role === "seller" ?
                        <div className="item">
                        <Link className="link" to="/seller">
                        <Person />
                        My Account
                        </Link>
                    </div> 
                    :
                    <div className="item">
                        <Link className="link" to="/">
                        <Person />
                        My Account
                        </Link>
                    </div>

                    }
                    
                     <div className="item" onClick={handleLogout}>
                        <LabelImportant />
                        Logout
                    </div>
                    
                    </>
                     :
                     <>
                     <Link className="link" to="/login">
                    <div className="item">
                        <LabelImportant />
                        Sign in
                    </div>
                    </Link>
                    <Link className="link" to="/register">
                    <div className="item">
                        <LabelImportant />
                        Sign up
                    </div>
                    </Link>
                    </>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
