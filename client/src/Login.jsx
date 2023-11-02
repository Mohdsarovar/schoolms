import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const[values,setValues] = useState({
        username:"",
        password:""
    
      })
      const navigate = useNavigate()
      const handleLogin=(event) => {
        event.preventDefault()
     
        axios.post('http://localhost:9000/api/teacher/login',values)
        .then((response) => {
            console.log(response);
          if(response.data.status==="success"){
            const token = response.data.result.token;
            // localStorage.setItem('token', token);
            axios.get('http://localhost:9000/api/teacher/validate', {
                headers: {
                  'Authorization': `${token}`, // Include the token in the headers
                },
              })
              .then((validateResponse) => {
                const authValidate = validateResponse.data.result
                if(authValidate.isValid===true){
                    alert(validateResponse.data.message)
                    navigate('/AddStudent')
                    localStorage.setItem('token', token);
                } else{
                    alert(authValidate.message)
                    navigate('/login')
                }

              })
              .catch((validetTeacherError) => {
                console.error('validate API Error:', validetTeacherError);
              });

          }else{
            alert("Error: " + response.data.message)
          }
        })
        .catch((error) => console.log(error))
    
      }
  
  return (
    <div className='d-flex  justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h1>Login</h1>
            <form  onSubmit={handleLogin}>
                <div className='mb-3'>
                    <label htmlFor="text">  <strong>User Name</strong> </label>
                    <input type="text" placeholder='Enter user Name *' name='username'
                     className='form-control rounded-0'
                     onChange={e=>setValues({...values, username: e.target.value})}
                     />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password">  <strong> Password</strong> </label>
                    <input type="password" placeholder='Enter password *' name='password'
                    className='form-control rounded-0'
                    onChange={e=>setValues({...values, password: e.target.value})}
                    />
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0' >Login</button>
            </form>
           

        </div>

    </div>
  )
}

export default Login