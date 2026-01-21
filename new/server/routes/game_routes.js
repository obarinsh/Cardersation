import express from 'express'
import { getQuestionsByCategory } from '../controllers/gameController.js'

const router = express.Router()

router.get('/:categoryId', getQuestionsByCategory)


export default router