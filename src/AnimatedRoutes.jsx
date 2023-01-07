import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Page404 from './components/pages/Page404/Page404.jsx';

export const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default AnimatedRoutes;