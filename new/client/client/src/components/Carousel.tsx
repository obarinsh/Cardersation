import '../css/carousel.css'
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Deck {
    id: number;
    name: string;
    description: string;
}

const decks: Deck[] = [
    { id: 1, name: 'Love & Relationships', description: 'Fun, flirty, and thoughtful questions to spark connection.' },
    { id: 2, name: 'Family Time', description: 'Heartwarming questions to connect across generations.' },
    { id: 3, name: 'Unhinged Friends', description: 'Chaotic and hilarious questions for unforgettable nights.' },
    { id: 4, name: 'Self Reflection', description: 'Meaningful prompts for moments of personal insight.' },
    { id: 5, name: 'Real Talk: Teens & Parents', description: 'Surprising conversations to bridge generations.' },
    { id: 6, name: 'Marriage & Partnership', description: 'Deepen your bond with thoughtful questions for couples.' },
    { id: 7, name: 'First Date', description: 'Break the ice and get to know each other better.' },
];

const Carousel = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/categories');
    };

    return (
        <div className="carousel-wrapper">
            <Swiper
                centeredSlides={true}
                modules={[Navigation, Autoplay]}
                navigation
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                spaceBetween={20}
                breakpoints={{
                    320: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2.2 },
                    768: { slidesPerView: 2.5 },
                    1024: { slidesPerView: 3.5 },
                    1280: { slidesPerView: 4 }
                }}
            >
                {decks.map((deck) => (
                    <SwiperSlide key={deck.id}>
                        <div 
                            className={`carousel-item id-${deck.id}`}
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                        >
                            <h3>{deck.name}</h3>
                            <p>{deck.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel
