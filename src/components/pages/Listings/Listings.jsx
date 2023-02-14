import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getAllListings } from '../Listing/Listing.jsx';

import Listing from '../Listing/Listing.jsx';
import ListingEmbed from './ListingEmbed.jsx';

import Styles from './Listings.module.css';

const Listings = () => {
    let [searchParams] = useSearchParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        getAllListings()
        .then((allListings) => {
            setData(allListings);
        });
    });

    return (
        <>
            <Listing show={searchParams.get("sl") === "true" ? true : false} />
            <section id="section-listings" className={Styles["section-listings"]}>
                <div className="controls-wrapper">

                </div>
                <div className={Styles["grid-wrapper"]}>
                    {data.map((listing) => (
                        <ListingEmbed listing={listing} />
                    ))}
                </div>
                <div className={Styles["out-of-listings"]}>
                    <h1 className={Styles["label-sorry"]}>Sorry,</h1>
                    <h1 className={Styles["label-out-of-listings"]}>but it appears we have no more listings to display.</h1>
                </div>
            </section>  
        </>        
    );
}

export default Listings;