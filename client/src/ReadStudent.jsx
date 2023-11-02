import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ReadStudent = () => {
    const {id} = useParams()
    const[student,setStudent] = useState([])
    const studentInd=student.result
    console.log(studentInd);
    const[values,setValues] = useState({
        student_info_id:"",
        status:""
    
      })
    const navigate = useNavigate()
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhcm92YXIiLCJpYXQiOjE2OTg2NTkxMTN9.HzBBzCVWYrkAoczpbgYoGj_ypaB5t5MX05mczFRA9VI"
    
    const headers = {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
    };

    useEffect(()=>{
        axios.get(`http://localhost:9000/api/student/read/${id}`,{headers})
        .then((response)=>{setStudent(response.data)})
        .catch((error)=>console.log(error))
    },[])
//http://localhost:9000/api/student/attedance/
    const handleCreateAttendance=(event) => {
        event.preventDefault()
       
        axios.post(`http://localhost:9000/api/student/attedance`,values,{headers})
        .then((response)=>{
            if(response.data.Status ==="Success"){
                alert("Attendance created successfully: ",response.data.result.status)
                navigate('/studentList')
            }
            console.log(response.data.Status)})
        .catch((error)=>console.log(error))
        
    }

  return (
    <div>
        <h1>Student Check Mark Attendance</h1>
        
        
        {/* <div  className='d-inline justify-content-center align-items-center'>
            <h4 className='mt-3'>Enroll No: {studentInd.student_info_id} </h4>
            <h4 className='mt-3'>ROLL No: {studentInd.roll_no} </h4>
            <h4 className='mt-3'>Full Name: {studentInd.full_name} </h4>
            <h4 className='mt-3'>Email ID: {studentInd.email} </h4>
            <h4 className='mt-3'>Mobile No: {studentInd.mobile} </h4>
            <h4 className='mt-3'>Date Of Birth: {studentInd.dob} </h4>
            <h4 className='mt-3'>Student Status: {studentInd.status} </h4>
            <h4 className='mt-3'>Addmision Date: {studentInd.created_at} </h4>
        </div> */}
          <div className='d-flex  justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <form onSubmit={handleCreateAttendance}>
      <div className='mb-3'>
        <label htmlFor="text">
          <strong>Enroll No</strong>
        </label>
        <input
          type="text"
          placeholder='Enter Enroll no *'
          name='student_info_id'
          className='form-control rounded-0'
          onChange={e => setValues({ ...values, student_info_id: e.target.value })}
        />
      </div>
      <div className='input-group mb-3'>
      <div className='mb-3 input-group-text'>
        <label>
          <strong className='mx-2'>Present</strong>
        </label>
        <input
          type="radio"
          name='status'
          value='present' // Set the value for the first radio button
          className='form-check-input mt-0'
          onChange={e => setValues({ ...values, status: e.target.value })}
        />
        <label>
          <strong className='mx-2'>Absent</strong>
        </label>
        <input
          type="radio"
          name='status'
          value='absent' // Set the value for the second radio button
          className='form-check-input mt-0'
          onChange={e => setValues({ ...values, status: e.target.value })}
        />
      </div>
      </div>
      <button type='submit' className='btn btn-success w-100 rounded-0'>
        Add Attendance
      </button>
    </form>
    </div>
    </div>
    </div>
  )
}

export default ReadStudent