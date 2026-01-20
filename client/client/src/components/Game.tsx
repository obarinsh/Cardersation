import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NavBar from './NavBar'
import '../css/gamemenu.css'

const Game = ({ user, isAuthenticated, onLogout }: { user: any, isAuthenticated: boolean, onLogout: () => void }) => {
    const { categoryId } = useParams<{ categoryId: string, name: string }>()
    const [questions, setQuestions] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin')
            return
        }
        const fetchQuestions = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(`/api/game/${categoryId}`, {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setQuestions(data)
            } catch (error) {
                console.error('Error fetching category:', error)
                setError(error instanceof Error ? error.message : 'Failed to fetch questions')
            } finally {
                setIsLoading(false)
            }
        }
        fetchQuestions()
    }, [categoryId, isAuthenticated, navigate])

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length)
    }

    const handleCardClick = () => {
        handleNext()
    }

    const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0

    if (isLoading) {
        return (
            <div>
                <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
                <div className="page-container">
                    <div className="loading">Loading...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
                <div className="page-container">
                    <div className="error">Something went wrong. Please try again.</div>
                </div>
            </div>
        )
    }

    const isLastCard = currentIndex === questions.length - 1

    return (
        <>
            <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <div className="page-container">
                <div className="card-container">
                    {questions.length > 0 ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                className="card"
                                onClick={handleCardClick}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <p>
                                    {isLastCard && currentIndex > 0
                                        ? "Thank you for being present."
                                        : questions[currentIndex].text
                                    }
                                </p>
                                <div className="progress-bar" style={{ width: `${progress}%` }} />
                                <div className="controls">
                                    <div className="arrow-row">
                                        <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="arrow">
                                            ←
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="arrow">
                                            →
                                        </button>
                                    </div>
                                    <div className="count-cards">
                                        {currentIndex + 1} of {questions.length}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div className="no-questions">No questions available</div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Game
