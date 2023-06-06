import React from 'react';
import '../styles/Navbar.css';
import DescriptionIcon from '@mui/icons-material/Description';

function Navbar(){
    return (
        <div id='navbar'>
            <DescriptionIcon style={{fontSize:'28px'}}/><h2 id='logo'>Prescription Generator</h2>
        </div>
    )
}

export default Navbar;