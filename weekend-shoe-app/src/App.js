import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ShoesList from './components/ShoesList';
import ShoeDetail from './components/ShoeDetail';
import React, { useState } from 'react';
import AddShoe from './components/AddShoe';

function App() {
    const [shoesStoreData, setShoesStoreData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className='App'>
            <NavBar />
            {isLoading && <p>Loading...</p>}
            <main>
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate replace to='/home'></Navigate>}
                    />
                    <Route path='/home' element={<HomePage />} />
                    <Route
                        path='/shoes'
                        element={
                            <ShoesList
                                setIsLoading={setIsLoading}
                                setShoesData={setShoesStoreData}
                                shoesData={shoesStoreData}
                            />
                        }
                    />
                    <Route
                        path='/shoes/:id'
                        element={
                            <ShoeDetail
                                shoesData={shoesStoreData}
                                setIsLoading={setIsLoading}
                            />
                        }
                    />
                    <Route
                        path='/add-shoe'
                        element={
                            <AddShoe
                                setShoesData={setShoesStoreData}
                                setIsLoading={setIsLoading}
                            />
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
