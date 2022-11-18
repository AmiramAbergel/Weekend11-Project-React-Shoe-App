import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import api from '../api/api';

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
    const [shoesStoreData, setShoesStoreData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                props.setIsLoading(true);
                const response = await api.get('/shoes');
                const data = response.data;
                setShoesStoreData(data);
            } catch (err) {
                if (err.response) {
                    // Not in the 200 response range
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    console.log(error.message);
                    setError(error.message);
                }
            } finally {
                props.setIsLoading(false);
            }
        };

        getData();
    }, []);

    const onRead = () => {
        const res = shoesStoreData.map((shoe) => {
            return (
                <Li key={shoe.id} id={shoe.id}>
                    <h3>{shoe.brand}</h3>
                    <h5>Size: {shoe.size}</h5>
                    <h5>Color: {shoe.color}</h5>
                    <img src={shoe.img} alt=''></img>
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
                    {shoesStoreData && <>{onRead()}</>}
                </Ul>
            </section>
        </div>
    );
};

export default ShoesList;
