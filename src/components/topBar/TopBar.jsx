import './topBar.css';
import logo from './icon.png'
import { LineStyle, TagFaces,  CopyrightRounded } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useCookies } from "react-cookie";
import { AuthContext } from '../../context/authContext/AuthContext';
import { sellerLogout } from "../../context/authContext/apiCalls";

export default function TopBar() {
    const {user,dispatch} = useContext(AuthContext);
    const [cookie,setCookie ,removeCookie] = useCookies(["jwt"]);
    const navigate = useNavigate();
    const handleLogout = async ()=> {
        sellerLogout(user, dispatch);
        removeCookie("jwt");
        navigate("/",{replace: true});
      }
    
  return (
    <div className='topBar'>
        <div className="topBarTop">
            <div className="topBarWrapper">
                <div className="topLeft">
                    <img src={logo} alt="" className="logo" />
                    <div className="topContent">
                        <span className="topBarTitle">Online Bidder</span>
                        <span className="topBarSiteAddress">onlinebidder.com</span>
                    </div>
                </div>
                <div className="topRight">
                    <div className="topRightItem"><img src="https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper.png" alt="" className="adminProfile" /></div>
                    <div className="topRightItem"><span>{user.firstName + " " + user.lastName}</span></div>
                    <div className="topRightItem"><span>|</span></div>
                    <div className="topRightItem" onClick={handleLogout}><span>Logout</span></div>
                    
                </div>
            </div>
        </div>
        <div className="topBarBottom">
            <div className="topBarWrapper">
            <div className="topLeft">
                <Link to="/" className='link'>
                    <div className="topLeftItem">
                        <LineStyle className='topBarIcon'/> Dashboard
                    </div>
                </Link>
                <Link to="/userList" className='link'>
                <div className="topLeftItem">
                    <LineStyle className='topBarIcon'/> User Profile
                </div>
                </Link>
                <div className="topLeftItem">
                    <LineStyle className='topBarIcon'/> Change Password
                </div>
                <div className="topLeftItem">
                    <LineStyle className='topBarIcon'/> Inbox
                </div>
                <div className="topLeftItem">
                    <LineStyle className='topBarIcon'/> Visit Website
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}
