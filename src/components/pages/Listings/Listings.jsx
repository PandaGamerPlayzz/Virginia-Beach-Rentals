import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getAllListings, getTitleImage } from '../Listing/Listing.jsx';

import Styles from './Listings.module.css';

const Listings = () => {
    let [searchParams] = useSearchParams();

    useEffect(() => {

    });

    return (
        <section id="section-listings" className={Styles["section-listings"]}>

        </section>          
    );
}

export default Listings;