import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import NavBar from './NavBar.tsx'
import Carousel from './Carousel.tsx'
import Footer from './Footer.tsx'
import '../css/home.css'
import heroImage from '../img/jakub-klucky-tQvTHTXgWww-unsplash.jpg'

const Home = ({ user, isAuthenticated, onLogout }: { user: any, isAuthenticated: boolean, onLogout: () => void }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <main style={{ flex: 1 }}>
                {/* Hero Section - Two columns */}
                <motion.section 
                    className="hero-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="hero-row">
                        <div className="hero-content">
                            <h1>A space for real conversations</h1>
                            <p>
                                Put down your screens. Look each other in the eye. 
                                Choose a deck, read a question out loud, and let the conversation unfold.
                            </p>
                            <Link to="/categories" className="cta-button">
                                Choose a Deck
                            </Link>
                        </div>
                        <div className="hero-image">
                            <img src={heroImage} alt="Real conversations" />
                        </div>
                    </div>
                </motion.section>

                {/* Carousel Section */}
                <motion.section
                    className="carousel-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2>Explore Our Decks</h2>
                    <Carousel />
                </motion.section>

                {/* Info Grid Section */}
                <motion.section
                    className="info-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="info-grid">
                        <div className="info-item">
                            <h2>How It Works</h2>
                            <p>
                                This isn't just another app — it's an invitation to connect, laugh, and explore meaningful (and sometimes ridiculous!) conversations with the people you care about.
                            </p>
                        </div>
                        <div className="info-item">
                            <h2>Why We Made This</h2>
                            <p>
                                To reduce screen distraction and make real, face-to-face conversations easier.
                            </p>
                        </div>
                        <div className="info-item">
                            <h2>Who It's For</h2>
                            <p>
                                Couples looking for deeper connection, families wanting to share stories, friends ready for fun — this app is for anyone who wants to spend more quality time together.
                            </p>
                        </div>
                        <div className="info-item">
                            <h2>How to Play</h2>
                            <p>
                                Choose a deck. Take turns reading a question out loud. Be the first to share a song, a story, or an answer — or just let the conversation flow naturally.
                            </p>
                        </div>
                    </div>
                </motion.section>
            </main>
            <Footer />
        </div>
    )
}

export default Home
