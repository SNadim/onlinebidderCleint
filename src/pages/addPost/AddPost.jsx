import { useState } from 'react';
import './addPost.css';
import axios from 'axios';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/topBar/TopBar';
import SideBar from '../../components/sidebar/SideBar';

export default function AddPost() {

  const [file, setFile] = useState(null);
  const [title,setTitle] = useState("");
  const [startDate,setStartDate] = useState(null);
  const [endDate,setEndDate] = useState(null);
  const [deliveryDays,setDeliveryDays] = useState(0);
  const [startingBidPrice,setStartingBidPrice] = useState(0);
  const [description, setDescription] = useState([{ desc_title: "", description : ""}])
  const navigate = useNavigate();

  let handleChange = (i, e) => {
    let newDescription = [...description];
    newDescription[i][e.target.name] = e.target.value;
    setDescription(newDescription);
  }
  let addFormFields = () => {
    setDescription([...description, { desc_title: "", description: "" }])
  }

let removeFormFields = (i) => {
    let newDescription = [...description];
    newDescription.splice(i, 1);
    setDescription(newDescription)
}

const handleSubmit = async (e) => {
  e.preventDefault();
  if(file.length > 0) {
    let formData = new FormData();
    for (const key of Object.keys(file)) {
      formData.append('postImage', file[key])
      }

      description.map((element,key)=> (
        formData.append('description[]', (JSON.stringify(element)))
      ))

  formData.append('title',title);
  formData.append('startDate',startDate);
  formData.append('endDate',endDate);
  formData.append('deliveryDays',deliveryDays);
  formData.append('startingBidPrice',startingBidPrice);
    const res = await axios.post("https://reignmart.herokuapp.com/products",formData,{withCredentials: true});
    toast.success("Post added Successfully!");
    navigate("/seller")
  }
}
  return (
    <>
    <TopBar />
    <ToastContainer position="top-center" />
    <div style={{ display: "flex" }}>
      <SideBar />
    <div className='addPost'>
        <h3 className='addPostTitle'>Add New Post</h3>
        <div className="addPostWrapper">
            <form className="addPostForm" id='post' onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="addPostItem">
                <label>Title</label>
                <input 
                type="text" 
                className='addPostInput' 
                placeholder='Enter Post Title...' 
                name='title'
                onChange={e=>setTitle(e.target.value)}
                /><br />
              </div>
              <div className="addPostItem">
                <label>Bidding Start At</label>
                <input 
                type="datetime-local"
                className='addPostInput' 
                onChange={e=>setStartDate(e.target.value)}
                /><br />
              </div>         
              <div className="addPostItem">
                <label>Bidding End At</label>
                <input 
                type="datetime-local"
                className='addPostInput' 
                onChange={e=>setEndDate(e.target.value)}
                /><br />
              </div> 
              <div className="addPostItem">
                <label>Delivery Days</label>
                <input 
                type="number"
                className='addPostInput' 
                placeholder='Delivery Days'
                onChange={e=>setDeliveryDays(e.target.value)}
                /><br />
              </div> 
              <div className="addPostItem">
                <label>Starting Bidding Price</label>
                <input 
                type="number" 
                className='addPostInput' 
                placeholder='Starting Bid Prices'
                name='title'
                onChange={e=>setStartingBidPrice(e.target.value)}
                /><br />
              </div>
              {description.map((element, index) => (
            <div className="addPostItem" key={index}>
              <label>Description Title</label>
              <input className='addPostInput' type="text" name="desc_title" value={element.desc_title || ""} onChange={e => handleChange(index, e)} />
              <label>Description</label>
              <input className='addPostInput' type="text" name="description" value={element.description || ""} onChange={e => handleChange(index, e)} />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))} 
              <div className="addPostItem">
                <label>Upload Image</label>
                <input 
                type="file" 
                className='addPostFile'
                accept='image/*'
                multiple 
                onChange={(e)=>setFile(e.target.files)}
                /><br />
              </div>
                <div className="addPostItem">
                  <button className="addPostSubmit" type="button" onClick={() => addFormFields()}>Add</button>
                  <button className="addPostSubmit" type="submit">Post</button>
                </div>
            </form>
          
            {
            file && Object.keys(file).map((ele,key)=>(
                <img
                key={key} 
                 className='addPostImg' 
                 src={URL.createObjectURL(file[key])} 
                 alt="" 
                 />
            ))
          }
            
        </div>
    </div>
    </div>
    </>
  )
}
