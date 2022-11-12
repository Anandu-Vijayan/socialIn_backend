import express from "express";
import { deleteUser, followUser, getUser, UnFollowUser, updateUser,getAllUsers, BlockUser, unBlockeUser } from "../Controllers/UserController.js";



const router = express.Router();


router.get('/:id',getUser)
router.get('/:id',getAllUsers)
router.delete('/:id',deleteUser)
router.patch('/blockUser',BlockUser)
router.patch('/unBlockUser',unBlockeUser)
export default router;

