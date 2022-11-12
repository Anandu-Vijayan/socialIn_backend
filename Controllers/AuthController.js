import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import  json  from "body-parser";
import jwt from 'jsonwebtoken'

//Registering a new User
export const registerUser = async (req, res) => {
  

//   const userExists = await UserModel.findOne({username})
//   if (userExists) {
//       res.status(400)
//       throw new Error("user alreadey exists")

//   }
// try {
//     const userExists = await UserModel.findOne({username})
//     if (userExists) {
//              return res.status(400).json({message:"user exist"})
             
//           }
    
// } catch (error) {
//     res.status(500).json({message:error.message})

//     console.log('error',error);
// }

  const salt = await bcrypt.genSalt(10);
  const hasedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hasedPass
  const newUser = new UserModel(req.body)
  const {username} = req.body
  try {
    const userExists = await UserModel.findOne({username})

    if(userExists)
    {
      return res.status(400).json({message:"username is already registered!"})
    }


    const user = await newUser.save();

    const token = jwt.sign({
      username:user.username, id:user._id

    },process.env.JWT_KEY,{expiresIn:'1h'})
    res.status(200).json({user,token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// login User

export const loginUser = async (req,res)=>{
    const {username,password}=req.body

    try {
        const user = await UserModel.findOne({username:username})
        if(user.status){
           if (user)
        {
          const  validity = await bcrypt.compare(password,user.password)  


          // validity? res.status(200).json(user):res.status(400).json("Wrong Password")
          if(!validity)
          {
            res.status(400).json("Wrong Password")
          }else{
            const token = jwt.sign({
              username:user.username,id:user._id
            },process.env.JWT_KEY,{expiresIn:'1h'})
            res.status(200).json({user,token})
          }



        }else{
            res.status(404).json("User does not exits")
        }
        }else{
          res.status(404).json("UserBlocked")
        }
       
    } catch (error) {
        
    }
}
