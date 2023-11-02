import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const ReadAllAttendance = () => {
    const[data,setData]= useState([])
    const {id} = useParams()
console.log(id);
const[values,setValues] = useState({
    attendanceStatus:""

  })
console.log(values);
//     // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbmFuIiwiaWF0IjoxNjk4MzIyOTM4fQ.d16JmJhBXUrS_kg02a9Q156VqDLfab_WCoyIUmSQGhE"
   const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhcm92YXIiLCJpYXQiOjE2OTg2NTkxMTN9.HzBBzCVWYrkAoczpbgYoGj_ypaB5t5MX05mczFRA9VI"

      const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      };
      useEffect(()=>{
        axios.post(`http://localhost:9000/api/student/getAllattendance/${id}`,values,{headers})
        
        .then((response)=>{
            setData(response.data.result)
        })
        .catch((error)=>console.log(error))
    },[values])
  return (
    <div>
      
        <div className='m-3  w-25 mx-auto  d-flex justify-content-end'>
            <label htmlFor="att"><strong>SortBy:</strong></label>
                    <select
                        value={values.attendanceStatus}
                        onChange={e => setValues({ ...values, attendanceStatus: e.target.value })} // Update status in 'values'
                        className='form-control rounded-0'
                        name='attendanceStatus'
                      >
                        <option value="">Select Status</option>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        
                   </select>
           
        </div>
         <div className='d-flex justify-content-center align-items-center m-5'>
      
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
                <th>Attendace Status</th>
                <th>Attendance Date</th>
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
                    <td>{stList.dob}</td>
                    <td>{stList.student_status}</td>
                    <td>{stList.attendance_status}</td>
                    <td>{stList.attendance_date}</td>
                   
                    </tr>
                        })
                    }
                   
                </tbody>
           
        </table>
        
      </div>
      <Link to={'/studentList'} className='btn btn-info mx-3'>Go to List</Link>
    </div>
  )
}

export default ReadAllAttendance