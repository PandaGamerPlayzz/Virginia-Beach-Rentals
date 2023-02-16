import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Styles from './ListingSearchOptions.module.css';

const ListingSearchOptions = (props) => {
    let [searchParams] = useSearchParams();

    let [checkInDate, setCheckInDate] = useState(searchParams.has("checkin") ? searchParams.get("checkin") : null);
    let [checkOutDate, setCheckOutDate] = useState(searchParams.has("checkout") ? searchParams.get("checkout") : null);
    
    return (
        <div className={Styles["listing-search-options"]}>
            <div className={Styles["listing-search-options-wrapper"]}>
                <form className={Styles["listing-search-options-form"]} action="/book/">
                    <div className={Styles["check-in-check-out"]}>
                        <div className={Styles["check-in-date"]}>
                            <h2>Check-In</h2>
                            <input
                                value={checkInDate}
                                onChange={e => setCheckInDate(e.target.value)}
                                placeholder="Check In"
                                type="date"
                                name="checkin"
                                required
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
                                required
                            />
                        </div>
                        <input
                            style={{"display": "none"}}
                            value={props.listingId}
                            type="number"
                            name="id"
                        />
                    </div>
                    <button type="submit">Book Listing</button>
                </form>
            </div>
        </div>
    );
}

export default ListingSearchOptions;