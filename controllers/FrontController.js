const UserModel = require('../models/User')
const TeacherModel = require('../models/Teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const CourseModel = require('../models/Course');
const CourseController = require('./CourseController');
const { name } = require('ejs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dzhrxlbh5',
    api_key: '385567545683821',
    api_secret: 'I9X3Bd3-_KAwU9NHwTMO32RL8eI'
});
class FrontController {

    static dashboard = async (req, res) => {
        try {
            // console.log(req.data1)
            const { name, image, id } = req.data1
            const btech = await CourseModel.findOne({userId: id, course:'btech'})
            const bca = await CourseModel.findOne({ userId: id, course: 'bca' })
            const mca = await CourseModel.findOne({ userId: id, course: 'mca' })
            console.log(btech)
            res.render('dashboard', { msg: req.flash(), n: name, img: image, b:btech, bca:bca, mca:mca })
        } catch (error) {
            console.log(error)
        }
    }
    static about = (req, res) => {
        try {
            const { name, image } = req.data1
            res.render('about', { n: name, img: image })
        } catch (error) {
            console.log(error)
        }
    }
    static registeration = async (req, res) => {
        try {
            res.render('registeration', { msg: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }
    static contact = (req, res) => {
        try {
            const { name, image } = req.data1
            res.render('contact', { n: name, img: image })
        } catch (error) {
            console.log(error)
        }
    }
    static login = async (req, res) => {
        try {
            res.render('login', { msg: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }

    //user insert
    static userInsert = async (req, res) => {
        try {
            //console.log(req.files.image)
            const file = req.files.image
            //UPLOAD FOLDER TO IMAGE CLOUDINARY
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileImage'
            })
            //console.log(imageUpload)
            //console.log(req.body)
            const { n, e, p, cp } = req.body
            const user = await UserModel.findOne({ email: e })
            //console.log(user)
            if (user) {
                req.flash('error', 'Email Already Exits')
                res.redirect('/registeration')
            } else {
                if (n && e && p && cp) {
                    if (p && cp) {
                        const hashpassword = await bcrypt.hash(p, 10)
                        const result = new UserModel({
                            name: n,
                            email: e,
                            password: hashpassword,
                            image: {
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url,
                            },
                        })
                        await result.save()
                        req.flash('success', 'Registeration Successfully, Please Login')
                        res.redirect('/')  //redirect to login page
                    } else {
                        req.flash('error', 'Password and confirm Password does not match')
                        res.redirect('/registeration')
                    }
                } else {
                    req.flash('error', 'All field are Required')
                    res.redirect('/registeration')
                }
            }



        } catch (error) {
            console.log(error)
        }
    }

    // User login Method 
    static varifyLogin = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                // console.log(user)
                if (user != null) {
                    const isMatched = await bcrypt.compare(password, user.password)
                    // console.log(isMatched)
                    if (isMatched) {
                        if (user.role == 'admin') {
                            const token = jwt.sign({ ID: user.id }, 'Manorama@12345678');
                            //console.log(token);
                            res.cookie('token', token)
                            res.redirect('/admin/getAllData')
                        }
                        if (user.role == 'student') {
                            const token = jwt.sign({ ID: user.id }, 'Manorama@12345678');
                            //console.log(token);
                            res.cookie('token', token)
                            res.redirect('/dashboard')
                        }
                    } else {
                        req.flash('error', 'Email & Password does not Match, Try Agian')
                        res.redirect('/')
                    }
                } else {
                    req.flash('error', 'You are not Registered User, Please Register')
                    res.redirect('/')
                }
            } else {
                req.flash('error', 'All field are Required')
                res.redirect('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    //logout Method
    static logOut = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/')
        } catch (error) {
            console.log(error);
        }
    }


    //profile open method
    static profile = async (req, res) => {
        try {
            const { name, image, email, phone, } = req.data1

            res.render('profile', { n: name, img: image, e: email, p: phone, msg: req.flash('error'), msg1: req.flash('success') })
        } catch (error) {
            console.log(error);
        }
    }
    //profile Change Password
    static updatePassword = async (req, res) => {
        try {
            //console.log(req.body)
            const { currentpass, npass, cpass } = req.body
            const { id } = req.data1
            if (currentpass && npass && cpass) {
                const user = await UserModel.findById(id)
                const isMatched = await bcrypt.compare(currentpass, user.password)
                console.log(isMatched)
                if (!isMatched) {
                    req.flash('error', 'Current password is incorrect ')
                    res.redirect('/profile')
                } else {
                    if (npass != cpass) {
                        req.flash('error', 'Password does not match')
                        res.redirect('/profile')
                    } else {
                        const newHashPassword = await bcrypt.hash(npass, 10)
                        await UserModel.findByIdAndUpdate(id, {
                            password: newHashPassword
                        })
                        req.flash('success', 'Password Updated successfully ')
                        res.redirect('/')
                    }
                }
            } else {
                req.flash('error', 'ALL fields are required ')
                res.redirect('/profile')
            }
        } catch (error) {
            console.log(error)
        }
    }
    //method update profile
    static updateProfile = async (req, res) => {
        try {
            const { id } = req.data1
            const { name, email, phone, image } = req.body

            // console.log(req.files.image)
            if (req.files) {
                const user = await UserModel.findById(id)
                const imageID = user.image.public_id
                //console.log(imageID) 

                //deleting image from cloudinary
                await cloudinary.uploader.destroy(imageID)
                //new image update
                const file = req.files.image
                const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'profileImage'
                })
                var data = {
                    name: name,
                    email: email,
                    phone: phone,
                    image: {
                        public_id: imageUpload.public_id,
                        url: imageUpload.secure_url,
                    }
                }
            } else {
                var data = {
                    name: name,
                    email: email,
                    phone: phone,
                }
            }
            await UserModel.findByIdAndUpdate(id, data)
            req.flash('success', "Update Profile successfully")
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }


}
module.exports = FrontController