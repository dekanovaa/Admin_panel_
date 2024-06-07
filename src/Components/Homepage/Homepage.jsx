
import './Homepage.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { message } from 'antd'


function Homepage() {
  const [openpost, setOpenpost] = useState(false)
  const [opendelete, setOpendelete] = useState(false)
  const [openedit, setOpenedit] = useState(false)
  const [id, setId] = useState(null)
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const [data,setData] = useState({name_en:"name_en", name_ru:"name_ru", images:"images"})
  const imgurl = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/`


  const getCategory = () =>{
    setLoading(true)
    axios({
      url:'https://autoapi.dezinfeksiyatashkent.uz/api/categories',
      method:`GET`,
    })
    .then((res) =>{
      setCategory(res.data.data)
      setLoading(false)
    })
    .catch((err) =>{
      console.log(err);
    } )
  }
  useEffect(() =>{
    getCategory()
  },[])

  ////////////////////////////////////////////////////////////////
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNTAwNjI0OCwiZXhwIjoxNzQ2NTQyMjQ4fQ.uMRbDZduB_z8LXgdTho8kBggg9Zrz6SNCwqmFcas10E';


  const createCategory =(e) =>{
      e.preventDefault();
      setLoading(true)
      const name_ru = document.getElementById("name_ru").value;
      const name_en = document.getElementById("name_en").value;
      const images = document.getElementById("images").files[0];
      const formData = new FormData();
      formData.append("name_en",name_en)
      formData.append("name_ru",name_ru)
      formData.append("images",images)

  const headers = {
      Authorization: `Bearer ${token}`,
  };
      axios({
          url:'https://autoapi.dezinfeksiyatashkent.uz/api/categories',
          method:'POST',
          data:formData,
          headers:headers,
      })
      .then((res) => {
          setOpenpost(false)
          setLoading(false)
          message.success("Joylandi")
          getCategory()
         
      })
      .catch((err) =>{
          console.log(err);
          message.err("Xatolik bo'ldi")
         getCategory()
      })

  }
  ////////////////////////////////////////////////////////////////////////////
  const openpostModal = () => {
    setOpenpost(true)
  }
  const closepostModal = () => {
    setOpenpost(false)
  }

  const opendeleteModal = (id) => {
    setId(id)
    setOpendelete(true)
  }
  const closedeleteModal = () => {
    setOpendelete(false)
  }

  const openeditModal = (item) => {
    setId(item.id)
    console.log(item);
    setData({...data, name_en:item.name_en, name_ru:item.name_ru, images:item.image_src})
    setOpenedit(true)
  }
  const closeeditModal = () => {
    setOpenedit(false)
  }
  ////////////////////////////////////////////////////////////////////

  const deleteCategory = (e) =>{
    e.preventDefault()
    setLoading(true)
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    axios({
      url: `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
      method: 'DELETE',
      headers: headers,
    })
    .then((res)=>{
      setOpendelete(false)
      message.success("Deleted")
      const newCategory = category.filter(item=>item.id!==id)
      setCategory(newCategory)
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err);
      message.error("Couldn't delete")
     getCategory()
      setOpendelete(false)
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const editCategory = (e) =>{
    e.preventDefault();
    const formData = new FormData()
    formData.append("name_en",data.name_en);
    formData.append("name_ru",data.name_ru);
    formData.append("images",data.images);
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
      method:'PUT',
      body:formData,
    })
    .then(res=>res.json())
    .then(res=>{
      getCategory()
      setOpenedit(false)
      if(res.success){
        message.success("Ajoyib")
      }
      else{
        message.error("Xatolik")
      }
    })
    .catch(error=>{
      console.log(error);
      setOpenedit(false)
    })
  }


  

  

  return (
    <div className="home">
     {
       loading? <div className="loading">Loading...</div> :
       <div className="container home__container">
       <button type="submit" onClick={openpostModal} id="post__btn">Add</button>
     <table>
       <tr>
           <th>name_en</th>
           <th>name_ru</th>
           <th>img</th>
           <th>command</th>
       </tr>
       {
       category && category.map((item,index) =>(
       <tr key={index}>
       <td>{item.name_en}</td>
       <td>{item.name_ru}</td>
       <td><img className="home__img" src={`${imgurl}${item.image_src}`} alt="car"/></td>
       <td>
         <button id="delete__btn"  onClick={() => opendeleteModal(item.id)}>Delete</button>
         <button id="edit__btn" onClick={() => openeditModal(item)}>Edit</button>
       </td>
       </tr>
              ))
             }
   </table>
     </div>
     }


     { openpost ? <div className="form">
            <form>
                 <button id="close__btn" onClick={closepostModal}>x</button>
                <input type="text" id="name_en" placeholder="English name"/>
                <input type="text" id="name_ru" placeholder="Russian name"/>
                <input type="file" id="images"/>
                <button id="btn" type="Submit">Send</button>
            </form>
            </div> : " "}


            { opendelete ? (<div className="form" onSubmit={deleteCategory}>
              <p>Rostdan ham o'chirmoqchimisiz?</p>
              <button id="delete" type="submit" onClick={deleteCategory}>Ha</button>
              <button id="delete" onClick={closedeleteModal}>Yo'q</button>
            </div>
            ): " " }


            { openedit ? (
              <form id="form" className="form" onSubmit={editCategory}>
                <button id="close__btn" onClick={closeeditModal}>x</button>
                <p>Tahrirlash</p>
                <input type="text" value={data.name_en} onChange={(e) => setData({...data, name_en:e.target.value})}/>
                <input type="text" value={data.name_ru} onChange={(e) => setData({...data, name_ru:e.target.value})}/>
                <input type="file" onChange={(e) => setData({...data, images:e.target.files[0]})}/><br/>
                <button type="submit" onSubmit={editCategory}>Save</button>
              </form>
            ):" "

            }
    </div>
  )
}

export default Homepage
