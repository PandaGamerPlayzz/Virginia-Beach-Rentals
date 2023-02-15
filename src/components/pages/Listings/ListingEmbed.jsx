import { useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { getTitleImageSrc } from '../Listing/Listing.jsx';

import Styles from './Listings.module.css';

const ListingEmbed = (props) => {
    const [cookies, setCookie] = useCookies(['saved-listings']);

    useEffect(() => {
        if(cookies['saved-listings'] === undefined) {
            setCookie('saved-listings', {});
        }
    });

    const heartRef = useRef(null);

    if(props.listing === undefined) return;

    return (
        <div className={Styles["embeded-listing"]} data-listing-id={props.listing.id}>
            <div className={Styles["embeded-listing-image"]}>
                <img className={Styles["embeded-listing-img-tag"]} src={getTitleImageSrc(props.listing)} alt={""} />
            </div>
            <h1 className={Styles["embeded-listing-name"]}>{props.listing.name}</h1>
            <h2 className={Styles["embeded-listing-guests"]}>{"up to"} <span className={Styles["bold"]}>{`${props.listing.info.guests}`}</span> {"guests"}</h2>
            <h2 className={Styles["embeded-listing-price"]}><span className={Styles["bold"]}>{`$${props.listing.info.price_per_night}`}</span> {"per night"}</h2>
            <a href={`/listings/?lt=modal&id=${props.listing.id}`}></a>
            <img ref={heartRef} className={`${Styles["embeded-listing-heart-svg"]} ${cookies['saved-listings'] && cookies['saved-listings'][props.listing.name] === true ? Styles["saved"] : ""}`} src="/c/img/Heart.svg" alt={""} onClick={() => {
                heartRef.current.classList.toggle(Styles["saved"]);

                let savedListings = JSON.parse(JSON.stringify(cookies['saved-listings']));
                savedListings[props.listing.name] = heartRef.current.classList.contains(Styles["saved"]);
                
                setCookie('saved-listings', savedListings);
                console.log(savedListings);
            }}></img>
        </div>
    );
}

export default ListingEmbed;