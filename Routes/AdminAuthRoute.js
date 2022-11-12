import express from 'express'
import { loginAdmin, resgisterAdmin } from '../Controllers/AdminAuthController.js'
import { deleteUser } from '../Controllers/AdminUserController.js'

const router = express.Router()


router.post('/reagister',resgisterAdmin)
router.post('/login',loginAdmin)
router.delete('/deleteUser',deleteUser)





export default router
