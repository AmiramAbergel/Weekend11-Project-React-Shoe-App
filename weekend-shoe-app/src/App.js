import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ShoesList from './components/ShoesList';
import ShoeDetail from './components/ShoeDetail';
import { useState } from 'react';

function App() {
    const [shoesStoreData, setShoesStoreData] = useState(null);
    return (
        <div className='App'>
            <NavBar />
            <main>
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate replace to='/homePage'></Navigate>}
                    />
                    <Route path='/homePage' element={<HomePage />} />
                    <Route
                        path='/products'
                        element={<ShoesList setData={shoesStoreData} />}
                    />
                    <Route
                        path='/products/:productId'
                        element={<ShoeDetail data={shoesStoreData} />}
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
