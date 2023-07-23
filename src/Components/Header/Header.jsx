import React from 'react'
import netflix from "../Header/net.png"
import { Link } from "react-router-dom"
import {ImSearch} from "react-icons/im"
const Header = () => {
 
  return (
         <nav className="header">
      {<img src={netflix} alt="this is netflix logo" />}
      
      <div>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/recent">Recent</Link>
        <Link to="/mylist">My List</Link>
      </div>
      <ImSearch/>
   </nav>
  )
}

export default Header