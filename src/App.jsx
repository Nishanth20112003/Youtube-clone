import Navbar from "./Components/Navbar/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';
import { useState } from "react";

function App() {
  let [sidebar, setSidebar] = useState(true);
  return (
    <>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>}></Route>
        <Route path='/video/:categoryId/:videoId' element={<Video/>}></Route>
      </Routes>
    </>
  )
}

export default App
