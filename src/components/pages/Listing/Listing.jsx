import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Linkify from 'react-linkify';

import Page404 from '../Page404/Page404';

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

const Listing = () => {
    // eslint-disable-next-lin
    let [searchParams] = useSearchParams();

    let [listing, setListing] = useState(undefined);

    useEffect(() => {
        console.log();
        let term = searchParams.get("name") || searchParams.get("id")

        getListing(term).then((listingResult) => {
            if(searchParams.has("name") && listingResult.name !== searchParams.get("name")) return;

            setListing(listingResult);
        });
    }, [searchParams]);

    return (() => {
        if(listing === undefined || listing.maps_api_url.includes("{API_KEY}")) {
            return <Page404 />
        } else if(searchParams.has("show_json") && searchParams.get("show_json") === "true") {
            return <section id="section-listing">
                <h1>
                    <pre style={{fontFamily: "serif", fontSize: "30px"}}>
                        <Linkify properties={{target: "_blank"}}>
                            {JSON.stringify(listing, null, 2)}
                        </Linkify>
                    </pre>
                </h1>
            </section>
        } else {
            return <section id="section-listing">
                <h1>{listing.name}</h1>
                <iframe src={listing.maps_api_url} id="google-maps-iframe" title="google-maps-iframe" width={600} height={450} style={{border: '0'}} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
        }
    })();
}

export default Listing;