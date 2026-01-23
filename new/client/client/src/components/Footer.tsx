const Footer = () => {
    return (
        <footer style={{
            width: '100%',
            padding: '0.75rem 1.5rem',
            background: '#F8F8F3',
            marginTop: 'auto',
            borderTop: '1px solid var(--border, #D4D3C6)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            boxSizing: 'border-box',
            flexShrink: 0
        }}>
            <p style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-muted, #68635D)',
                margin: 0
            }}>
                For couples, families, friends, and self-reflection.
            </p>
            <p style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted, #68635D)',
                opacity: 0.6,
                margin: 0
            }}>
                © {new Date().getFullYear()} Cardersation
            </p>
        </footer>
    )
}

export default Footer
