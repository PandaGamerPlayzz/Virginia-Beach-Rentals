import { useSearchParams } from 'react-router-dom';

import Styles from './ListingSlider.module.css';

const ListingSlider = (props) => {
    let [searchParams] = useSearchParams();

    return (
        <div className={Styles["listing-slider"]}>
            <div className={Styles["listing-slider-wrapper"]}>

            </div>
        </div>
    );
}

export default ListingSlider;