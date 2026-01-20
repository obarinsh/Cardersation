import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store/store'
import React from 'react'
import { useState } from 'react'
import { loginSuccess } from '../features/authSlice'
import { useDispatch } from 'react-redux'
import NavBar from './NavBar'
import '../css/login.css'

const LogIn = ({ user, isAuthenticated, onLogout }: { user: any, isAuthenticated: boolean, onLogout: () => void }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const handleLogIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')
        setSuccessMessage('')
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()
            if (response.ok) {
                dispatch(loginSuccess({
                    user: data.user,
                    accessToken: data.accessToken
                }))
                setSuccessMessage('Welcome back!')
                setTimeout(() => {
                    navigate('/categories')
                }, 1000)
            } else {
                setErrorMessage(data.message || 'Unable to sign in')
            }
        } catch (error) {
            setErrorMessage('Connection error. Please try again.')
        }
        setIsSubmitting(false)
    }

    return (
        <div className="login-page">
            <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <div className="form-wrapper">
                <form className="login-form" onSubmit={handleLogIn}>
                    <h2>Welcome back</h2>
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
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                    {successMessage && <p style={{ color: 'var(--accent, #7A8B6E)' }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: '#9B4D4D' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    )
}

export default LogIn
