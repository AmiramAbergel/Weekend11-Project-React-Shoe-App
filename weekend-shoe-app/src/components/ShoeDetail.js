import React, { useEffect, useState, useRef } from 'react';
import api from '../api/api';
import styled from '@emotion/styled';

import { NavLink, useParams } from 'react-router-dom';
import { ClassNames } from '@emotion/react';

const ShoeDetail = (props) => {
    const [shoesData, setShoesData] = useState(props.shoesData);
    const [error, setError] = useState('');
    const params = useParams();
    const [shoeInfo, setShoeInfo] = useState({
        size: '',
        color: '',
        text: '',
    });

    const sizeInputRef = useRef();
    const colorInputRef = useRef();
    const textInputRef = useRef();
    const [shoeById, setShoeById] = useState({});

    const handleChange = ({ target }) => {
        setShoeInfo((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const found = shoesData.find((shoe) => shoe.id === event.target.id);

        setShoeById(found);
        setShoeById((prev) => {
            return { ...prev, ...shoeInfo };
        });
        const editedShoe = { ...found, ...shoeInfo };

        updateShoeInfo(editedShoe);
        setShoeInfo({ size: '', color: '', text: '' });
    };

    const updateShoeInfo = async (editedShoe) => {
        try {
            props.setIsLoading(true);
            await api.put(
                `https://637631bab5f0e1eb8505360f.mockapi.io/shoes/${params.id}`,
                editedShoe
            );
        } catch (err) {
            if (err.response) {
                // Not in the 200 response range
                console.log(err);
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else {
                console.log(err.message);
                setError(err.message);
            }
        } finally {
            props.setIsLoading(false);
        }
    };

    const onDeleteShoe = async (shoeToDelete) => {
        try {
            props.setIsLoading(true);
            window.confirm(`Delete ${shoeToDelete.brand}?`);
            await api.delete(
                `https://637631bab5f0e1eb8505360f.mockapi.io/shoes/${params.id}`,
                shoeToDelete
            );
        } catch (err) {
            if (err.response) {
                // Not in the 200 response range
                console.log(err);
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else {
                console.log(err.message);
                setError(err.message);
            }
        } finally {
            props.setIsLoading(false);
        }
    };

    const dataHandler = (data, id) => {
        const found = data.filter((element) => {
            return element.id === id;
        });
        return found.map((shoe) => {
            return (
                <div className='form-container' key={shoe.id}>
                    <form onSubmit={handleSubmit} id={shoe.id}>
                        <div>
                            <h3>{shoe.brand}</h3>
                        </div>
                        <div>
                            <h5>Size: {shoe.size}</h5>
                            <label htmlFor='size'> Size: </label>
                            <input
                                type='number'
                                name='size'
                                placeholder={shoe.size}
                                value={shoeInfo.size}
                                onChange={handleChange}
                                ref={sizeInputRef}
                            />
                        </div>
                        <div>
                            <h5>Color: {shoe.color}</h5>
                            <label htmlFor='color'> Color: </label>
                            <input
                                type='number'
                                name='color'
                                placeholder={shoe.color}
                                value={shoeInfo.color}
                                onChange={handleChange}
                                ref={colorInputRef}
                            />
                        </div>
                        <div>
                            <label htmlFor='text'> Tell us </label>
                            <input
                                type='text'
                                name='text'
                                placeholder='Any notes?'
                                value={shoeInfo.text}
                                onChange={handleChange}
                                ref={textInputRef}
                            />
                        </div>
                        <div>
                            <button onClick={() => onDeleteShoe(shoe)}>
                                Delete this shoe
                            </button>
                        </div>
                        <div>
                            <button>Submit Changes</button>
                        </div>
                    </form>
                    <section>
                        <h2>PRODUCT DETAILS</h2>
                        <img src={shoe.img} alt='{shoe.brand}'></img>
                        <h5>In stock?: {shoe.available ? 'Yes!' : 'No...'}</h5>
                        <h5>Price: {shoe.price}</h5>
                    </section>
                </div>
            );
        });
    };

    return (
        <section>
            <h1>Shoe Detail</h1>
            {!props.isLoading && !error && shoesData && (
                <>{dataHandler(shoesData, params.id)}</>
            )}

            <button>
                <NavLink to={`/shoes`}>Back</NavLink>
            </button>
        </section>
    );
};

export default ShoeDetail;
