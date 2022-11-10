import React from 'react';
import {Link} from "react-router-dom";

const CustomLink = ({children, to, className}) => {
    return (
        <Link to={to} className={`text-white underline ml-auto py-2 ${className}`}>
            {children}
        </Link>
    );
};

export default CustomLink;