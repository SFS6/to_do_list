import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'
 
const Additem = ({newItem,setNewItem,handleSubmit}) => {
  const inputref=useRef()
  return (
    <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="additem">Additem</label>
        <input autoFocus 
        ref={inputref}
        type = "text" id = 'addItem' 
        placeholder = 'Add Item' required
        value = {newItem}
        onChange = {(e) => setNewItem(e.target.value)} 
        />
        <button type='submit' aria-label='Add-Item' 
        onClick={()=>inputref.current.focus()}>
            <FaPlus/>
        </button>
    </form>
  )
}

export default Additem