import pool from '../db/db.js'

export const getAllCateg = async (req, res) => {
    console.log('Starting getAllCateg function')
    let client;
    try {
        console.log('Attempting to get client from pool')
        client = await pool.connect()
        console.log('Successfully got client from pool')

        console.log('Executing SELECT query for categories')
        const results = await client.query('SELECT * FROM categories')
        console.log(`Successfully retrieved ${results.rows.length} categories`)

        res.json(results.rows)
    }
    catch (error) {
        console.error('Error in getAllCateg:', {
            message: error.message,
            code: error.code,
            detail: error.detail,
            stack: error.stack
        })
        res.status(500).json({
            message: 'Categories are not available',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    } finally {
        if (client) {
            console.log('Releasing client back to pool')
            client.release()
        }
    }
}


export const getCategById = async (req, res) => {
    const { id } = req.params

    // Validate that id is a number
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ message: 'Invalid category ID format' })
    }

    try {
        const results = await pool.query('SELECT * FROM categories WHERE id=$1', [id])
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Category is not found' })
        }
        res.json(results.rows[0])
    }
    catch (error) {
        console.error('Problem fetching category:', error)
        res.status(500).json({ message: 'Category is not available' })
    }
}
