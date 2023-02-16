import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Linkify from 'react-linkify';

import Styles from './Listing.module.css';
import ListingSearchOptions from './ListingSearchOptions.jsx';

const MAPS_API_KEY = 'AIzaSyBm-hjwwdTR9YYWlVzSKsMPwl7n8IrLr5I';

export function sortListings(listings, sortBy, target) {
    let sortedListings = listings.sort((listingA, listingB) => {
        if(sortBy === undefined || target === undefined) {
            return 0;
        } else if(sortBy.toLowerCase() === 'price') {
            return Math.abs(target - listingA.info.price_per_night) < Math.abs(target - listingB.info.price_per_night) ? -1 : 1;
        } else if(sortBy.toLowerCase() === 'guests') {
            return Math.abs(target - listingA.info.guests) < Math.abs(target - listingB.info.guests) ? 1 : -1;
        }

        return 0;
    });

    return sortedListings;
}

export function filterListings(cookies, listings, filterParams) {
    let filteredListings = listings.filter(listing => {
        return !(
            (filterParams['saved'] === true && cookies['saved-listings'][listing.name] !== true) ||
            (filterParams['guests'] !== false && listing.info.guests < filterParams['guests']) ||
            (filterParams['maxprice'] !== false && listing.info.price_per_night > filterParams['maxprice'])
        );
    });

    return filteredListings;
}

export function getAllAttractions() {
    return fetch(`/c/data/attractions.json`)
    .then((response) => response.json())
    .then((responseJson) => {
        let allAttractions = [];

        for(let i = 0; i < responseJson.length; i++) {
            let attraction = responseJson[i];
            attraction.id = allAttractions.length;
            attraction.maps_api_url = attraction.maps_api_url.replace('{API_KEY}', MAPS_API_KEY);

            if(attraction.testing_property !== true) allAttractions.push(attraction);
        }

        return allAttractions;
    })
    .catch((error) => {
        console.error(error);
    });
}

export function getAttraction(searchTerm) {
    if(!isNaN(searchTerm) && !isNaN(parseFloat(searchTerm))) {
        return getAllAttractions().then((allAttractions) => {
            return allAttractions[searchTerm];
        })
        .catch((error) => {
            console.error(error);
        });
    } else {
        return getAllAttractions().then((allAttractions) => {
            for(let attraction of allAttractions) {
                if(attraction.name.toLowerCase() === searchTerm.toLowerCase()) return attraction;
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

export function getAllListings() {
    return fetch(`/c/data/listings.json`)
    .then((response) => response.json())
    .then((responseJson) => {
        let allListings = [];

        for(let i = 0; i < responseJson.length; i++) {
            let listing = responseJson[i];
            listing.id = allListings.length;
            listing.maps_api_url = listing.maps_api_url.replace('{API_KEY}', MAPS_API_KEY);

            if(listing.testing_property !== true) allListings.push(listing);
        }

        return allListings;
    })
    .catch((error) => {
        console.error(error);
    });
}

export function getListing(searchTerm) {
    if(!isNaN(searchTerm) && !isNaN(parseFloat(searchTerm))) {
        return getAllListings().then((allListings) => {
            return allListings[searchTerm];
        })
        .catch((error) => {
            console.error(error);
        });
    } else {
        return getAllListings().then((allListings) => {
            for(let listing of allListings) {
                if(listing.name.toLowerCase() === searchTerm.toLowerCase()) return listing;
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

export function getTitleImageSrc(listing) {
    return listing.images[0];
}

export function getImages(listing) {
    let images = [];

    for(let i = 0; i < listing.images.length; i++) {
        let image;

        if(i === 0) {
            image = <img src={listing.images[0]} className={Styles["title-image"]} alt={""} />;
        } else {
           image = <img src={listing.images[i]} alt={""} />;
        }

        images.push(image);
    }

    return images;
}

const Listing = (props) => {
    let [searchParams] = useSearchParams();

    let [listing, setListing] = useState(undefined);
    
    let listingWrapperRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick, true);

        if(searchParams.get("lt" == "all")) return;

        if(searchParams.has("lt")) {
            let body = document.getElementsByTagName("body")[0];
            body.classList.add("disable-scroll");
        }

        let term = searchParams.get("name") || searchParams.get("id")

        if(searchParams.has("lt") && searchParams.get("lt") === "modal-attraction") {
            getAttraction(term).then((attractionResult) => {
                if(searchParams.has("name") && attractionResult.name !== searchParams.get("name")) return;
    
                setListing(attractionResult);
            });
        } else {
            getListing(term).then((listingResult) => {
                if(searchParams.has("name") && listingResult.name !== searchParams.get("name")) return;
    
                setListing(listingResult);
            });
        }
    }, [searchParams]);

    const handleOutsideClick = (event) => {
        if(listingWrapperRef.current && !listingWrapperRef.current.contains(event.target)) {
            window.history.back();
        }
    }

    return (() => {
        if(!searchParams.has("lt")) return

        if(listing === undefined && searchParams.get("lt") !== "all") {
            return <>
                <div id={Styles["blur"]}></div>
                <section id="section-listing">
                    <div id={Styles["listing-wrapper"]} ref={listingWrapperRef}>
                        <h1 id={Styles["listing-not-found"]}>Listing not found</h1>
                    </div>
                </section>
            </>
        } else if(searchParams.get("lt") === "json" || props.lt === "json") {
            return <>
                <div id={Styles["blur"]}></div>
                <section id="section-listing">
                    <div id={Styles["listing-wrapper"]} ref={listingWrapperRef}>
                        <pre id={Styles["listing-json"]} style={{fontFamily: "serif", fontSize: "30px"}}>
                            <Linkify properties={{target: "_blank"}}>
                                {JSON.stringify(listing, null, 2)}
                            </Linkify>
                        </pre>
                    </div>
                </section>
            </>
        } else if(searchParams.get("lt") === "modal" || props.lt === "modal") {
            let images = getImages(listing);

            return <>
                <div id={Styles["blur"]}></div>
                <section id="section-listing">
                    <div id={Styles["listing-wrapper"]} ref={listingWrapperRef}>
                        <div id={Styles["listing-images-wrapper"]}>
                            {images.slice(0, 1)}
                            <iframe src={listing.maps_api_url} id={Styles["google-maps-iframe"]} title="google-maps-iframe" style={{border: '0'}} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
                            {images.slice(1)}
                        </div>
                        <div id={Styles["listing-information-wrapper"]}>
                            <h2>Address</h2>
                            <hr />
                            <p>
                                {`${listing.address.street_number} ${listing.address.street_name} ${listing.address.street_type}`}
                                <br/>
                                {`${listing.address.apartment_number !== undefined ? `Apartment ${listing.address.apartment_number}` : ''}`}
                                {(() => {
                                    return listing.address.apartment_number !== undefined ? (<br />) : undefined;
                                })()}
                                {`${listing.address.city}, ${listing.address.state} ${listing.address.zipcode}`}
                            </p>

                            <h2>Guest Capacity</h2>
                            <hr />
                            <p>
                                Holds up to <span>{listing.info.guests}</span> {listing.info.guests > 1 ? 'guests' : 'guest'}
                                <br />
                                <br />
                                <span>{listing.info.bedrooms}</span> bedrooms, <span>{listing.info.bathrooms}</span> bathrooms
                                <br />
                                <span>{new Intl.NumberFormat().format(listing.info.sqft)}</span> sqft
                                <br />
                                <br />
                                {(() => {
                                    return listing.info.beds.king > 0 ? (<>
                                        <span>{`${listing.info.beds.king}`}</span> {listing.info.beds.king > 1 ? 'kings' : 'king'}
                                        <br />
                                    </>) : undefined;
                                })()} 
                                {(() => {
                                    return listing.info.beds.queen > 0 ? (<>
                                        <span>{`${listing.info.beds.queen}`}</span> {listing.info.beds.queen > 1 ? 'queens' : 'queen'}
                                        <br />
                                    </>) : undefined;
                                })()} 
                                {(() => {
                                    return listing.info.beds.full > 0 ? (<>
                                        <span>{`${listing.info.beds.full}`}</span> {listing.info.beds.full > 1 ? 'fulls' : 'full'}
                                        <br />
                                    </>) : undefined;
                                })()} 
                                {(() => {
                                    return listing.info.beds.single > 0 ? (<>
                                        <span>{`${listing.info.beds.single}`}</span> {listing.info.beds.single > 1 ? 'singles' : 'single'}
                                        <br />
                                    </>) : undefined;
                                })()} 
                                {(() => {
                                    return listing.info.beds.pullout_sofa > 0 ? (<>
                                        <span>{`${listing.info.beds.pullout_sofa}`}</span> {listing.info.beds.pullout_sofa > 1 ? 'pullout sofas' : 'pullout sofa'}
                                        <br />
                                    </>) : undefined;
                                })()} 
                            </p>

                            <h2>Check Availability</h2>
                            <hr />
                            <ListingSearchOptions listingId={listing.id} />
                        </div>
                    </div>
                </section>
            </>
        } else if(searchParams.get("lt") === "modal-attraction" || props.lt === "modal") {
            let images = getImages(listing);

            return <>
                <div id={Styles["blur"]}></div>
                <section id="section-listing">
                    <div id={Styles["listing-wrapper"]} ref={listingWrapperRef}>
                        <div id={Styles["listing-images-wrapper"]}>
                            {images.slice(0, 1)}
                            <iframe src={listing.maps_api_url} id={Styles["google-maps-iframe"]} title="google-maps-iframe" style={{border: '0'}} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
                            {images.slice(1)}
                        </div>
                        <div id={Styles["listing-information-wrapper"]}>
                            <h2>Address</h2>
                            <hr />
                            <p>
                                {`${listing.address.street_number} ${listing.address.street_name} ${listing.address.street_type}`}
                                <br/>
                                {`${listing.address.apartment_number !== undefined ? `Apartment ${listing.address.apartment_number}` : ''}`}
                                {(() => {
                                    return listing.address.apartment_number !== undefined ? (<br />) : undefined;
                                })()}
                                {`${listing.address.city}, ${listing.address.state} ${listing.address.zipcode}`}
                            </p>
                        </div>
                    </div>
                </section>
            </>
        } else if(searchParams.get("lt") === "full" || props.lt === "full") {
            // let images = getImages(listing);

            return <>
                <section id="section-listing">
                    <iframe src={listing.maps_api_url} width={600} height={450} title="google-maps-iframe" style={{border: '0'}} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
                </section>
            </>
        }

        return
    })();
}

export default Listing;