import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ShoesList from './components/ShoesList';
import ShoeDetail from './components/ShoeDetail';
import React, { useState } from 'react';

function App() {
    const [shoesStoreData, setShoesStoreData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className='App'>
            <NavBar />
            {isLoading && <p>Loading...</p>}
            <main>
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate replace to='/homePage'></Navigate>}
                    />
                    <Route path='/homePage' element={<HomePage />} />
                    <Route
                        path='/shoes'
                        element={
                            <ShoesList
                                setIsLoading={setIsLoading}
                                setShoesData={setShoesStoreData}
                            />
                        }
                    />
                    <Route
                        path='/shoes/:shoeId'
                        element={<ShoeDetail data={shoesStoreData} />}
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
