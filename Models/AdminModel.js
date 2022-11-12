import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true

        },
        isAdmin:{
            type:Boolean,
            default:true

        }
    }
)
const AdminModel = mongoose.model("AdminUsers",UserSchema);

export  default AdminModel