import { useSearchParams } from 'react-router-dom';

import Listing from '../Listing/Listing.jsx';
import ListingSearhOptions from './ListingSearchOptions.jsx';
import ListingSlider from './ListingSlider.jsx';
import MailingListForm from './MailingListForm.jsx';

import Styles from './Landing.module.css';

const Landing = () => {
    let [searchParams] = useSearchParams();

    return (
        <>
            <Listing show={searchParams.get("sl") === "true" ? true : false} />
            <section id="section-landing">
                <div>
                    <img id={Styles["landing-image1"]} src="https://photos.zillowstatic.com/fp/1be157563ce5c168ea6dd707ef4790f0-cc_ft_1536.webp" alt="" />
                    <h1 id={Styles["landing-image1-quote"]}>"A house is made of bricks and beams. A home is made of hopes and dreams."</h1>
                </div>
                <div id={Styles["landing-wrapper"]}>
                    <ListingSearhOptions />
                    <ListingSlider />
                    <MailingListForm />
                </div>
            </section>
        </>
    );
}

export default Landing;