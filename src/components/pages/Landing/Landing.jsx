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
    let [numGuests, setNumGuests] = useState("");

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
                            <form className={SearchOptionsStyles["listing-search-options-form"]}>
                                <input
                                    value={checkInDate}
                                    onChange={e => setCheckInDate(e.target.value)}
                                    placeholder="Check In"
                                    name="check-in-date"
                                    id="check-in-date"
                                />
                                <input
                                    value={checkOutDate}
                                    onChange={e => setCheckOutDate(e.target.value)}
                                    placeholder="Check Out"
                                    name="check-out-date"
                                    id="check-out-date"
                                />
                                <input
                                    value={numGuests}
                                    onChange={e => setNumGuests(e.target.value)}
                                    placeholder="Guests"
                                    name="num-guests"
                                    id="num-guests"
                                />
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