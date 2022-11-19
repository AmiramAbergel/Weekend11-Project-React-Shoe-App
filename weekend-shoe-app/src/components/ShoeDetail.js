import React, { useState, useRef } from 'react';
import api from '../api/api';
import styled from '@emotion/styled';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import Btn from './Btn';
import { Div } from './AddShoe';

const Section = styled.section`
    margin: 4px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 40%;
    background-color: FloralWhite;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`;

const ShoeDetail = (props) => {
    const [shoesData, setShoesData] = useState(props.shoesData);
    const [error, setError] = useState('');
    const params = useParams();
    const [shoeInfo, setShoeInfo] = useState({
        size: '',
        color: '',
        text: '',
    });
    console.log(setShoesData);
    const sizeInputRef = useRef();
    const colorInputRef = useRef();
    const textInputRef = useRef();
    const [shoeById, setShoeById] = useState({});
    const navigate = useNavigate();
    console.log(shoeById);
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
            await api.put(`/shoes/${params.id}`, editedShoe);
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
            navigate(-1);
        }
    };

    const onDeleteShoe = async () => {
        try {
            props.setIsLoading(true);
            window.confirm(`Delete ?`);
            await api.delete(`/shoes/${params.id}`);
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
            navigate(-1);
        }
    };

    const dataHandler = (data, id) => {
        const found = data.filter((element) => {
            return element.id === id;
        });
        return found.map((shoe) => {
            return (
                <Div className='form-container' key={shoe.id}>
                    <form onSubmit={handleSubmit} id={shoe.id}>
                        <h1>Shoe detail - edit section</h1>
                        <div>
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
                            <label htmlFor='color'> Color: </label>
                            <input
                                type='color'
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
                                type='textInput'
                                name='text'
                                placeholder='Any notes?'
                                value={shoeInfo.text}
                                onChange={handleChange}
                                ref={textInputRef}
                            />
                        </div>
                        <div>
                            <Btn>Submit Changes</Btn>
                        </div>
                    </form>
                    <Section>
                        <h2>Additional Product Details</h2>
                        <div>
                            <h3>{shoe.brand}</h3>
                            <img src={shoe.img} alt='{shoe.brand}'></img>
                            <h5>Size: {shoe.size}</h5>
                            <h5>Color: {shoe.color}</h5>
                            <h5>
                                In stock?: {shoe.available ? 'Yes!' : 'No...'}
                            </h5>
                            <h5>Price: {shoe.price}</h5>
                        </div>
                    </Section>
                </Div>
            );
        });
    };

    return (
        <section>
            <div>
                {!props.isLoading && !error && shoesData && (
                    <>{dataHandler(shoesData, params.id)}</>
                )}
            </div>
            <Btn onClick={() => onDeleteShoe()}>Delete this shoe</Btn>
            <Btn>
                <NavLink
                    style={{ textDecoration: 'none', color: 'white' }}
                    to={`/shoes`}
                >
                    Back
                </NavLink>
            </Btn>
        </section>
    );
};

export default ShoeDetail;
