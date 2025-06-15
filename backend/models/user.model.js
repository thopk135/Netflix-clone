import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minLength:6,
    },
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    image:{
        type:String,
        default:""
    },
    searchHistory:{
        type:Array,
        default:[]
    }

});

export const User = mongoose.model('User',userSchema);
export default User;