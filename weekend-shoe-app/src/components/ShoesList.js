import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import api from '../api/api';
import { NavLink } from 'react-router-dom';

const Ul = styled.ul`
    display: flex;
    flex-flow: row wrap;
    position: relative;
    list-style-type: none;
`;

const Li = styled.li`
    margin: 4px;
    flex: 0 1 calc(20% - 8px); /* <-- adjusting for margin */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 40%;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`;

const ShoesList = (props) => {
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                props.setIsLoading(true);
                const response = await api.get('/shoes');
                const dataArray = response.data;
                props.setShoesData(dataArray);
            } catch (err) {
                if (err.response) {
                    // Not in the 200 response range
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

        getData();
    }, [props.setIsLoading]);

    const onRead = () => {
        console.log(props.shoesData);
        const res = props.shoesData.map((shoe) => {
            return (
                <Li key={shoe.id} id={shoe.id}>
                    <NavLink to={`/shoes/` + shoe.id}>
                        <h3>{shoe.brand}</h3>
                        <h5>Size: {shoe.size}</h5>
                        <h5>Color: {shoe.color}</h5>
                        <img src={shoe.img} alt='{shoe.brand}'></img>
                    </NavLink>
                </Li>
            );
        });
        return res;
    };

    return (
        <div>
            <section>
                <Ul>
                    {/* {!isLoading && error && <p>{error}</p>}
                {!isLoading && !error && shoesStoreData && <>{onRead()}</>}
                {!isLoading && !error && !shoesStoreData && (
                    <p>Found no shoes</p>
                )} */}
                    {props.shoesData && <>{onRead()}</>}
                </Ul>
            </section>
        </div>
    );
};

export default ShoesList;
