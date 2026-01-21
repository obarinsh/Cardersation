import dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../db/db.js'
const saltRounds = 10

export const signIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' })
    }
    if (!email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email format' })
    }
    try {
        const normalizedEmail = email.toLowerCase()

        const results = await pool.query(
            'SELECT*FROM Users WHERE email = $1',
            [normalizedEmail]
        )
        const user = results.rows[0]
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' })
        }
        const isMatch = await bcrypt.compare(password, user.password_hash)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' })
        }
        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.REFRESH_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            accessToken,
            user: { id: user.id, username: user.username, email: user.email }
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ message: 'Login failed.' })
    }
}


export const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    if (username.trim().length < 3) {
        return res.status(400).json({ message: 'Username too short' })
    }
    if (!email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email' })
    }
    try {
        const normalizedEmail = email.toLowerCase()
        const exists = await pool.query(
            'SELECT id FROM Users WHERE email = $1 OR username = $2',
            [normalizedEmail, username]
        )
        if (exists.rows.length > 0) {
            return res.status(409).json({ error: 'User already exists' })
        }

        const password_hash = await bcrypt.hash(password, saltRounds)
        const result = await pool.query(
            'INSERT INTO Users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [username, normalizedEmail, password_hash]
        )
        const { password_hash: _, ...userWithoutPassword } = result.rows[0]
        res.status(201).json({
            message: 'User registered successfully',
            user: userWithoutPassword,
        })
    }
    catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({ message: 'Registration failed.' })
    }
}

export const logOut = async (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })
    res.json({ message: "Logged out successfully" })

}

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({ message: 'Missing refresh token' })
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
        if (err) {
            console.error('Refresh token error:', err)
            return res.status(403).json({ message: 'Invalid refresh token' })
        }

        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        )

        res.json({ accessToken: newAccessToken })
    })
}