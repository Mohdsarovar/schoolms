const express = require('express')
const routers = express.Router()
const {userController} = require('../controllers/userControler')
const auth= require('../middlewares/auth')
// teacher Login endpoint
routers.post('/teacher/login',userController.teacherLogin);
// Authentication
routers.get('/teacher/validate',auth,userController.validateuser);

// now student add 
routers.post('/student/add',auth,userController.studentAdd);
// now all students get details 
routers.get('/student/getDetailsList',auth,userController.studentGetDetailsList);
// now all students get details 
routers.get('/student/read/:id',auth,userController.individualRead);

// delete student from the list
routers.delete('/student/delete/:id',auth,userController.deleteStudent);
// delete student from the list
routers.put('/student/update/:id',auth,userController.studentUpdate);


// student attedance has been checked
routers.post('/student/attedance',auth,userController.studentAttedance);

//Get All records attedance of student  has been showen
routers.post('/student/getAllattendance/:id',auth,userController.studentGetattendance);



module.exports = routers



