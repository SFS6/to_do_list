import React from 'react'

const SearchItem = ({search,getsearch}) => {
  return (
    <form className="form" onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="search">Search</label>
        <input type="text" 
        role="searchbox" 
        id="search"
        placeholder='Search items....'  
        value={search}
        onChange={(e)=>getsearch(e.target.value)}/>
    </form>
  )
}

export default SearchItem