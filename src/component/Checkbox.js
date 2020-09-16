import React, { useState } from 'react'
 const Checkbox = ({category,handleFilters}) =>{
      const [checked , setChecked] = useState([])
      const handleToggle = c => ()=>{
          const currentCatId = checked.indexOf(c)
          const newCheckedCatId = [...checked]
          if(currentCatId === -1){
              newCheckedCatId.push(c)
          }else{
              newCheckedCatId.splice(currentCatId,1)
          }
         
          setChecked(newCheckedCatId)
          handleFilters(newCheckedCatId)

      }
     return(
       category.map((c,i)=>(
           <l key={i}>
              
               <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)}  type='checkbox'/>
               <label>{c.name}</label>
           </l>
       ))
     )
 }
 export default Checkbox