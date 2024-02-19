import React from 'react'

import ItemsList from './ItemsList';
const Content = ({items,setitems,handlecheck,handledelete}) => {

      return (
    <>
      {(items.length) ? (
        <ItemsList
        items={items}
        handlecheck={handlecheck}
        handledelete={handledelete}/>
      ): (
        <p>Your List is Empty</p>
      )}
    </>
  )
}

export default Content