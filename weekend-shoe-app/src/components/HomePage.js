import styled from '@emotion/styled';
import React from 'react';

const Div = styled.div`
    background-color: antiquewhite;
`;

const HomePage = (props) => {
    return (
        <Div>
            <Div>
                <h1>Welcome To my Shoes Store!</h1>
            </Div>
            <img
                src='https://img.freepik.com/premium-vector/sneaker-store-logo-shoes_8169-14.jpg?w=826'
                alt=''
            ></img>
        </Div>
    );
};

export default HomePage;
