import express from 'express'
import { submitFeedback, getFeedbackByCategory } from '../controllers/feedbackController.js'

const router = express.Router()

// POST /api/feedback - submit feedback
router.post('/', submitFeedback)

// GET /api/feedback/:categoryId - get feedback for a category
router.get('/:categoryId', getFeedbackByCategory)

export default router
