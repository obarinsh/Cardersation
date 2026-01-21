import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { selectedCategory } from '../features/categSlice'
import { useDispatch } from 'react-redux'
import NavBar from './NavBar'
import Footer from './Footer'

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

    const deckImages: { [key: number]: string } = {
        1: '/src/img/firstdate3.jpg',
        2: '/src/img/fam.jpg',
        3: '/src/img/youtube1.jpg',
        4: '/src/img/pregnancy.jpg',
        5: '/src/img/mom1.jpg',
        6: '/src/img/wedding.jpg',
        7: '/src/img/fun.jpg',
        8: '/src/img/children.jpg',
        9: '/src/img/journaling.jpg',
        10: '/src/img/firstDate31.jpg',
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
                            <div 
                                className="deck-stack-card back-1"
                                style={{ backgroundImage: `url(${deckImages[deck.id] || deckImages[1]})` }}
                            />
                            <div 
                                className="deck-stack-card back-2"
                                style={{ backgroundImage: `url(${deckImages[deck.id] || deckImages[1]})` }}
                            />
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
            </main>
            <Footer />
        </div>
    )
}

export default MainMenu
