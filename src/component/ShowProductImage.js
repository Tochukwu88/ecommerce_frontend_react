import React from 'react'
import { API } from '../config'


 const ShowPhoto = ({item,url}) =>{
     return(
         <>
         <img src={`${API}/${url}/photo/${item._id}`}
          alt={item.name}></img>

         </>
     )

 }
 export default ShowPhoto