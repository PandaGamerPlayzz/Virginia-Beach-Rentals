import { useState } from 'react';

import Styles from './ListingSearchOptions.module.css';

const Landing = () => {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(2, now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    let [checkInDate, setCheckInDate] = useState(today);
    let [checkOutDate, setCheckOutDate] = useState(today);
    let [numGuests, setNumGuests] = useState(1);

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
                    </div>
                    <div className={Styles["num-guests"]}>
                        <h2>Guests</h2>
                        <input
                            value={numGuests}
                            onChange={e => setNumGuests(e.target.value)}
                            placeholder="0"
                            type="number"
                            name="guests"
                            required
                        />
                    </div>
                    <button type="submit">Find</button>
                </form>
            </div>
        </div>
    );
}

export default Landing;