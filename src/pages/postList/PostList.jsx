import './postList.css';
import { DataGrid } from '@material-ui/data-grid'
import { useContext, useState } from 'react';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import {AuthContext} from "../../context/authContext/AuthContext"
import TopBar from '../../components/topBar/TopBar';
import SideBar from '../../components/sidebar/SideBar';

export default function PostList() {
    const [data, setData] = useState([]);
  const columns = [
    { field: 'productID',headerName: 'Serial No.', width: 150 },
    {
      field: 'title',
      headerName: 'Post Title',
      width: 300,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 300,
    },
    {
      field: 'startDate',
      headerName: 'Auction Start',
      width: 300,
    },
    {
      field: 'endDate',
      headerName: 'Auction End',
      width: 300,
    },
    {
      field: 'startingBidPrice',
      headerName: 'Starting Price',
      width: 300,
    },
    {
      field: 'HighestBid',
      headerName: 'Highest Bid',
      width: 300,
    },
    {
      field: 'BiddingIncrement',
      headerName: 'Bidding Increment',
      width: 300,
    },
    {
      field: 'deliveryDays',
      headerName: 'Delivery Days',
      width: 300,
    },
    {
      field: 'sellerID',
      headerName: 'Seller ID',
      width: 300,
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 200,
      renderCell:(params)=>{
        return (
          <div className='postList'>
            <img src={`https://reignmart.herokuapp.com/images/products/${params.row.image}`} alt="" className="postListImg" />
          </div>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return(
          <>
            <Link to={"/seller/post/"+params.row.productID}><button className='postListEdit'>Edit</button></Link>
            <DeleteOutline className='postListDelete' onClick={() => deleteContact(params)} />
          </>
        )
      }
    }
  ];

  const deleteContact = async (params) => {
    const id = params.row.id;
    const image = params.row.image;   
    if(window.confirm("Are you sure that you wanted to delete that contact ?")) {
      const res = await axios.delete(`https://reignmart.herokuapp.com/post/${id}`, { data: { image } });
      toast.success("Post Delete Successfully!");
      setTimeout(()=>loadData(), 500);

      }
  }

  const loadData = async () => {
    const response = await axios.get("https://reignmart.herokuapp.com/products/sellerPost",{withCredentials: true});
    add(response.data)
};

  useEffect(()=>{
    
    loadData();
  },[]);


  const add = (data) => {
    var product = [];
 for(var i = 0; i < data[0].length; i++)
 {
  var pro = data[0][i];
  pro.image = data[2][i][0].image;
  product.push(pro);
 }
 setData(product);
  }
  return (
    <>
    <TopBar />
    <ToastContainer position="top-center" />
    <div style={{ display: "flex" }}>
      <SideBar />
    <div className='postList'>
      <DataGrid
      rows={data}
      columns = {columns}
      pageSize= {10}
      rowsPerPageOptions ={[5]}
      disableSelectionOnClick
      checkboxSelection
      getRowId={(row) => row.productID} 
       />
    </div>
    </div>
    </>
  )
}
