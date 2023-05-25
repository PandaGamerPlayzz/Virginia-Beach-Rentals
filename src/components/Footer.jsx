import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer">
            <section style={{display: "none"}}>
                <section id="quote">
                    <span>Virginia Beach is fun for the whole family!</span>
                </section>
                <div id="footer-1">
                    <span><a href="/">Home Page</a></span>
                </div>
                <div id="footer-2">
                    <span><a href="/listings/">Listings</a></span>
                </div>
                <div id="footer-3">
                    <span><a href="/attractions/">Attractions</a></span>
                </div>
                <div id="footer-4">
                    <span><a href="/c/pdf/WorksCited.pdf">Works Cited</a></span>                
                </div>
            </section>
        </footer>
    );
}

export default Footer;