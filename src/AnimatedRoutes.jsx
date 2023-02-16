import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Page404 from './components/pages/Page404/Page404.jsx';

import Landing from './components/pages/Landing/Landing.jsx';
import Listing from './components/pages/Listing/Listing.jsx';
import Listings from './components/pages/Listings/Listings.jsx';
import Book from './components/pages/Book/Book.jsx';

export const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="" element={<Landing />} />
            <Route path="listing" element={<Listing />} />
            <Route path="listings" element={<Listings />} />
            <Route path="book" element={<Book />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default AnimatedRoutes;