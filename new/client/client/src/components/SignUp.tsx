import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import '../css/signup.css'
import React from 'react'

const SignUp = ({ user, isAuthenticated, onLogout }: { user: any, isAuthenticated: boolean, onLogout: () => void }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrorMessage('')
        setSuccessMessage('')
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, email, password }),
            })
            const data = await response.json()
            if (response.ok) {
                setSuccessMessage('Account created! Redirecting...')
                setTimeout(() => navigate('/signin'), 1500)
            } else {
                setErrorMessage(`${data.error || 'Something went wrong'}`)
            }
        } catch (error) {
            setErrorMessage('Connection error. Please try again.')
        }
        setIsSubmitting(false)
    }

    return (
        <div className="signup-page">
            <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <div className="form-wrapper">
                <form className="signup-form" onSubmit={handleSignUp}>
                    <h2>Create your space</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Your name"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Account'}
                    </button>
                    {successMessage && <p style={{ color: 'var(--accent, #7A8B6E)' }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: '#9B4D4D' }}>{errorMessage}</p>}
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp
