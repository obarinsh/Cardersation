import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { selectedCategory } from '../features/categSlice'
import { useDispatch } from 'react-redux'
import NavBar from './NavBar'
import Footer from './Footer'

// Import images for Vite bundling
import firstDate3 from '../img/firstDate3.jpg'
import fam from '../img/fam.jpg'
import youtube1 from '../img/youtube1.jpg'
import pregnancy from '../img/pregnancy.jpg'
import mom1 from '../img/mom1.jpg'
import wedding from '../img/wedding.jpg'
import fun from '../img/fun.jpg'
import children from '../img/children.jpg'
import journaling from '../img/journaling.jpg'
import firstDate31 from '../img/firstDate31.jpg'

const MainMenu = ({ user, isAuthenticated, onLogout }: { user: any, isAuthenticated: boolean, onLogout: () => void }) => {
    const [decks, setDecks] = useState<any[]>([])
    const [filter, setFilter] = useState('all')
    const [isLoading, setIsLoading] = useState(true)
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

    // Helper function to check if deck matches filter
    const deckMatchesFilter = (deck: any, filterKey: string) => {
        const topic = deck.topic
        
        // Check if it's a PostgreSQL array string like {"value1","value2"}
        if (typeof topic === 'string' && topic.startsWith('{') && topic.endsWith('}')) {
            // Parse PostgreSQL array format
            const values = topic.slice(1, -1).split(',').map((s: string) => s.replace(/"/g, '').trim())
            return values.includes(filterKey)
        }
        
        // Check if it's a regular array
        if (Array.isArray(topic)) {
            return topic.includes(filterKey)
        }
        
        // Regular string comparison
        return topic === filterKey
    }

    const filteredDecks = filter === 'all'
        ? decks
        : decks.filter(deck => deckMatchesFilter(deck, filter))

    const handleRandomDeck = () => {
        if (!isAuthenticated) {
            navigate('/signin')
            return
        }
        if (filteredDecks.length === 0) return
        
        const randomIndex = Math.floor(Math.random() * filteredDecks.length)
        const randomDeck = filteredDecks[randomIndex]
        dispatch(selectedCategory(randomDeck))
        navigate(`/game/${randomDeck.id}/${randomDeck.name}`)
    }

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true)
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
            } finally {
                setIsLoading(false)
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

    const deckImages: { [key: number]: string } = {
        1: firstDate3,
        2: fam,
        3: youtube1,
        4: pregnancy,
        5: mom1,
        6: wedding,
        7: fun,
        8: children,
        9: journaling,
        10: firstDate31,
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background-alt, #E8E6E0)' }}>
            <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <main style={{ flex: 1 }}>
                <div className='filter-header'>
                    <div className="filter-title-row">
                        <button className="back-button" onClick={() => navigate('/')}>
                            ← Back
                        </button>
                        <h1>Choose your deck</h1>
                        <button 
                            className="shuffle-button" 
                            onClick={handleRandomDeck} 
                            title="Pick a random deck"
                        >
                            🎲
                        </button>
                    </div>
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
                {isLoading ? (
                    <div className="loading-container">
                        <div className="loading">Loading...</div>
                    </div>
                ) : (
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
                                    <div 
                                        className="card-front"
                                        style={{ backgroundImage: deckImages[deck.id] ? `url(${deckImages[deck.id]})` : undefined }}
                                    >
                                        {deck.name}
                                    </div>
                                    <div className="card-back">
                                        <p>{deck.description || 'Tap to begin'}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </main>
            <Footer />
        </div>
    )
}

export default MainMenu
