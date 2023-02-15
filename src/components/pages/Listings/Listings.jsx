import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';

import { getAllListings, filterListings, sortListings } from '../Listing/Listing.jsx';

import Listing from '../Listing/Listing.jsx';
import ListingSearchOptions from './ListingSearchOptions.jsx';
import ListingEmbed from './ListingEmbed.jsx';

import Styles from './Listings.module.css';

const Listings = () => {
    let [searchParams] = useSearchParams();

    const [cookies] = useCookies();

    const [data, setData] = useState([]);

    useEffect(() => {
        getAllListings()
        .then((allListings) => {
            let filteredListings = filterListings(cookies, allListings, {
                saved: searchParams.has("saved") && searchParams.get("saved") !== "" ? Boolean(searchParams.get("saved")) : false,
                guests: searchParams.has("guests") && searchParams.get("guests") !== "" ? Number(searchParams.get("guests")) : false,
                maxprice: searchParams.has("maxprice") && searchParams.get("maxprice") !== "" ? Number(searchParams.get("maxprice")) : false
            });

            let sortedListings = sortListings(filteredListings, "price", 0);

            setData(sortedListings);
        });
    });

    return (
        <>
            <Listing show={searchParams.get("sl") === "true" ? true : false} />
            <section id="section-listing-search-options">
                <ListingSearchOptions />
            </section>
            <section id="section-found-listings" className={Styles["section-found-listings"]}>
                <h1>{
                    data.length > 0 ? `We found ${data.length} ${data.length === 1 ? "listing" : "listings"} that ${data.length === 1 ? "is" : "are"} perfect for you`
                    : `Sorry, but we couldn't find any listings that are fit for you`
                }</h1>
            </section>
            <section id="section-listings" className={Styles["section-listings"]}>
                <div className="controls-wrapper">

                </div>
                <div className={Styles["grid-wrapper"]}>
                    {data.map((listing) => (
                        <ListingEmbed listing={listing} />
                    ))}
                </div>
                <div className={Styles["out-of-listings"]} style={{"display": "none"}}>
                    <h1 className={Styles["label-sorry"]}>Sorry,</h1>
                    <h1 className={Styles["label-out-of-listings"]}>but it appears we have no more listings to display.</h1>
                </div>
            </section>  
        </>        
    );
}

export default Listings;