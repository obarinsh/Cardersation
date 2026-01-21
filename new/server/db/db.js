import pkg from 'pg'
const { Pool } = pkg
import dotenv from 'dotenv'

dotenv.config()

// Log environment for debugging
console.log('Current NODE_ENV:', process.env.NODE_ENV)
console.log('Database URL exists:', !!process.env.DATABASE_URL)

// Validate environment variables
if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined in environment variables')
    process.exit(1)
}

// Log SSL configuration
const sslConfig = process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
console.log('SSL Configuration:', JSON.stringify(sslConfig))

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: sslConfig,
    // Add connection timeout
    connectionTimeoutMillis: 5000,
    // Add idle timeout
    idleTimeoutMillis: 30000,
    // Add max number of clients
    max: 20
})

// Connection event handlers
pool.on('connect', (client) => {
    console.log('Successfully connected to PostgreSQL database')
    console.log('Client connection details:', {
        processID: client.processID,
        connectionTimeout: client.connectionTimeoutMillis,
        ssl: client.ssl
    })
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    console.error('Error details:', {
        message: err.message,
        code: err.code,
        stack: err.stack,
        client: client ? 'Client exists' : 'No client'
    })
    process.exit(1)
})

// Test the connection
const testConnection = async () => {
    let client;
    try {
        console.log('Attempting to connect to database...')
        client = await pool.connect()
        console.log('Database connection test successful')

        // Test a simple query
        const result = await client.query('SELECT NOW()')
        console.log('Test query successful:', result.rows[0])

    } catch (err) {
        console.error('Database connection test failed:', err.message)
        console.error('Error details:', {
            code: err.code,
            detail: err.detail,
            hint: err.hint,
            position: err.position,
            where: err.where,
            stack: err.stack
        })

        // Don't exit in production, just log the error
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1)
        }
    } finally {
        if (client) {
            client.release()
        }
    }
}

// Run the connection test
testConnection()

export default pool