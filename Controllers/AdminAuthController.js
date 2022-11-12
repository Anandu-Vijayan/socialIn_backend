import AdminModel from "../Models/AdminModel.js";
import bcrypt from 'bcrypt'




// Regestring a new Admin
export const resgisterAdmin  = async(req,res)=>{
    const {email,password}=req.body;

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password,salt)

    const newAdmin= new AdminModel({email,password:hashPass})

    try {
        await newAdmin.save()
        res.status(200).json(newAdmin)
    } catch (error) {
        res.status(500).json({message:error.message})

        
    }

}
//login Admin

export const loginAdmin=async(req,res)=>{
    console.log('reached');
    const {email,password}=req.body

    try {
        const user = await AdminModel.findOne({email:email})
        if(user)
        {
            const validity = await bcrypt.compare(password,user.password)

            validity? res.status(200).json(user):res.status(400).json("wrong Password")

        }else{
            res.status(404).json("UserDoes not Exist")
        }
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }

}