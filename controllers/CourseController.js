const { name } = require('ejs')
const nodemailer =require('nodemailer')
const CourseModel = require('../models/Course')


class CourseController {

    static courseInsert = async (req, res) => {
        try {
            const {id} = req.data1
            //console.log(req.body)
            const { name, email, phone, city, address, course } = req.body
            const result = new CourseModel({
                name: name,
                email: email,
                phone: phone,
                city: city,
                address: address,
                course: course,
                userId: id
            })
            await result.save()

            this.sendEmail(name,email,course)   //email

            res.redirect('/courseDisplay')  //router to Course Display status
        } catch (error) {
            console.log(error)
        }

    }

    static courseInsertt = async (req, res) => {
        try {
            const {id} = req.data1
            //console.log(req.body)
            const { name, email, phone, city, address, course } = req.body
            const result = new CourseModel({
                name: name,
                email: email,
                phone: phone,
                city: city,
                address: address,
                course: course,
                userId: id
            })
            await result.save()

            this.sendEmail(name,email,course)   //email

            res.redirect('/courseDisplay')  //router to Course Display status
        } catch (error) {
            console.log(error)
        }

    }
    static courseInserttt = async (req, res) => {
        try {
            const {id} = req.data1
            //console.log(req.body)
            const { name, email, phone, city, address, course } = req.body
            const result = new CourseModel({
                name: name,
                email: email,
                phone: phone,
                city: city,
                address: address,
                course: course,
                userId: id
            })
            await result.save()

            this.sendEmail(name,email,course)   //email

            res.redirect('/courseDisplay')  //router to Course Display status
        } catch (error) {
            console.log(error)
        }

    }


    static courseDisplay = async (req, res) => {
        try {
            const data = await CourseModel.find()
            const{id,name,image} = req.data1
            //console.log(data)
            res.render('courseDisplay',{ n:name, d:data, img:image})

        } catch(err) {
            console.log(err)

        }
    }
    static courseView = async (req, res) => {
        try {
           // console.log(req.params.id)

            const data = await CourseModel.findById(req.params.id)
            const{name, image} = req.data1
            //console.log(data)
            res.render('courseView',{ n:name, img:image, d:data})

        } catch(err) {
            console.log(err)

        }
    }
    static courseEdit = async (req, res) => {
        try {
            console.log(req.params.id)

            const data = await CourseModel.findById(req.params.id)
            const{name, image} = req.data1
            //console.log(data)
            res.render('courseEdit',{ n:name, img:image, d:data})

        } catch(err) {
            console.log(err)

        }
    }
    static courseUpdate = async (req, res) => {
        try {
            //console.log(req.params.id)
           // console.log(req.body)
           const { name, email, phone, city, address, course } = req.body
            const data = await CourseModel.findByIdAndUpdate(req.params.id,{
                name: name,
                email: email,
                phone: phone,
                city: city,
                address: address,
                course: course
            })
            res.redirect('/courseDisplay')  //router to Course Display status
            //console.log(data)
            //res.render('courseEdit',{d:data})

        } catch(err) {
            console.log(err)

        }
    }
    static courseDelete = async (req, res) => {
        try {
            await CourseModel.findByIdAndDelete(req.params.id)
            res.redirect('/courseDisplay')  //router to Course Display status router ka path
            //console.log(data)

        } catch(err) {
            console.log(err)

        }
    }
    
    //send email
    static sendEmail = async (name,email,course) => {
       //console.log(name,email,course)
        //connenct with the smtp server
    
        let transporter = await nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
    
          auth: {
            user: "manorma819@gmail.com",
            pass: "rzwpdntbrhabkyou",
          },
});
        let info = await transporter.sendMail({
          from: "test@gmail.com", // sender address
          to: email, // list of receivers
          subject: `Course Registeration Successfully, Please Wait for approval`, // Subject line
          text: "heelo", // plain text body
          html: `<b>${name}</b> Registeration for  <b>${course}</b> successful! `, // html body
        });
};

}
module.exports = CourseController