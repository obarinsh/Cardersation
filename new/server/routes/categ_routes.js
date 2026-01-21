import express from 'express'
import { getCategById, getAllCateg } from '../controllers/categController.js'

const router = express.Router()

router.get('/', getAllCateg)
router.get('/:id', getCategById)


export default router