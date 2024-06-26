import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
    resetPassword,
    GetSingleInfo
} from '../../controller/Auth/Auth.js'
import { protect } from '../../middleware/user/UserMiddleware.js'
import express from 'express'

const router = express.Router()

router.post('/login', authUser)
router.post('/logout', logoutUser)
router.post('/register', registerUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:id/:token', resetPassword)
router.route('/profile').get(protect, getUserProfile);
router.put('/update', protect, updateUserProfile);
router.get('/getInfo/:id', GetSingleInfo)

export default router;