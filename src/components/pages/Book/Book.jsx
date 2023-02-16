import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getListing, getTitleImageSrc } from '../Listing/Listing.jsx';

import Styles from './Book.module.css';

const Book = () => {
    let [searchParams] = useSearchParams();

    let wrapperRef = useRef(null);
    let thankYouRef = useRef(null);

    let [listing, setListing] = useState(null);
    let [checkInDate, setCheckInDate] = useState(searchParams.has("checkin") ? searchParams.get("checkin") : null);
    let [checkOutDate, setCheckOutDate] = useState(searchParams.has("checkout") ? searchParams.get("checkout") : null);

    let numberOfNights = Math.round(Math.abs(new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    
    let [firstName, setFirstName] = useState(null);
    let [lastName, setLastName] = useState(null);
    let [email, setEmail] = useState(null);
    let [phoneNumber, setPhoneNumber] = useState(null);

    let [cardNumber, setCardNumber] = useState(null);
    let [expirationDate, setExpirationDate] = useState(null);
    let [cvv, setCvv] = useState(null);
    let [zip, setZip] = useState(null);
    let [nameOnCard, setNameOnCard] = useState(null);

    useEffect(() => {
        getListing(Number(searchParams.get("id"))).then((listing) => {
            setListing(listing);
        });
    });

    return (
        <section id="section-book" className={Styles["section-book"]}>
            <div ref={wrapperRef} className={Styles["book-wrapper"]}>
                <iframe name="dummyframe" id="dummyframe" style={{"display": "none"}}></iframe>
                <form method="post" target="dummyframe" onSubmit={() => {
                    wrapperRef.current.style.display = "none";
                    thankYouRef.current.style.display = "block";
                }}>
                    <div className={Styles["first-name"]}>
                        <h2>First Name</h2>
                        <input
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            type="text"
                            required
                        />
                    </div>
                    <div className={Styles["last-name"]}>
                        <h2>Last Name</h2>
                        <input
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            type="text"
                            required
                        />
                    </div>
                    <div className={Styles["email"]}>
                        <h2>Email</h2>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="text"
                            required
                        />
                    </div>
                    <div className={Styles["phone-number"]}>
                        <h2>Phone Number</h2>
                        <input
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            type="tel"
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            required
                        />
                    </div>

                    <div className={Styles["card-number"]}>
                        <h2>Card Number</h2>
                        <input
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                            type="number"
                            required
                        />
                    </div>
                    <div className={Styles["expiration-date"]}>
                        <h2>Expiration Date</h2>
                        <input
                            value={expirationDate}
                            onChange={e => setExpirationDate(e.target.value)}
                            type="month"
                            required
                        />
                    </div>
                    <div className={Styles["cvv"]}>
                        <h2>CVV</h2>
                        <input
                            value={cvv}
                            onChange={e => setCvv(e.target.value)}
                            type="number"
                            required
                        />
                    </div>
                    <div className={Styles["zip"]}>
                        <h2>ZIP Code</h2>
                        <input
                            value={zip}
                            onChange={e => setZip(e.target.value)}
                            type="number"
                            required
                        />
                    </div>
                    <div className={Styles["name-on-card"]}>
                        <h2>Name on Card</h2>
                        <input
                            value={nameOnCard}
                            onChange={e => setNameOnCard(e.target.value)}
                            type="text"
                            required
                        />
                    </div>

                    <button type="submit">Confirm Booking</button>
                </form>
                <div className={Styles["price-information-wrapper"]}>
                    {(() => {
                        if(listing === null || listing === undefined) return;

                        return <>
                            <img src={getTitleImageSrc(listing)} alt={""} />
                            <p className={Styles["address"]}>
                                {`${listing.address.street_number} ${listing.address.street_name} ${listing.address.street_type}`}
                                <br/>
                                {`${listing.address.apartment_number !== undefined ? `Apartment ${listing.address.apartment_number}` : ''}`}
                                {(() => {
                                    return listing.address.apartment_number !== undefined ? (<br />) : undefined;
                                })()}
                                {`${listing.address.city}, ${listing.address.state} ${listing.address.zipcode}`}
                            </p>
                            <div className={Styles["check-in-check-out"]}>
                                <div className={Styles["check-in-date"]}>
                                    <h2>Check-In</h2>
                                    <input
                                        value={checkInDate}
                                        onChange={e => setCheckInDate(e.target.value)}
                                        type="date"
                                        readOnly
                                    />
                                </div>
                                <div className={Styles["night-counter"]}>
                                    <span>{numberOfNights}</span> {numberOfNights === 1 ? 'night' : 'nights'}
                                </div>
                                <div className={Styles["check-out-date"]}>
                                    <h2>Check-Out</h2>
                                    <input
                                        value={checkOutDate}
                                        onChange={e => setCheckOutDate(e.target.value)}
                                        type="date"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className={Styles["final-price"]}>
                                <span>${new Intl.NumberFormat().format(listing.info.price_per_night)}</span> per night
                                <br />
                                <span>${new Intl.NumberFormat().format(listing.info.price_per_night * numberOfNights)}</span> for <span>{numberOfNights}</span> {numberOfNights === 1 ? 'night' : 'nights'}
                            </div>
                        </>
                    })()}
                </div>
            </div>
            <div ref={thankYouRef} className={Styles["thank-you"]} style={{"display": "none"}}>
                Thanks for choosing Virginia Beach Rentals
            </div>
        </section>
    );
}

export default Book;