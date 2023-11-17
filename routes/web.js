const express =require('express')
const FrontController = require('../controllers/FrontController')
const CourseController = require('../controllers/CourseController')
const checkAuth = require('../middleware/auth')
const AdminController = require('../controllers/Admin/AdminController')
//console.log(express)
const router = express.Router()


//Routing localhost:3000

//FrontControllers
router.get('/dashboard',checkAuth,FrontController.dashboard)
router.get('/about',checkAuth,FrontController.about)
router.get('/registeration',FrontController.registeration)
router.get('/contact',checkAuth,FrontController.contact)
router.get('/',FrontController.login)
//user insert
router.post('/user_insert',FrontController.userInsert)
// Course Controller Registeration data
router.post('/course-insert',checkAuth,CourseController.courseInsert)
router.post('/course-insertt',checkAuth,CourseController.courseInsertt)
router.post('/course-inserttt',checkAuth,CourseController.courseInserttt)

//course Display
router.get('/courseDisplay',checkAuth, CourseController.courseDisplay)
router.get('/courseview/:id',checkAuth, CourseController.courseView)
router.get('/courseEdit/:id',checkAuth, CourseController.courseEdit)
router.post('/course_update/:id',checkAuth, CourseController.courseUpdate)
router.get('/course_delete/:id',checkAuth, CourseController.courseDelete)

//Login
router.post('/varify_login', FrontController.varifyLogin)
router.get('/logout', FrontController.logOut)
//profile open
router.get('/profile',checkAuth,FrontController.profile)
//router.get('/course',checkAuth,FrontController.course)

//profile password change
router.post('/update_password',checkAuth,FrontController.updatePassword)
//update profile
router.post('/update_profile',checkAuth,FrontController.updateProfile)

//course input update profile
//router.post('/course_input',checkAuth,FrontController.courseInput)

//admin Controller
router.get('/admin/getAllData',checkAuth,AdminController.GetAllData)

//update status
router.post('/update_status/:id',checkAuth,AdminController.updateStatus)


module.exports = router









