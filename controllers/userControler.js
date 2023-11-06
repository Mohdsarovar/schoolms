
const jwt =require('jsonwebtoken')
const configkey = require('../config/secreatekey')
const pool = require('../config/conn.db')
// const { query } = require('express')
const {dateUtil} = require('../util/date.util')
const {mastersModel} = require('../master/master.model')






let userController ={}


const create_token = async(username)=>{
    try {
       const token = jwt.sign({username:username}, configkey.secret_key)
       return token
    } catch (error) {
        res.status(400).send(error.message)
    }
}
  
// A teacher login is required
userController.teacherLogin= async(req,res) =>{
    try {
        const users = {
            sarovar: {
              username: 'sarovar',
              password: 'password123',
            },
            adnan: {
              username: 'adnan',
              password: 'password456',
            },
          };
       
        const username =req.body.username;
        const password =req.body.password;
      
        // Check if the user exists
        const user = users[username];
        if (!user) {
          return res.status(404).send({code:"404", message: 'User not found'});
        }
      
        // Check the password
        if (user.password !== password) {
          return res.status(401).send({code:"401", message: 'Incorrect password' });
        }
      
     const tokenData = await create_token(username)
       
        res.status(200).send({code:"200",status:"success", message: 'Login successful',result: {token: tokenData,username}});  
    } catch (error) {
        res.status(500).send({ message:"server internal error while login" , error: error });
    }
      
}

// teacher logged authenticated
userController.validateuser = async(req, res)=>{
    try {
    res.status(200).send({code:"200",status:"success" ,message:"authentication successful",result:{isValid :true}})
    } catch (error) {
        res.status(500).send({code:"500",message:"internal server error while  authentication", error:error.message})
    }
}
// A student add controller
// varufy insertId 
userController.studentAdd = async(req, res)=>{
try {
 // destructuring req
 const { body } = req;
 const currentDate = dateUtil.getDbNow();
 


const{roll_no,email,mobile,full_name,dob,status} = req.body
// const rearreangeDateDOB = dateUtil.getDobDate(dob)// dd-mm-yyyy to yyyy-mm-dd

 const sql = `INSERT INTO student_info(
    student_info_id,
    roll_no,
    email,
    mobile,
    full_name,
    dob,
    status,
    created_at,
    updated_at
)
VALUES(
    NULL,
    '${roll_no}',
    '${email}',
    '${mobile}',
    '${full_name}',
    '${dob}',
    '${status}',
    '${currentDate}',
    '${currentDate}'
);`;
 pool.query(sql, async(err, result) => {
    if (err) {
        apiLogId = await mastersModel.createAPILog(
            {
                incomingRequest: JSON.stringify(body),
                action:"Add students",
                responce:JSON.stringify(err),
                createdAt : currentDate
            }, 
        );
        
        return err;
    } else {
        const lastInsertId = result.insertId;
        // console.log(`Inserted with ID: ${lastInsertId}`);
      
       await mastersModel.createAPILog(
            {
                incomingRequest: JSON.stringify(body),
                action:"Add students",
                responce:JSON.stringify(lastInsertId),
                createdAt : currentDate
            }, 
        );
        
     return res.status(201).send({code:"201",status:"success",message:`Inserted with ID: ${lastInsertId}`,result:{student_info_id:lastInsertId}})
    }
});

} 
catch (error) {
  return  res.status(500).send({code:"500",message:"Internal Server Error while creating primary key of student_info_id",error:error});
}

}
// retrive all records and 
//search student with thier name, email and mobile phone number
userController.studentGetDetailsList = async (req,res) => {
    try {
    const full_name = req.query.full_name;
    const email = req.query.email;
    const dob = req.query.dob;
    const mobile = req.query.mobile;    
    
    let sql = "SELECT * FROM student_info"

    if (full_name || email || dob || mobile) {
        sql = `SELECT * FROM student_info WHERE 
            full_name LIKE '%${full_name}%' AND email LIKE '%${email}%' AND dob LIKE '%${dob}%' AND mobile LIKE '%${mobile}%'`;
    }
 
    
    pool.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ code: "500", message: "Internal error while getting details" });
        } else if (!result || result.length === 0) {
            res.status(404).send({ code: "404", message: "Data not found" });
        } else {
            result.forEach((item) => {
                const dobDate = new Date(item.dob);
                const formattedDOB = dobDate.toLocaleDateString('en-US');
                item.dob = formattedDOB;
            });
            res.status(200).send({ code: "200", message: "Records of students successfully", result: result});

        }
    })
    } catch (error) {
        res.status(500).send({ code: "500", message: "Internal server error while getting details",error: error });
    }
}
// retrive single records and 
// read details of individual student
userController.individualRead = async (req,res) => {
    try {
    const {id}= req.params;
    
    let sql = `SELECT * FROM student_info WHERE student_info_id =${id}`;
    pool.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ code: "500", message: "Internal error while getting details" });
        } else if (!result || result.length === 0) {
            res.status(404).send({ code: "404", message: "Data not found" });
        } else {
             // Convert date format before sending the response
             result[0].dob = new Date(result[0].dob).toISOString().split('T')[0];

            res.status(200).send({ code: "200", message: "Records of students successfully", result: result[0] });
        }
    })
    } catch (error) {
        res.status(500).send({ code: "500", message: "Internal server error while getting details",error: error });
    }
}


// student delete from database
userController.deleteStudent = async(req, res)=>{
    try {
        const id = req.params.id
    let sql  = ` DELETE FROM student_info WHERE student_info_id =${id}`
    pool.query(sql, function(err, result){
        if(!result){
            res.status(200).send({code:"200", message:"not found id for student info"})
        } else{
            res.status(200).send({code:"200", message:`${id} is successfully deleted`})
        }
    })
    } catch (error) {
        res.status(500).send({code:"500", message:"Internal Server Error while delete student", error})
    }
}

// data update
userController.studentUpdate =async (req,res)=>{
try {
const id= req.params.id;
const{roll_no,email,mobile,full_name,dob,status} = req.body

let sql= `
UPDATE student_info
SET roll_no = '${roll_no}',
    email = '${email}',
    mobile = '${mobile}',
    full_name = '${full_name}',
    dob = '${dob}',
    status = '${status}'
WHERE student_info_id = ${id};
`
pool.query(sql, function (err,results){
 if (results){
        res.status(200).send({code:"200",message:"Success updated student info"})
    } else{
        res.status(404).send({code:"200",message:"data not found"});
    }
})
} catch (error) {
    res.status(500).send({code:"500",message:"server error while updating student" + error})
}
}
// student  attedance check 
userController.studentAttedance = async(req, res)=>{
    try {
        const currentDate = dateUtil.getDbNow();
    const{student_info_id,status} = req.body;
    let sql= `
    INSERT INTO attendance_record(
        attendance_record_id,
        student_info_id,
        status,
        created_at,
        updated_at
    )
    VALUES(
        NULL,
        '${student_info_id}',
        '${status}',
        '${currentDate}',
        '${currentDate}'
    );
    `
pool.query(sql, function (err,results) {
    if(results){
        res.status(201).send({code:"200",Status:"Success",message:"Attendance add successfully",result:{status}});
    } else{
        res.status(400).send({code:"400",Status:"Failure",message:"Attedance not created"})
    }
})
    } catch (error) {
       res.status(500).send('internal server error: ' + error) 
    }
}
// get all attendance records of a student
userController.studentGetattendance = async(req,res)=>{
try {
    const {id}= req.params;
const attendanceStatus = req.body.attendanceStatus;
// console.log(attendanceStatus);
// const {attendanceStauts}= req.query
let sql = `

SELECT
    si.student_info_id,
    si.roll_no,
    si.email,
    si.mobile,
    si.full_name,
    si.dob,
    si.status AS student_status,
    ar.status AS attendance_status,
    ar.created_at AS attendance_date
FROM
    student_info si
LEFT JOIN
    attendance_record ar
ON
    si.student_info_id = ar.student_info_id
WHERE
    si.student_info_id = '${id}'
ORDER BY
    ar.created_at;
`
if (attendanceStatus !== undefined && attendanceStatus !== null && attendanceStatus !== "") {
    sql = `
    SELECT 
    si.student_info_id, 
    si.roll_no, 
    si.email, 
    si.mobile, 
    si.full_name,
    si.dob,
    si.status AS student_status, 
    ar.status AS attendance_status, 
    ar.created_at AS attendance_date
FROM student_info si
LEFT JOIN attendance_record ar
ON si.student_info_id = ar.student_info_id 
WHERE si.student_info_id = '${id}' AND ar.status = '${attendanceStatus}'  
ORDER BY ar.created_at;
 `
}
pool.query(sql, function(err, rows) {
    if (err) {
        console.log(err.message);
    }else if (!rows){
        res.status(404).send({code: "404", message:"No Data Found"})
    } else{
        
        res.status(200).send({code: "200", message:"successfully get all data", result:rows});
    }
})

} catch (error) {
    res.status(500).send("internal server error " , error.message)
}
}
module.exports = {
    userController
  };