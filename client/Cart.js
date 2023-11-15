import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
return (
    <div>
    <h1>Shopping Cart</h1>
    <ul>
        {cart.map((cartItem) => (
        <li key={cartItem.id}>
            {cartItem.name} - {cartItem.price}
            <button onClick={() => removeFromCart(cartItem.id)}>Remove from Cart</button>
        </li>
        ))}
    </ul>
    </div>
);
};

export default Cart;
