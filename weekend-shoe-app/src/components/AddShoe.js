import styled from '@emotion/styled';
import React, { useState } from 'react';
import api from '../api/api';
import Btn from './Btn';

export const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
    margin: 4px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 40%;
    background-color: FloralWhite;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`;

const AddShoe = (props) => {
    const shoeObj = {
        brand: '',
        size: '',
        img: '',
        price: '',
        color: '',
        available: true,
        id: '',
        detail: '',
    };
    const [error, setError] = useState('');
    const [newShoeInfo, setNewShoeInfo] = useState(shoeObj);

    const clearData = () => {
        setNewShoeInfo(shoeObj);
    };

    const handleChange = ({ target }) => {
        console.log(target);
        setNewShoeInfo((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const onAddShoe = async (newShoe) => {
        try {
            props.setIsLoading(true);
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
        <Div className='form-container'>
            <Form onSubmit={newShoeFormDataHandler}>
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
                        type='url'
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
                    <h3>Available Status:</h3>
                    <label htmlFor='available'> Available </label>
                    <input
                        type='radio'
                        name='available'
                        checked={newShoeInfo.available === true ? true : false}
                        value={true}
                        onChange={handleChange}
                    />
                    <label htmlFor='unAvailable'> Un-Available </label>
                    <input
                        type='radio'
                        name='available'
                        checked={newShoeInfo.available === true ? true : false}
                        value={true}
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
                    <Btn>Save&Add</Btn>
                    <Btn onClick={() => onDeleteShoe()}>Discard Item</Btn>
                </div>
            </Form>
        </Div>
    );
};

export default AddShoe;
