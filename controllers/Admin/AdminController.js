const CourseModel= require('../../models/Course')
const nodemailer =require('nodemailer')

class AdminController{
    static GetAllData = async(req,res)=>{
        try {
            const{id,name,image}=req.data1
            const data = await CourseModel.find()
            //console.log(data)
            res.render('admin/getAllData',{ n:name, d:data, img:image })
        } 
        catch (error) {
            console.log(error)
        }
    }

    static updateStatus = async(req,res)=>{
        try {
            //console.log(req.body)
            const{comment, name, email, status}=req.body
            await CourseModel.findByIdAndUpdate(req.params.id,{
                comment: comment,
                status: status
            })
            this.sendEmail(name,email,status,comment)
            res.redirect('/admin/getAllData')
        } 
        catch (error) {
            console.log(error)
        }
    }

    static sendEmail = async (name,email,status,comment) => {
        //console.log(name,email,status,comment)
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
           subject: `Course ${status}`, // Subject line
           text: "heelo", // plain text body
           html: `<b>${name}</b> Course  <b>${status}</b> successful! `, // html body
         });
 };
}

module.exports = AdminController