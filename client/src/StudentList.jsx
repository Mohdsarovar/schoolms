import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Userdob from './User.dob'
// import '../src/style/style.css/sarwar'
// import '../src/style/style.css/ yunus'


const StudentList = () => {
    const[values,setValues] = useState({
        full_name:"",
        mobile:"",
        email:"",
        dob:"",
      
    
      })
      const{full_name,email,dob,mobile}= useParams()
      console.log(full_name,email,dob,mobile);
      console.log(values);
    const[data,setData]= useState([])
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhcm92YXIiLCJpYXQiOjE2OTg2NTkxMTN9.HzBBzCVWYrkAoczpbgYoGj_ypaB5t5MX05mczFRA9VI"
    
    const headers = {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
    };
    const handleSearchStudent=(event)=>{
        event.preventDefault()
        
        axios.get("http://localhost:9000/api/student/getDetailsList",values,{headers})
        .then((response)=>{setData(response.data.result)
            // console.log('studentList',response);

        })
        .catch((err)=>{
            console.log(err);
        })
    //  const{full_name,email,dob,mobile} = values
    //     console.log(full_name,email,dob,mobile);
    }


    useEffect(()=>{
        axios.get("http://localhost:9000/api/student/getDetailsList",{headers})
        .then((response)=>{setData(response.data.result)
            console.log('studentList',response);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    const handleDelete=(id)=>{
        axios.delete(`http://localhost:9000/api/student/delete/${id}`,{headers})
        .then((response)=>{
            setData(data.filter(student => student.id !== id));
            window.location.reload();
            alert(response.data.message)
        })
        .catch((error)=>{console.log(error);})
    
    }
  return (
    <div>
    <div>
    <form onSubmit={handleSearchStudent}>
        
            <input type="search" placeholder='Search Name' name='full_name'
                 className='m-2'
                 onChange={e=>setValues({...values, full_name: e.target.value})}
                 />
              <input type="search" placeholder='Search with Email' name='email'
                 className='m-2'
                 onChange={e=>setValues({...values, email: e.target.value})}
                 />
               <input type="search" placeholder='Mobile' name='mobile'
                 className='m-2'
                 onChange={e=>setValues({...values, mobile: e.target.value})}
                 />
            <input type="search" placeholder='Date Birth' name='dob'
                 className='m-2'
                 onChange={e=>setValues({...values, dob: e.target.value})}
                 />
                <button type='submit' value="search">Search</button>
          
      
           
        </form>
    </div>
       <div className='d-flex justify-content-end align-items-center text-right'>
        
            <Link to="/addStudent" className='btn btn-success text-right m-3' >Add Student</Link>
        </div>
      <div className='d-flex justify-content-center align-items-center m-5'>
      
      <div className="table-container">
      <table className='table table-bordered border-primary'>
            <thead>
           <tr>
           <th>Enroll No</th>
                <th>ROLL No.</th>
                <th>Full Name</th>
                <th>Email ID</th>
                <th>Mobile No</th>
                <th>Date Of Birth</th>
                <th>Student Status</th>
                <th>Action</th>
           </tr>
                </thead>
                <tbody>
                    {
                        data.map((stList,index)=>{
                            return <tr key={index}>

                    <td>TS{stList.student_info_id}</td>
                    <td>{stList.roll_no}</td>
                    <td>{stList.full_name}</td>
                    <td>{stList.email}</td>
                    <td>{stList.mobile}</td>
                    <td><Userdob dob ={stList.dob } /> </td>
                    <td>{stList.status}</td>
                    <td>
                        <Link to={`/readStudent/${stList.student_info_id}`} className='btn btn-success mx-1'>Attendance</Link>
                        <Link to={`/readAttendance/${stList.student_info_id}`} className='btn btn-info mx-1'>View</Link>
                        <Link  to={`/editStudent/${stList.student_info_id}`} className='btn btn-primary mx-1'>Edit</Link>
                        <button onClick={()=>handleDelete(stList.student_info_id)} className='btn btn-danger mx-1 my-1'>Delete</button>

                    </td>
                            </tr>
                        })
                    }
                    <tr>
                  
                    </tr>
                </tbody>
           
        </table>
      </div>
     
      </div>
    </div>
  )
}

export default StudentList