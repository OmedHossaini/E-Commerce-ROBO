import {useContext, React} from 'react';
import { MainContext } from './MainContext';
import { Link } from 'react-router-dom';

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
    <Link to="/confirmation">
        <button>Proceed to Confirmation</button>
    </Link>
    </div>
);
};

export default Cart;
