import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import NavBar from './NavBar'
import Footer from './Footer'
import FeedbackModal from './FeedbackModal'
import '../css/gamemenu.css'

const Game = ({ user, isAuthenticated, onLogout }: { user: any, isAuthenticated: boolean, onLogout: () => void }) => {
    const { categoryId, name } = useParams<{ categoryId: string, name: string }>()
    const [questions, setQuestions] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [showFeedback, setShowFeedback] = useState(false)
    const [reachedEnd, setReachedEnd] = useState(false)
    const [direction, setDirection] = useState(0)
    const navigate = useNavigate()

    const deckName = name ? decodeURIComponent(name) : ''

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
        if (currentIndex === questions.length - 1) {
            setReachedEnd(true)
            setShowFeedback(true)
        } else {
            setDirection(1)
            setCurrentIndex((prevIndex) => prevIndex + 1)
        }
    }

    const handlePrev = () => {
        if (currentIndex === 0 && reachedEnd) {
            setDirection(-1)
            setCurrentIndex(questions.length - 1)
        } else if (currentIndex > 0) {
            setDirection(-1)
            setCurrentIndex((prevIndex) => prevIndex - 1)
        }
    }

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50
        
        if (info.offset.x < -swipeThreshold) {
            // Swiped left - go next
            handleNext()
        } else if (info.offset.x > swipeThreshold) {
            // Swiped right - go prev
            handlePrev()
        }
    }

    const handleCardClick = () => {
        handleNext()
    }

    const handleFeedbackClose = () => {
        setShowFeedback(false)
        navigate('/categories')
    }

    const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
    const canGoPrev = currentIndex > 0 || reachedEnd

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    }

    if (isLoading) {
        return (
            <div className="game-page">
                <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
                <div className="page-container">
                    <div className="loading">Loading...</div>
                </div>
                <Footer />
            </div>
        )
    }

    if (error) {
        return (
            <div className="game-page">
                <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
                <div className="page-container">
                    <div className="error">Something went wrong. Please try again.</div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="game-page">
            <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <div className="page-container">
                <button className="back-button" onClick={() => navigate('/categories')}>
                    ← Back to Decks
                </button>
                <div className="card-container">
                    <h2 className="deck-title">{deckName}</h2>
                    {questions.length > 0 ? (
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="card"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                onClick={handleCardClick}
                                whileDrag={{ scale: 1.02 }}
                            >
                                <p>{questions[currentIndex].text}</p>
                                <div className="progress-bar" style={{ width: `${progress}%` }} />
                                <div className="controls">
                                    <div className="arrow-row">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
                                            className={`arrow ${!canGoPrev ? 'disabled' : ''}`}
                                            disabled={!canGoPrev}
                                        >←</button>
                                        <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="arrow">→</button>
                                    </div>
                                    <div className="count-cards">{currentIndex + 1} of {questions.length}</div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div className="no-questions">No questions available</div>
                    )}
                </div>
            </div>
            <Footer />
            
            <FeedbackModal 
                isOpen={showFeedback}
                onClose={handleFeedbackClose}
                categoryId={categoryId || ''}
                deckName={deckName}
                userEmail={user?.email}
            />
        </div>
    )
}

export default Game
