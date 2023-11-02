const dotenv= require('dotenv')
dotenv.config()
const express = require('express');
const routers = require('./routes/userRouter')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const cookiesParser = require('cookie-parser')

app.use(bodyParser.json());
// app.use(bodyParser.json,{urlencoded:true});
app.use(cors())
app.use(cookiesParser())

const port = process.env.PORT||3000

app.use('/api',routers)

// app.get('/', (req, res) => {
//     res.send({message:'Hello, world!'});
// })



app.listen(port,function () {
    console.log('listening on port'+" "+port);
})