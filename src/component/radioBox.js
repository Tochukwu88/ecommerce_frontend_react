import React, { useState } from 'react'



 const RadioBox = ({prices,handleFilters}) =>{
    const [values,setValue] = useState(0)
    const handleChange =(e)=>{
        handleFilters(e.target.value)
        setValue(e.target.value)

    }
    return(
        prices.map((p,i)=>(
            <l key={i}>
                <input onChange={handleChange} name={p} value={`${p._id}`}  type='radio'/>
                <label>{p.name}</label>
            </l>
        ))
      )
}
export default RadioBox