import { useState, useRef, useEffect } from 'react';

import { getAllListings } from '../Listing/Listing.jsx';

import ListingEmbed from './ListingEmbed.jsx';

import Styles from './ListingSlider.module.css';

const ListingSlider = (props) => {
    const [data, setData] = useState([]);

    const wrapperRef = useRef(null);
    const leftButtonRef = useRef(null);
    const rightButtonRef = useRef(null);

    useEffect(() => {
        getAllListings()
        .then((allListings) => {
            setData(allListings);
        });

        let lastScroll = new Date();
        let lastClick = new Date();
        let timer = null;

        wrapperRef.current?.addEventListener("scroll", e => {
            let maxScroll = (wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth) / 2;
            
            lastScroll = new Date();
            
            if(wrapperRef.current.scrollLeft / maxScroll > 0.5) {
                wrapperRef.current.scrollTo({
                    top: 0, 
                    left: 1,
                    behavior: 'instant'
                });
            } else if(wrapperRef.current.scrollLeft < 0.01) {
                wrapperRef.current.scrollTo({
                    top: 0, 
                    left: maxScroll * 0.5,
                    behavior: 'instant'
                });
            }

            if(timer !== null) clearTimeout(timer);  
            timer = setTimeout(() => {
                wrapperRef.current.scrollLeft = Math.ceil(wrapperRef.current.scrollLeft / (wrapperRef.current.clientWidth / 4)) * (wrapperRef.current.clientWidth / 4);
                timer = null;
            }, 350);
        });

        leftButtonRef.current.addEventListener("click", e => {
            if((new Date() - lastScroll) / 1000 < 1) return;
            lastScroll = new Date();
            lastClick = new Date();

            wrapperRef.current.scrollLeft -= wrapperRef.current.clientWidth / 4 * 2;
        });

        rightButtonRef.current.addEventListener("click", e => {
            if((new Date() - lastScroll) / 1000 < 1) return;
            lastScroll = new Date();
            lastClick = new Date();

            wrapperRef.current.scrollLeft += wrapperRef.current.clientWidth / 4 * 2;
        });

        const update = () => {
            if((new Date() - lastScroll) / 1000 > 2.5 && (new Date() - lastClick / 1000 > 5)) {
                let maxScroll = (wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth) / 2;
                wrapperRef.current.scrollLeft += wrapperRef.current.clientWidth / 4;
                if(wrapperRef.current.scrollLeft > maxScroll * 0.5) wrapperRef.current.scrollLeft = 0;
            }

            setTimeout(update, 3000);
        }

        update();
    }, []);

    return (
        <div className={Styles["listing-slider"]}>
            <div className={Styles["listing-slider-wrapper"]} ref={wrapperRef}>
                {data.concat(data).map((listing) => (
                    <ListingEmbed listing={listing} />
                ))}
            </div>
            <div className={Styles["listing-slider-left-arrow"]} ref={leftButtonRef}><span>{"<"}</span></div>
            <div className={Styles["listing-slider-right-arrow"]} ref={rightButtonRef}><span>{">"}</span></div>
        </div>
    );
}

export default ListingSlider;