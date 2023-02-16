import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';

import { getAllListings, filterListings, sortListings } from '../Listing/Listing.jsx';

import Listing from '../Listing/Listing.jsx';
import ListingEmbed from './ListingEmbed.jsx';

import Styles from './Listings.module.css';
import ListingSearchOptionsStyles from './ListingSearchOptions.module.css';

const Listings = () => {
    let [searchParams] = useSearchParams();

    const now = new Date();
    const today = `${now.getFullYear()}-${String(2, now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const [cookies] = useCookies();

    const [data, setData] = useState([]);

    let [checkInDate, setCheckInDate] = useState(searchParams.has("checkin") ? searchParams.get("checkin") : null);
    let [checkOutDate, setCheckOutDate] = useState(searchParams.has("checkout") ? searchParams.get("checkout") : null);
    let [numGuests, setNumGuests] = useState(searchParams.has("guests") ? searchParams.get("guests") : null);
    let [maxPrice, setMaxPrice] = useState(searchParams.has("maxprice") ? searchParams.get("maxprice") : null);
    let [savedOnly, setSavedOnly] = useState(searchParams.has("saved") ? searchParams.get("saved") : false);

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
                <div className={ListingSearchOptionsStyles["listing-search-options"]}>
                    <div className={ListingSearchOptionsStyles["listing-search-options-wrapper"]}>
                        <form className={ListingSearchOptionsStyles["listing-search-options-form"]} action="/listings/">
                            <div className={ListingSearchOptionsStyles["check-in-check-out"]}>
                                <div className={ListingSearchOptionsStyles["check-in-date"]}>
                                    <h2>Check-In</h2>
                                    <input
                                        value={checkInDate}
                                        onChange={e => setCheckInDate(e.target.value)}
                                        placeholder="Check In"
                                        type="date"
                                        name="checkin"
                                    />
                                </div>
                                <span>→</span>
                                <div className={ListingSearchOptionsStyles["check-out-date"]}>
                                    <h2>Check-Out</h2>
                                    <input
                                        value={checkOutDate}
                                        onChange={e => setCheckOutDate(e.target.value)}
                                        placeholder="Check Out"
                                        type="date"
                                        name="checkout"
                                    />
                                </div>
                            </div>
                            <div className={ListingSearchOptionsStyles["num-guests"]}>
                                <h2>Guests</h2>
                                <input
                                    value={numGuests}
                                    onChange={e => setNumGuests(e.target.value)}
                                    placeholder="0"
                                    type="number"
                                    name="guests"
                                />
                            </div>
                            <div className={ListingSearchOptionsStyles["max-price"]}>
                                <h2>Max Price</h2>
                                <span>$</span>
                                <input
                                    value={maxPrice}
                                    onChange={e => setMaxPrice(e.target.value)}
                                    placeholder=""
                                    type="number"
                                    name="maxprice"
                                />
                            </div>
                            <div className={ListingSearchOptionsStyles["saved-only"]}>
                                <h2>Saved Only</h2>
                                <input
                                    checked={savedOnly}
                                    onChange={e => {
                                        setSavedOnly(e.target.checked);
                                    }}
                                    type="checkbox"
                                    name="saved"
                                />
                            </div>
                            <button type="submit">Find</button>
                        </form>
                    </div>
                </div>
            </section>
            <section id="section-found-listings" className={Styles["section-found-listings"]}>
                <h1>{
                    data.length > 0 ? `We found ${data.length} ${data.length === 1 ? "listing" : "listings"} that ${data.length === 1 ? "is" : "are"} perfect for you`
                    : `Sorry, but we couldn't find any listings that are fit for you`
                }</h1>
            </section>
            <section id="section-listings" className={Styles["section-listings"]}>
                <div className={Styles["grid-wrapper"]}>
                    {data.map((listing) => (
                        <ListingEmbed listing={listing} checkInDate={checkInDate} checkOutDate={checkOutDate} />
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