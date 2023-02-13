import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Linkify from 'react-linkify';

import Styles from './Listing.module.css';

const MAPS_API_KEY = "AIzaSyBm-hjwwdTR9YYWlVzSKsMPwl7n8IrLr5I";

export function getAllListings() {
    return fetch(`/c/data/listings.json`)
    .then((response) => response.json())
    .then((responseJson) => {
        for(let i = 0; i < responseJson.length; i++) {
            let listing = responseJson[i];
            listing.maps_api_url = listing.maps_api_url.replace("{API_KEY}", MAPS_API_KEY);
        }

        return responseJson;
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

export function getImages(listing) {
    let images = [];

    for(let i = 0; i < listing.images.length; i++) {
        let image;

        if(i === 0) {
            image = <img src={listing.images[i]} className={Styles["title-image"]} alt={""} />;
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
        if(!listingWrapperRef.current.contains(event.target)) {
            window.history.back();
        }
    }

    return (() => {
        if(!searchParams.has("lt")) return

        if(listing === undefined) {
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