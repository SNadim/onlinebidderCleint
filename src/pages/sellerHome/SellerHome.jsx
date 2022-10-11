import { ToastContainer } from 'react-toastify';
import SideBar from '../../components/sidebar/SideBar';
import TopBar from '../../components/topBar/TopBar';
import './home.css';

export default function SellerHome() {
  return (
    <>
    <TopBar />
    <ToastContainer position="top-center" />
    <div style={{ display: "flex" }}>
      <SideBar />
      <div className='home'><h1>Welcome to Admin Dashboard</h1></div>
      </div>
    </>
  )
}
