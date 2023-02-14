import { useState, useRef, useEffect } from 'react';

import { getAllListings } from '../Listing/Listing.jsx';

import ListingEmbed from './ListingEmbed.jsx';

import Styles from './ListingSlider.module.css';

function pickClosest(value, a, b) {
    return Math.abs(value - a) < Math.abs(value - b) ? a : b;
}

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
        let lastAutoScroll = new Date();

        wrapperRef.current.onwheel = () => { return false; }

        wrapperRef.current?.addEventListener("scroll", e => {
            let maxScroll = (wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth);
            
            lastScroll = new Date();
            
            if(wrapperRef.current.scrollLeft > maxScroll - 1) {
                wrapperRef.current.scrollTo({
                    top: 0, 
                    left: 1,
                    behavior: 'instant'
                });
            } else if(wrapperRef.current.scrollLeft < 1) {
                wrapperRef.current.scrollTo({
                    top: 0, 
                    left: maxScroll - wrapperRef.current.clientWidth / 4,
                    behavior: 'instant'
                });
            }
        });

        leftButtonRef.current.addEventListener("click", e => {
            if((new Date() - lastScroll) / 1000 < 1) return;
            lastScroll = new Date();
            lastClick = new Date();

            let maxScroll = (wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth);
            if(wrapperRef.current.scrollLeft - wrapperRef.current.clientWidth / 4 < 1) {
                wrapperRef.current.scrollTo({
                    top: 0, 
                    left: maxScroll - wrapperRef.current.clientWidth / 4,
                    behavior: 'instant'
                });
            }
            wrapperRef.current.scrollLeft -= wrapperRef.current.clientWidth / 4;
        });

        rightButtonRef.current.addEventListener("click", e => {
            if((new Date() - lastScroll) / 1000 < 1) return;
            lastScroll = new Date();
            lastClick = new Date();

            let maxScroll = (wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth);
            if(wrapperRef.current.scrollLeft + wrapperRef.current.clientWidth / 4 > maxScroll - 1) {
                wrapperRef.current.scrollTo({
                    top: 0, 
                    left: 1,
                    behavior: 'instant'
                });
            }
            wrapperRef.current.scrollLeft += wrapperRef.current.clientWidth / 4;
        });

        const update = () => {
            if((new Date() - lastScroll) / 1000 > 2.5 && (new Date() - lastClick / 1000 > 5)) {
                lastAutoScroll = new Date();

                let maxScroll = (wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth);
                if(wrapperRef.current.scrollLeft + wrapperRef.current.clientWidth / 4 > maxScroll - 1) {
                    wrapperRef.current.scrollTo({
                        top: 0, 
                        left: 1,
                        behavior: 'instant'
                    });
                }
                wrapperRef.current.scrollLeft += wrapperRef.current.clientWidth / 4;
            }

            setTimeout(update, 3000);
        }

        update();
    }, []);

    return (
        <div className={Styles["listing-slider"]}>
            <div className={Styles["listing-slider-wrapper"]} ref={wrapperRef}>
                {data.concat([data[0], data[1], data[2], data[3], data[4]]).map((listing) => (
                    <ListingEmbed listing={listing} />
                ))}
            </div>
            <button className={Styles["listing-slider-left-arrow"]} ref={leftButtonRef}><span>{"<"}</span></button>
            <button className={Styles["listing-slider-right-arrow"]} ref={rightButtonRef}><span>{">"}</span></button>
        </div>
    );
}

export default ListingSlider;