import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const AddStudent = () => {
  const[values,setValues] = useState({
    roll_no:"",
    full_name:"",
    mobile:"",
    email:"",
    dob:"",
    status:""

  })
  const navigate = useNavigate()
  useEffect(()=>{
if(!localStorage.getItem('token')){
  navigate('/')
}
  },[])

  const handleAddStudent=(event) => {
    event.preventDefault()
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhcm92YXIiLCJpYXQiOjE2OTg0OTA3ODJ9.ZxC81FMSfXUrgTNOq3oae2U9v6epNXS1iAgbivo_ETQ"
    
    const headers = {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
    };
    axios.post('http://localhost:9000/api/student/add',values,{headers})
    .then((response) => {
      if(response.data.status==="success"){
        navigate('/studentList')
        alert('Successfully added:'+response.data.message)
      }else{
        alert("Error: " + response.data.message)
      }
    })
    .catch((error) => console.log(error))

  }

console.log(values);
  return (
    <div className='d-flex  justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded w-50'>
        <h1>Add Student</h1>
        <div class="grid-container">
        <button className='btn btn-danger float-end mb-3' onClick={()=>{
            localStorage.removeItem('token')
            window.location.reload();
          }}>LogOut</button>
        </div>
        

        <form  onSubmit={handleAddStudent}>
        
        <div className='mb-3'>
                <label htmlFor="text">  <strong>Roll No</strong> </label>
                <input type="text" placeholder='Create Roll No. *' name='roll_no'
                 className='form-control rounded-0'
                 onChange={e=>setValues({...values, roll_no: e.target.value})}
                 />
            </div>
            <div className='mb-3'>
                <label htmlFor="text">  <strong>Full Name</strong> </label>
                <input type="text" placeholder='Enter Full Name*' name='full_name'
                 className='form-control rounded-0'
                 onChange={e=>setValues({...values, full_name: e.target.value})}
                 />
            </div>
            <div className='mb-3'>
                <label htmlFor="text">  <strong>Mobile No</strong> </label>
                <input type="text" placeholder='Enter Mobile Number *' name='mobile' 
                className='form-control rounded-0'
                onChange={e=>setValues({...values, mobile: e.target.value})}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor="email">  <strong>Email ID</strong> </label>
                <input type="email" placeholder='Enter Email *' name='email'
                 className='form-control rounded-0'
                 onChange={e=>setValues({...values, email: e.target.value})}
                 />
            </div>
            <div className='mb-3'>
                <label htmlFor="date">  <strong> Date Of Birth</strong> </label>
                <input type="date" placeholder='Enter Date of Birth *' name='dob'
                 className='form-control rounded-0'
                 onChange={e=>setValues({...values, dob: e.target.value})}
                 />
            </div>
            <div className='mb-3'>
                    <select
                        value={values.status}
                        onChange={e => setValues({ ...values, status: e.target.value })} // Update status in 'values'
                        className='form-control rounded-0'
                        name='status'
                      >
                        <option value="">Select Status</option>
                        <option value="active">ACTIVE</option>
                        <option value="suspended">SUSPENDED</option>
                        <option value="terminate">TERMINATE</option>
                   </select>
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0' >ADD Student</button>
            <Link to={'/studentList'} className='btn btn-secondary w-100 rounded-0 mt-2'>Go To Student List</Link>

        </form>
        
    </div>

</div>
  )
}

export default AddStudent