import express from 'express'
import { registerUser, signIn, logOut, refreshAccessToken } from '../controllers/usersController.js'

const router = express.Router()
router.post('/refresh', refreshAccessToken)
router.post('/signup', registerUser)
router.post('/signin', signIn)
router.post('/logout', logOut)


export default router