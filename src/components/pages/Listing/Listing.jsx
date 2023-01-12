import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Linkify from 'react-linkify';

import Page404 from '../Page404/Page404';

export function getAllListings() {
    return fetch(`/c/data/listings.json`)
    .then((response) => response.json())
    .then((responseJson) => {
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
        let term = searchParams.get("name") || searchParams.get("id")

        getListing(term).then((listingResult) => {
            if(searchParams.has("name") && listingResult.name !== searchParams.get("name")) return;

            setListing(listingResult);
        });
    }, [searchParams]);

    return (() => {
        if(listing === undefined) {
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
            </section>
        }
    })();
}

export default Listing;