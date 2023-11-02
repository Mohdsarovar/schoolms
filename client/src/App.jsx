import React from "react"; 
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./Login";
import AddStudent from "./AddStudent";
import StudentList from "./StudentList";
import ReadStudent from "./ReadStudent";
import ReadAllAttendance from "./ReadAllAttendance";
import UdateStudent from "./UdateStudent";

function App() {
  return (
   <>
  <BrowserRouter>
  
  <Routes>
      <Route path="/" element = {<Login/>} ></Route>
      {/* <Route path="/navbar" element = {<Navbar/>} ></Route> */}
      <Route path="/addStudent" element = {<AddStudent/>}></Route>
      <Route path="/studentList" element = {<StudentList/>}></Route>
      <Route path="/readStudent/:id" element = {<ReadStudent/>}></Route>
      <Route path="/readAttendance/:id" element = {<ReadAllAttendance/>}></Route>
      <Route path="/editStudent/:id" element = {<UdateStudent/>}></Route>
  </Routes>
  </BrowserRouter>
   </>
  );
}

export default App;
