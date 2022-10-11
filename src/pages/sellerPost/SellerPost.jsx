import './post.css';
import { Publish } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import TopBar from '../../components/topBar/TopBar';
import SideBar from '../../components/sidebar/SideBar';


const initialState = {
    productID: 0,
    title: "",
    startDate:"",
    endDate:"",
    startingBidPrice: 0,
    deliveryDays: 0,
}

export default function SellerPost() {

    const [state, setState] = useState(initialState);
    const {productID,title, startDate, endDate, startingBidPrice, deliveryDays} = state;
    const [images,setImages] = useState([]);
    const [descriptions,setDescriptions] = useState([{title:"", description:""}]);
    const [file, setFile] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();

    // const loadCat = async () => {
    //     await axios.get("https://reignmart.herokuapp.com/categories")
    //     .then(res=>{setCats(res.data)})
    //     .then(err=>{console.log(err)});
    // }

    useEffect(()=>{
        axios.get(`https://reignmart.herokuapp.com/products/${postId}`)
        .then((res)=>{
            setState({...res.data[0][0]});
            setImages(res.data[1]);
            setDescriptions(res.data[2])
        })
        .catch(err=>console.log(err));
        // loadCat();
    }, [postId]);

   const handleSubmit = async (e)=>{
       e.preventDefault();
       try {
       const res = await axios.put(`https://reignmart.herokuapp.com/products/${productID}`,{title,
       startDate,
       endDate,
       startingBidPrice,
       deliveryDays,
       descriptions
    },{withCredentials: true});
    setTimeout(()=>{
        navigate(`seller/post/${postId}`,{replace:true});
    }, 500)
       } catch (error) {
        console.log(error.message)
       }
   }

// handle multiple description field

let handleChange = (i, e) => {
    let newDescription = [...descriptions];
    newDescription[i][e.target.name] = e.target.value;
    setDescriptions(newDescription);
}

let addFormFields = () => {
    setDescriptions([...descriptions, {title:"", description: ""}])
}

let removeFormFields = (i) => {
    let newDescription = [...descriptions];
    newDescription.splice(i,1);
    setDescriptions(newDescription);
}
    
const removeImage = async ({productID, image}) => {
    try {
        const res = await axios.delete(`https://reignmart.herokuapp.com/products/removeImage?image=${image}&productID=${productID}`,{withCredentials: true});
        toast.success("Deleted image successfully");
        setTimeout(()=>{
            navigate(`seller/post/${postId}`,{replace:true});
        }, 500)
    } catch (error) {
        console.log(error);
    }

}

const addImage = async (e)=>{
    e.preventDefault();
    if(file) {
        try { 
           let formData = new FormData();
           formData.append("productID",productID);
           formData.append("postImage",file);
           const res = await axios.post("https://reignmart.herokuapp.com/products/addImage",formData,{withCredentials: true});
            toast.success("Image inserted successfully");
            navigate(`/seller/post/${postId}`,{replace:true});
        } catch (error) {
            console.log(error);
        }
    }
    
}
  return (
    <>
    <TopBar />
    <ToastContainer position="top-center" />
    <div style={{ display: "flex" }}>
      <SideBar />
    <div className='post'>
        <div className="postTitleContainer">
          <h3 className="postTitle">Post</h3>
        </div>
          <div className="postTop">
            <div className="postInfoTop">
            {
                images.map((element,key)=>(
                    <div key={key}>
                         <img 
                        src={`https://reignmart.herokuapp.com/images/products/${element.image}`}
                        alt="" 
                        className="postInfoImg" 
                        />
                        <button className='addPostSubmit' onClick={e=>removeImage(element)}>Remove</button>
                    </div>
                   
                ))
            }
                    
                </div>
                <div className="postInfoBottom">
                <span className="postTitle">{title}</span>
                    <div className="postInfoItem">
                        <span className="postInfoKey">id:</span>
                        <span style={{marginLeft:"116px"}} className="postInfoValue">{productID}</span>
                    </div>
                    <div className="postInfoItem">
                        <span className="postInfoKey">Auction Start At:</span>
                        <span style={{marginLeft:"100px"}} className="postInfoValue">{startDate}</span>
                    </div>
                    <div className="postInfoItem">
                        <span className="postInfoKey">Auction End At:</span>
                        <span style={{marginLeft:"100px"}} className="postInfoValue">{endDate}</span>
                    </div>
                    <div className="postInfoItem">
                        <span className="postInfoKey">Starting Bid Price:</span>
                        <span style={{marginLeft:"100px"}} className="postInfoValue">{startingBidPrice} ৳</span>
                    </div>
                    <div className="postInfoItem">
                        <span className="postInfoKey">Delivery within :</span>
                        <span style={{marginLeft:"100px"}} className="postInfoValue">{deliveryDays} Days</span>
                    </div>
                </div>
          </div>


      <div className="postBottom">
          <form className="postForm" onSubmit={handleSubmit}>
              <div className="postFormLeft">
                  <label>Post Title</label>
                  <input 
                  type="text" value={title}
                  onChange={(e)=>setState({...state,title: e.target.value})} 
                  />
                  <label>Bid Start At</label>
                  <input 
                  type="datetime-local"
                  onChange={(e)=>setState({...state,startDate: e.target.value})} 
                  />
                  <label>Bid End At</label>
                  <input 
                  type="datetime-local"
                  onChange={(e)=>setState({...state,endDate: e.target.value})} 
                  />
                  <label>Starting Bid Price</label>
                  <input 
                  type="number" value={startingBidPrice}
                  onChange={(e)=>setState({...state,startingBidPrice: e.target.value})} 
                  />
                  <label>Delivery within : </label>
                  <input 
                  type="number" value={deliveryDays}
                  onChange={(e)=>setState({...state,deliveryDays: e.target.value})} 
                  />
                  <label>Post Description</label>
                  {
                    descriptions.map((element, index)=>(
                        <div className="addPostItem" key={index}>
                            <label>Description Title</label>
                            <input type="text" name='title' value={element.title || ""} onChange={e=>handleChange(index, e)} />
                            <label>Description</label>
                            <input type="text" name='description' value={element.description || ""} onChange={e=>handleChange(index, e)} />
                            {
                index ? 
                  <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
                        </div>
                    ))
                  }

              </div>
              <div className="postFormRight">
                  <div className="postUpload">
                      {
                          file && (
                            <img 
                            src={URL.createObjectURL(file)} 
                            alt="" 
                            className="postUploadImg" 
                            />
                          )
                      }
                      
                      <label htmlFor="file">
                          <Publish />
                      </label>
                      <input 
                      type="file" 
                      id='file' 
                      style={{display:"none"}}
                      name="postImage"
                      onChange={e=>setFile(e.target.files[0])} 
                      />
                      <button className="postButton" onClick={addImage}>Add Image</button>
                  </div>
                  <button type='submit' className="postButton">Update</button>
              </div>
              
          </form>
          <button className="addPostSubmit" type="button" onClick={() => addFormFields()}>Add</button>
      </div>


    </div>
    </div>
    </>
  )
}
