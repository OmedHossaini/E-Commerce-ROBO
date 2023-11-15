import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartSize }) => {
return (
    <nav>
    <Link to="/">Home</Link>
    <Link to="/cart">Cart ({cartSize})</Link>
    </nav>
);
};

export default Navbar;
