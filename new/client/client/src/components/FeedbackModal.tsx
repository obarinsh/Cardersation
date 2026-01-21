import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../css/feedback.css'

interface FeedbackModalProps {
    isOpen: boolean
    onClose: () => void
    categoryId: string
    deckName: string
    userEmail?: string
}

const FeedbackModal = ({ isOpen, onClose, categoryId, deckName, userEmail }: FeedbackModalProps) => {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async () => {
        if (rating === 0) return

        setIsSubmitting(true)
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    categoryId,
                    rating,
                    comment: comment.trim() || null,
                    userEmail: userEmail || null
                })
            })

            if (response.ok) {
                setSubmitted(true)
                setTimeout(() => {
                    onClose()
                }, 2000)
            }
        } catch (error) {
            console.error('Error submitting feedback:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSkip = () => {
        onClose()
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div 
                className="feedback-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleSkip}
            >
                <motion.div 
                    className="feedback-modal"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {submitted ? (
                        <div className="feedback-success">
                            <span className="success-icon">✓</span>
                            <h3>Thank you for your feedback!</h3>
                            <p>Your review helps us improve.</p>
                        </div>
                    ) : (
                        <>
                            <h3>How was your experience?</h3>
                            <p className="deck-name">{deckName}</p>
                            
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>

                            <textarea
                                className="feedback-comment"
                                placeholder="Share your thoughts (optional)"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={3}
                            />

                            <div className="feedback-actions">
                                <button 
                                    className="skip-button"
                                    onClick={handleSkip}
                                >
                                    Skip
                                </button>
                                <button 
                                    className="submit-button"
                                    onClick={handleSubmit}
                                    disabled={rating === 0 || isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default FeedbackModal
