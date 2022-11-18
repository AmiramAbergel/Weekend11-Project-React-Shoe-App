import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { NavLink, useParams } from 'react-router-dom';

const ShoeDetail = (props) => {
    const [shoeData, setShoeData] = useState(props.shoesData);
    const [error, setError] = useState('');
    const params = useParams();
    console.dir(typeof params.id);

    const dataHandler = (data, id) => {
        const found = data.filter((element) => {
            return element.id === id;
        });
        return found.map((shoe) => (
            <div key={shoe.id} id={shoe.id}>
                <h3>{shoe.brand}</h3>
                <h5>Size: {shoe.size}</h5>
                <h5>Color: {shoe.color}</h5>
                <img src={shoe.img} alt='{shoe.brand}'></img>
            </div>
        ));
    };

    return (
        <section>
            <h1>Shoe Detail</h1>
            {shoeData && <>{dataHandler(shoeData, params.id)}</>}
            <button>
                <NavLink to={`/shoes`}>Back</NavLink>
            </button>
        </section>
    );
};

export default ShoeDetail;
