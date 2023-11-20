import {useContext, React} from 'react';
import { MainContext } from './MainContext';

const Cart = () => {

    const {
        actions: { requestCart, addToCart, removeFromCart },
        state: { cart },
       } = useContext(MainContext);

return (
    <div>
    <h1>Shopping Cart</h1>
    <ul>
        {cart.map((cartItem,index) => (
        <li key={cartItem._id}>
            {cartItem.name} - {cartItem.price}
            <button onClick={() => removeFromCart(cartItem._id)}>Remove from Cart</button>
        </li>
        ))}
    </ul>
    </div>
);
};

export default Cart;
