import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Typography } from '@mui/material';
import { Store } from '../utiles/Store';
import jsCookie from 'js-cookie';

export default function BasicMenu({ text }) {
  const { dispatch } = useContext(Store);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    dispatch({ type: 'USER_LOGOUT' });
    jsCookie.remove('userInfo')
    jsCookie.remove('cartItems')
    jsCookie.remove('shipping')
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' ,flexDirection:'column' , justifyContent :'center' }}>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar />
      </Button>
      <Typography>{text} </Typography>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
