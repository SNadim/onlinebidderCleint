import './writePost.scss';
import { useState } from 'react';
import axios from 'axios';
export const WritePost = () => {

    const [file, setFile] = useState(null);
    const [title,setTitle] = useState("");
    const [startDate,setStartDate] = useState(null);
    const [endDate,setEndDate] = useState(null);
    const [deliveryDays,setDeliveryDays] = useState(0);
    const [startingBidPrice,setStartingBidPrice] = useState(0);
    const [description, setDescription] = useState([{ desc_title: "", description : ""}])

  
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
      console.log(res);
    }
  }
  return (
    <div className='writePost'>
      <div className="wrapper">
        <form id='post' onSubmit={handleSubmit} encType="multipart/form-data">
              <h1>Write Post</h1>
              <input type="text" placeholder='Title' onChange={e=>setTitle(e.target.value)} />
              <input type="datetime-local" onChange={e=>setStartDate(e.target.value)}/>
              <input type="datetime-local" onChange={e=>setEndDate(e.target.value)}/>
              <input type="number" placeholder='Delivery Days' onChange={e=>setDeliveryDays(e.target.value)}/>
              <input type="number" placeholder='Starting Bid Prices' onChange={e=>setStartingBidPrice(e.target.value)}/><br />
              {description.map((element, index) => (
            <div className="form-inline" key={index}>
              <label>Description Title</label>
              <input type="text" name="desc_title" value={element.desc_title || ""} onChange={e => handleChange(index, e)} />
              <label>Description</label>
              <input type="text" name="description" value={element.description || ""} onChange={e => handleChange(index, e)} />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
            <input 
              type="file"
              name="postImage" 
              accept='image/*'
              multiple
              onChange={(e)=>setFile(e.target.files)}/><br/>
               <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
              <button className="button submit" type="submit">Post</button>
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
  )
}
