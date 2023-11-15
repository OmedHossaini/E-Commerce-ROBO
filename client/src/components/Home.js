import React, { useState, useEffect } from 'react';

const Home = ({ addToCart }) => {
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
};

export default Home;
