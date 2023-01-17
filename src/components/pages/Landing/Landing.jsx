import { useSearchParams } from 'react-router-dom';

import Listing from "../Listing/Listing.jsx";

// import Styles from './Landing.module.css';

const Landing = () => {
    let [searchParams] = useSearchParams();

    return (
        <>
            <Listing show={searchParams.get("sl") === "true" ? true : false} />
            <section id="section-landing">
                
            </section>
        </>
    );
}

export default Landing;