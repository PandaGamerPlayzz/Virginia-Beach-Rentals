import { useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';

import { getTitleImageSrc } from '../Listing/Listing.jsx';

import Styles from './Attractions.module.css';

const AttractionEmbed = (props) => {
    let [searchParams] = useSearchParams();

    if(props.listing === undefined) return;

    return (
        <div className={Styles["embeded-listing"]} data-listing-id={props.listing.id}>
            <div className={Styles["embeded-listing-image"]}>
                <img className={Styles["embeded-listing-img-tag"]} src={getTitleImageSrc(props.listing)} alt={""} />
            </div>
            <h1 className={Styles["embeded-listing-name"]}>{props.listing.name}</h1>
            <a href={`/attractions/?lt=modal-attraction&id=${props.listing.id}`}></a>
        </div>
    );
}

export default AttractionEmbed;