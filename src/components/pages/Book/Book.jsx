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
                <form id="book-form" method="post" target="dummyframe" onSubmit={() => {
                    wrapperRef.current.style.display = "none";
                    thankYouRef.current.style.display = "block";
                }}>
                    <div className={`${Styles["first-name"]} ${Styles["input"]}`}>
                        <h2>First Name *</h2>
                        <input
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            type="text"
                            required
                        />
                    </div>
                    <div className={`${Styles["last-name"]} ${Styles["input"]}`}>
                        <h2>Last Name *</h2>
                        <input
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            type="text"
                            required
                        />
                    </div>
                    <div className={`${Styles["email"]} ${Styles["input"]}`}>
                        <h2>Email *</h2>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="text"
                            required
                        />
                    </div>
                    <div className={`${Styles["phone-number"]} ${Styles["input"]}`}>
                        <h2>Phone Number *</h2>
                        <input
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            type="tel"
                            required
                        />
                    </div>

                    <div className={`${Styles["card-number"]} ${Styles["input"]}`}>
                        <h2>Card Number *</h2>
                        <input
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                            type="number"
                            required
                        />
                    </div>
                    <div className={`${Styles["expiration-date"]} ${Styles["input"]}`}>
                        <h2>Expiration Date *</h2>
                        <input
                            value={expirationDate}
                            onChange={e => setExpirationDate(e.target.value)}
                            type="month"
                            required
                        />
                    </div>
                    <div className={`${Styles["cvv"]} ${Styles["input"]}`}>
                        <h2>CVV *</h2>
                        <input
                            value={cvv}
                            onChange={e => setCvv(e.target.value)}
                            type="number"
                            required
                        />
                    </div>
                    <div className={`${Styles["zip"]} ${Styles["input"]}`}>
                        <h2>ZIP Code *</h2>
                        <input
                            value={zip}
                            onChange={e => setZip(e.target.value)}
                            type="number"
                            required
                        />
                    </div>
                    <div className={`${Styles["name-on-card"]} ${Styles["input"]}`}>
                        <h2>Name on Card *</h2>
                        <input
                            value={nameOnCard}
                            onChange={e => setNameOnCard(e.target.value)}
                            type="text"
                            required
                        />
                    </div>
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
                                <div className={Styles["per-night-div"]}>
                                    <span className={Styles["per-night"]}>${new Intl.NumberFormat().format(listing.info.price_per_night)}</span>
                                    <span className={Styles["per-night-label"]}>Per night</span>
                                </div>
                                <div className={Styles["total-div"]}>
                                    <span className={Styles["total"]}>${new Intl.NumberFormat().format(listing.info.price_per_night * numberOfNights)}</span>
                                    <span className={Styles["total-label"]}>Total</span>
                                </div>    
                                <hr />                            
                            </div>
                            <button className={Styles["submit-button"]} type="submit" form="book-form">Confirm Booking</button>
                        </>
                    })()}
                </div>
            </div>
            <div ref={thankYouRef} className={Styles["thank-you"]} style={{"display": "none"}}>
                <h1>Thank you for choosing Virginia Beach Rentals</h1>
                <div className={Styles["checkmark"]}>
                    <span>✓</span>
                </div>
            </div>
        </section>
    );
}

export default Book;