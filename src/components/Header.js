import React from 'react';
import { Typography } from "@mui/material";
import "./Convertor.css";

const Header = () => {
    return (
        <header>
            <Typography variant="h5" className="header"><b>Currency Convertor</b></Typography>
                <span>Check live rates, set rate alerts, receive notifications and more</span>
        </header>
    )
}

export default Header