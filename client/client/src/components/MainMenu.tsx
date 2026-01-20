import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { selectedCategory } from '../features/categSlice'
import { useDispatch } from 'react-redux'
import NavBar from './NavBar'

const MainMenu = ({ user, isAuthenticated, onLogout }: { user: any, isAuthenticated: boolean, onLogout: () => void }) => {
    const [decks, setDecks] = useState<any[]>([])
    const [filter, setFilter] = useState('all')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categories = [
        { key: 'all', label: 'All' },
        { key: 'Family & Home', label: 'Family' },
        { key: 'Marriage & Partnership', label: 'Marriage' },
        { key: 'Love & Relationships', label: 'Love' },
        { key: 'Friends and Fun', label: 'Friends' },
        { key: 'Self Reflection', label: 'Self' },
    ]

    const filteredDecks = filter === 'all'
        ? decks
        : decks.filter(deck => deck.topic === filter)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories', {
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    setDecks(data)
                } else {
                    console.error('Failed to fetch categories')
                }
            } catch (error) {
                console.error('Network error', error)
            }
        }
        fetchCategories()
    }, [])

    const handleSelect = (deck: any) => {
        if (!isAuthenticated) {
            navigate('/signin')
            return
        }
        dispatch(selectedCategory(deck))
        navigate(`/game/${deck.id}/${deck.name}`)
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <div className='filter-header'>
                <h1>Choose your deck</h1>
                <div className="filter-menu">
                    {categories.map(cat => (
                        <button 
                            className={`filter-button ${filter === cat.key ? 'active' : ''}`}
                            key={cat.key} 
                            onClick={() => setFilter(cat.key)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>
            <motion.div 
                className="deck-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                {filteredDecks.map((deck, index) => (
                    <motion.div 
                        className={`deck-cover deck-${deck.id}`}
                        key={deck.id}
                        onClick={() => handleSelect(deck)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                        <div className="card-inner">
                            <div className={`card-front deck-${deck.id}`}>
                                {deck.name}
                            </div>
                            <div className="card-back">
                                <p>{deck.description || 'Tap to begin'}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default MainMenu
