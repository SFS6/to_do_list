import React from 'react'
import {FaTrash} from 'react-icons/fa';

const LineItem = ({item,handlecheck,handledelete}) => {
  return (
    <li className="item">
              <input 
              type="checkbox"  
              onChange={()=>handlecheck(item.id)} 
              checked={item.checked}/>
              <label 
              style={(item.checked)? {textDecoration:"line-through"}:null}
              onDoubleClick={()=>handlecheck(item.id)}>{item.item}</label>
              <FaTrash 
              onClick={()=>handledelete(item.id)}
              role="button" tabIndex="0"
              aria-label={`Delete ${item.item}`}/>
            </li>
  )
}

export default LineItem