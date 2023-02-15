import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Linkify from 'react-linkify';

import Listings from '../Listings/Listings.jsx';

import Styles from './Listing.module.css';

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

        getListing(term).then((listingResult) => {
            if(searchParams.has("name") && listingResult.name !== searchParams.get("name")) return;

            setListing(listingResult);
        });
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
        } else if(searchParams.get("lt") === "all" || props.lt === "all") {
            return <Listings />
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