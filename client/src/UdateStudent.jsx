import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const UdateStudent = () => {
    const [values, setValues] = useState({
        roll_no: '',
        full_name: '',
        mobile: '',
        email: '',
        dob: '',
        status: '',
    });
    console.log(values);
      const navigate = useNavigate()
      const {id} = useParams()
      const token = localStorage.getItem('token');
      useEffect(()=>{
    if(!token){
      navigate('/')
    }
      },[navigate, token])
  
      const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      };
  
      useEffect(() => {
        // Fetch the student's data and update the form fields
        axios.get(`http://localhost:9000/api/student/read/${id}`, { headers })
            .then((response) => {
                const studentData = response.data.result;
                console.log(studentData);
                // setValues({ ...studentData });
                setValues(studentData);
            })
            .catch((error) => console.log(error));
    }, [id]);
    const handleSubmit = (e) => {
        e.preventDefault();
      
        axios.put(`http://localhost:9000/api/student/update/${id}`, values, { headers })
            .then((response) => {
                alert(response.data.message)
                // console.log()
                navigate('/studentList'); 
            })
            .catch((error) => {
                console.error(error);
            });
    };

  return (
    <div className='d-flex  justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded w-50'>
        <h1>Update Student</h1>
        <form onSubmit={handleSubmit}>
        <div className='mb-3'>
                <label htmlFor="text">  <strong>Roll No</strong> </label>
                <input type="text" placeholder='Create Roll No. *' name='roll_no'
                 className='form-control rounded-0'
                 value={values.roll_no}
                 onChange={e=>setValues({...values, roll_no: e.target.value})}
                
                 />
            </div>
            <div className='mb-3'>
                <label htmlFor="text">  <strong>Full Name</strong> </label>
                <input type="text" placeholder='Enter Full Name*' name='full_name'
                 className='form-control rounded-0'
                 value={values.full_name}
                 onChange={e=>setValues({...values, full_name: e.target.value})}
                 
                 />
            </div>
            <div className='mb-3'>
                <label htmlFor="text">  <strong>Mobile No</strong> </label>
                <input type="text" placeholder='Enter Mobile Number *' name='mobile' 
                className='form-control rounded-0'
                value={values.mobile}
                onChange={e=>setValues({...values, mobile: e.target.value})}
               
                />
            </div>
            <div className='mb-3'>
                <label htmlFor="email">  <strong>Email ID</strong> </label>
                <input type="email" placeholder='Enter Email *' name='email'
                 className='form-control rounded-0'
                 value={values.email}
                 onChange={e=>setValues({...values, email: e.target.value})}
                 
                 />
            </div>
            <div className='mb-3'>
                <label htmlFor="date">  <strong> Date Of Birth</strong> </label>
                <input type="date" placeholder='Enter Date of Birth *' name='dob'
                 className='form-control rounded-0'
                 value={values.dob}
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
                        <option value="">{values.status}</option>
                        <option value="active">ACTIVE</option>
                        <option value="suspended">SUSPENDED</option>
                        <option value="terminate">TERMINATE</option>
                   </select>
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0' >Update</button>
                <Link to={'/studentList'} >Go To Student List</Link>
        </form>
        
    </div>

</div>
  )
}

export default UdateStudent