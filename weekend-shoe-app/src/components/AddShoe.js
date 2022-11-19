import React, { useState } from 'react';
import api from '../api/api';
const AddShoe = (props) => {
    const shoeObj = {
        brand: '',
        size: '',
        img: '',
        price: '',
        color: '',
        available: '',
        id: '',
        detail: '',
    };
    const [error, setError] = useState('');
    const [newShoeInfo, setNewShoeInfo] = useState(shoeObj);

    const clearData = () => {
        setNewShoeInfo(shoeObj);
    };

    const handleChange = ({ target }) => {
        setNewShoeInfo((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const onAddShoe = async (newShoe) => {
        try {
            props.setIsLoading(true);
            console.log(newShoe);
            const response = await api.post(
                `https://637631bab5f0e1eb8505360f.mockapi.io/shoes/`,
                newShoe
            );
            const newShoeDataObj = response.data;
            props.setShoesData((prev) => [...prev, newShoeDataObj]);
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

    const newShoeFormDataHandler = (event) => {
        event.preventDefault();
        onAddShoe(newShoeInfo);
    };

    const onDeleteShoe = () => {};

    return (
        <div className='form-container'>
            <form onSubmit={newShoeFormDataHandler}>
                <div>
                    <h2>Add New Shoe</h2>
                </div>
                <div>
                    <label htmlFor='brand'> Brand Name: </label>
                    <input
                        type='sting'
                        name='brand'
                        placeholder='Brand Name (5-10 chars)'
                        value={newShoeInfo.brand}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='size'> Size: </label>
                    <input
                        type='number'
                        name='size'
                        placeholder={'Valid Size'}
                        value={newShoeInfo.size}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='img'> Image: </label>
                    <input
                        type='number'
                        name='img'
                        placeholder={'Valid Image URL'}
                        value={newShoeInfo.img}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='color'> Color: </label>
                    <input
                        type='number'
                        name='color'
                        placeholder={'Valid color'}
                        value={newShoeInfo.color}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='available'> Available Status: </label>
                    <input
                        type='bool'
                        name='available'
                        placeholder={'TRUE/FALSE'}
                        value={newShoeInfo.available}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor='detail'> PRODUCT DETAILS: </label>
                <textarea
                    placeholder='PRODUCT DETAILS'
                    name='detail'
                    value={newShoeInfo.detail}
                    onChange={handleChange}
                ></textarea>
                <div>
                    <button>Save&Add</button>
                    <button onClick={() => onDeleteShoe()}>Discard Item</button>
                </div>
            </form>
        </div>
    );
};

export default AddShoe;
