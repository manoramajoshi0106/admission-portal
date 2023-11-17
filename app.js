const express = require('express')
const app =express()
const port = 3000
const web = require('./routes/web')
const connectDb = require('./db/connectDb')
let session = require('express-session')
let flash = require('connect-flash');
const fileUpload = require("express-fileupload");
// cookies
const cookieparser = require('cookie-parser')
app.use(cookieparser())
//ejs set html
app.set('view engine', 'ejs')
// for file upload
app.use(fileUpload({useTempFiles: true}));

//connected to mongodb
connectDb()

app.use(session({
  secret: 'secret',
  cookie: {maxAge:60000},
  resave: false,
  saveUninitialized: false,

}));

app.use(flash());
// insert css and img static file
app.use(express.static('public'))


//data get
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// router load
app.use('/',web)







//about
//route localhost:3000 ('/') /Cannot Get /about
//app.get('/',(req,res)=>{
  //  res.send('Home Page')
//})
//app.get('/about',(req,res)=>{
//    res.send('About Page')
//})
//app.get('/team',(req,res)=>{
 //   res.send('team Page')
//})
//app.get('/login',(req,res)=>{
//    res.send('Login Form to manorama')
//})

//server create
app.listen(port, () => {
    console.log(`server start port localhost:${port}`)
  })

