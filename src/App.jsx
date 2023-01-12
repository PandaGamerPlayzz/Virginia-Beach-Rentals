import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AnimatedRoutes from './AnimatedRoutes.jsx';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <AnimatedRoutes />
            <Footer />
        </BrowserRouter>
    );
}

export default App;