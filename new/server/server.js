import express from 'express'
import cookieParser from 'cookie-parser'
import user_routes from './routes/user_routes.js'
import categ_routes from './routes/categ_routes.js'
import game_routes from './routes/game_routes.js'
import feedback_routes from './routes/feedback_routes.js'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'


dotenv.config()

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))


app.use(express.json())
app.use(cookieParser())

// CORS configuration - only needed for development
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))
}

// Optional: Add request logging for easier debugging
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`)
    next()
})

// ✅ API routes must come BEFORE static and wildcard
app.use('/api/auth', user_routes)
app.use('/api/categories', categ_routes)
app.use('/api/game', game_routes)
app.use('/api/feedback', feedback_routes)

// Only serve static files in development (production frontend is on Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, '../client/client/dist')))
    
    // Catch-all for React client routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/client/dist', 'index.html'))
    })
}

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
