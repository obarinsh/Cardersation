import pool from '../db/db.js'

export const submitFeedback = async (req, res) => {
    const { categoryId, rating, comment, userEmail } = req.body

    if (!rating) {
        return res.status(400).json({ message: 'Rating is required' })
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' })
    }

    try {
        const result = await pool.query(
            `INSERT INTO feedback (user_email, message, rating, context, created_at) 
             VALUES ($1, $2, $3, $4, NOW()) 
             RETURNING *`,
            [userEmail || null, comment || null, rating, categoryId || null]
        )
        res.status(201).json({ message: 'Feedback submitted successfully', feedback: result.rows[0] })
    } catch (error) {
        console.error('Error submitting feedback:', error)
        res.status(500).json({ message: 'Failed to submit feedback' })
    }
}

export const getFeedbackByCategory = async (req, res) => {
    const { categoryId } = req.params

    try {
        const result = await pool.query(
            `SELECT * FROM feedback WHERE context = $1 ORDER BY created_at DESC`,
            [categoryId]
        )
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching feedback:', error)
        res.status(500).json({ message: 'Failed to fetch feedback' })
    }
}
