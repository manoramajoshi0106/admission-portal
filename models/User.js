const mongoose =require('mongoose')

//User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role:{
        type:String,
        default:'student'
    }

},{timestamps:true})

const UserModel=mongoose.model('user',UserSchema)

module.exports=UserModel