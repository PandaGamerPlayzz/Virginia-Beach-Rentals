import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';

import { getAllAttractions } from '../Listing/Listing.jsx';

import Listing from '../Listing/Listing.jsx';
import AttractionEmbed from './AttractionEmbed.jsx';

import Styles from './Attractions.module.css';

const Attractions = () => {
    let [searchParams] = useSearchParams();

    const now = new Date();
    const today = `${now.getFullYear()}-${String(2, now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const [data, setData] = useState([]);

    useEffect(() => {
        getAllAttractions()
        .then((allAttractions) => {
            setData(allAttractions);
        });
    });

    return (
        <>
            <Listing show={searchParams.get("sl") === "true" ? true : false} />
            <section id="section-found-listings" className={Styles["section-found-listings"]}>
                <h1>{
                    data.length > 0 ? `Here${data.length === 1 ? "'s" : " are"} ${data.length} ${data.length === 1 ? "attraction" : "attractions"} that we thought you'd might like`
                    : `Sorry, but we couldn't find any listings that are fit for you`
                }</h1>
            </section>
            <section id="section-listings" className={Styles["section-listings"]}>
                <div className={Styles["grid-wrapper"]}>
                    {data.map((listing) => (
                        <AttractionEmbed listing={listing} />
                    ))}
                </div>
                <div className={Styles["out-of-listings"]} style={{"display": "none"}}>
                    <h1 className={Styles["label-sorry"]}>Sorry,</h1>
                    <h1 className={Styles["label-out-of-listings"]}>but it appears we have no more listings to display.</h1>
                </div>
            </section>  
        </>        
    );
}

export default Attractions;