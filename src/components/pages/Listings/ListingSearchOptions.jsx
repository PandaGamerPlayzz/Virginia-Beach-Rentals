import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Styles from './ListingSearchOptions.module.css';

const ListingSearchOptions = () => {
    let [searchParams] = useSearchParams();

    const now = new Date();
    const today = `${now.getFullYear()}-${String(2, now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    let [checkInDate, setCheckInDate] = useState(searchParams.has("checkin") ? searchParams.get("checkin") : null);
    let [checkOutDate, setCheckOutDate] = useState(searchParams.has("checkout") ? searchParams.get("checkout") : null);
    let [numGuests, setNumGuests] = useState(searchParams.has("guests") ? searchParams.get("guests") : null);
    let [maxPrice, setMaxPrice] = useState(searchParams.has("maxprice") ? searchParams.get("maxprice") : null);
    let [savedOnly, setSavedOnly] = useState(searchParams.has("saved") ? searchParams.get("saved") : false)

    return (
        <div className={Styles["listing-search-options"]}>
            <div className={Styles["listing-search-options-wrapper"]}>
                <form className={Styles["listing-search-options-form"]} action="/listings/">
                    <div className={Styles["check-in-check-out"]}>
                        <div className={Styles["check-in-date"]}>
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
                        <div className={Styles["check-out-date"]}>
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
                    <div className={Styles["num-guests"]}>
                        <h2>Guests</h2>
                        <input
                            value={numGuests}
                            onChange={e => setNumGuests(e.target.value)}
                            placeholder="0"
                            type="number"
                            name="guests"
                        />
                    </div>
                    <div className={Styles["max-price"]}>
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
                    <div className={Styles["saved-only"]}>
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
    );
}

export default ListingSearchOptions;