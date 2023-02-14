import { useState, useEffect } from 'react';

import { getAllListings } from '../Listing/Listing.jsx';

import ListingEmbed from './ListingEmbed.jsx';

import Styles from './ListingSlider.module.css';

const ListingSlider = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllListings()
        .then((allListings) => {
            setData(allListings);
        });
    }, []);

    return (
        <div className={Styles["listing-slider"]}>
            <div className={Styles["listing-slider-wrapper"]}>
                {data.map((listing) => (
                    <ListingEmbed listing={listing} />
                ))}
            </div>
        </div>
    );
}

export default ListingSlider;