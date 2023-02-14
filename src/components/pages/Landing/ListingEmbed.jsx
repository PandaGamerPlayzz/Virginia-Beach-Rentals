import { getTitleImageSrc } from '../Listing/Listing.jsx';

import Styles from './ListingSlider.module.css';

const ListingEmbed = (props) => {
    return (
        <div className={Styles["embeded-listing"]} data-listing-id={props.listing.id}>
            <img src={getTitleImageSrc(props.listing)} alt={""} />
            <h1 className={Styles["embeded-listing-name"]}>{props.listing.name}</h1>
            <a href={`/?lt=modal&id=${props.listing.id}`}></a>
        </div>
    );
}

export default ListingEmbed;