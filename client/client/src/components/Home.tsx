import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import NavBar from './NavBar.tsx'

const Home = ({ user, isAuthenticated, onLogout }: { user: any, isAuthenticated: boolean, onLogout: () => void }) => {
    return (
        <div style={{ minHeight: '100vh' }}>
            <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <main>
                <motion.div 
                    className="instruction-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="info-box">
                        <h1 style={{ 
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                            marginBottom: '1.5rem',
                            fontWeight: 400,
                            letterSpacing: '0.02em'
                        }}>
                            A space for real conversations
                        </h1>
                        <p className='home-text' style={{ marginBottom: '2.5rem' }}>
                            Put down your screens. Look each other in the eye. 
                            Choose a deck, read a question out loud, and let the conversation unfold.
                        </p>
                        <Link 
                            to="/categories" 
                            style={{
                                display: 'inline-block',
                                padding: '1rem 2.5rem',
                                background: 'var(--text-primary, #2C2C2C)',
                                color: 'var(--background, #F8F8F3)',
                                textDecoration: 'none',
                                borderRadius: '3rem',
                                fontFamily: 'var(--font-body)',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                border: 'none',
                            }}
                        >
                            Choose a Deck
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    style={{ 
                        maxWidth: '700px', 
                        margin: '4rem auto', 
                        padding: '0 2rem',
                        textAlign: 'center' 
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <p style={{ 
                        fontSize: '0.9rem', 
                        color: 'var(--text-muted, #68635D)',
                        lineHeight: 1.8 
                    }}>
                        For couples seeking deeper connection. For families wanting to share stories. 
                        For friends ready for real talk. For moments of self-reflection.
                    </p>
                </motion.div>
            </main>
        </div>
    )
}

export default Home
