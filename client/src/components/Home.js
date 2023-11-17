import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from './MainContext';
import styled from 'styled-components';

const Home = ({ addToCart }) => {

    const {
        actions: { receiveItemInfoFromServer },
        state: { items, itemsIndex },
        } = useContext(MainContext);
    return (
        <>
        <Wrapper>
            <LeftGrid>
            <HomePageImage src='pexels-ovan-62689.jpg' alt="Home Page Image"/>
            </LeftGrid>
            <RightGrid>
            <h1>OUR CATEGORIES</h1>
            {items != [] &&(
                
                items.map((item)=>{
                    const _itemName = item.name;
                    return(
                        <div key ={item._id}>
                            <img src={item.imageSrc} />
                            <p>{_itemName}</p>
                        </div>
                    )
                })
                )
            }
            </RightGrid>
        </Wrapper>
        </>
    )
/*
const [items, setItems] = useState([]);

useEffect(() => {
    fetch('/api/Data_Items')
    .then((response) => response.json())
    .then((data) => setItems(data.items))
    .catch((error) => console.error('Error fetching items:', error));
}, []);

return (
    <div>
    <h1>Available Items</h1>
    <ul>
        {items.map((item) => (
        <li key={item.id}>
            {item.name} - {item.price}
            <button onClick={() => addToCart(item)}>Add to Cart</button>
        </li>
        ))}
    </ul>
    </div>
);
*/
};


const Wrapper = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap:20px;
margin-top: 30px;
`
const LeftGrid = styled.div`
grid-area: 1 / 1 / 2 / 2;
margin-left: 20px;
`
const RightGrid = styled.div`
grid-area: 1 / 2 / 2 / 3;
text-align: center;
justify-self: center;
h1{
    font-weight: normal;
    border-bottom: 2px solid #ccc;
    width: 100%;
}
`
const HomePageImage = styled.img`
    width: 80%;
    height: auto;
    border-radius: 30px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`
export default Home;


