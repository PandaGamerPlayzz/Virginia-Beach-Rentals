import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

import Listing from '../Listing/Listing.jsx';
import ListingSlider from '../Listing/ListingSlider.jsx';
import MailingListForm from './MailingListForm.jsx';

import Styles from './Landing.module.css';
import SearchOptionsStyles from './ListingSearchOptions.module.css';

const Landing = () => {
    let [searchParams] = useSearchParams();

    let [checkInDate, setCheckInDate] = useState("");
    let [checkOutDate, setCheckOutDate] = useState("");
    let [numGuests, setNumGuests] = useState(1);

    return (
        <>
            <Listing show={searchParams.get("sl") === "true" ? true : false} />
            <section id="section-landing">
                <div>
                    <img id={Styles["landing-image1"]} src="https://photos.zillowstatic.com/fp/1be157563ce5c168ea6dd707ef4790f0-cc_ft_1536.webp" alt="" />
                    <h1 id={Styles["landing-image1-quote"]}>"A house is made of bricks and beams. A home is made of hopes and dreams."</h1>
                </div>
                <div id={Styles["landing-wrapper"]}>
                    <div className={SearchOptionsStyles["listing-search-options"]}>
                        <div className={SearchOptionsStyles["listing-search-options-wrapper"]}>
                            <form className={SearchOptionsStyles["listing-search-options-form"]} action="/listings/">
                                <div className={SearchOptionsStyles["check-in-check-out"]}>
                                    <div className={SearchOptionsStyles["check-in-date"]}>
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
                                    <div className={SearchOptionsStyles["check-out-date"]}>
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
                                <div className={SearchOptionsStyles["num-guests"]}>
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
                    <ListingSlider />
                    <MailingListForm />
                </div>
            </section>
        </>
    );
}

export default Landing;