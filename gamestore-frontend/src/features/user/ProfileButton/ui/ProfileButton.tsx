import {Avatar, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {enqueueSnackbar} from "notistack";

import {useState} from "react";

import {useNavigate} from "react-router-dom";

import {useSelector} from "react-redux";

import {useStyles} from "./ProfileButton.styles";

import type {MouseEvent} from "react";



import {useLogoutMutation} from "@/entities/authentification/api/authApi";
import {useAppDispatch} from "@/shared/model/hooks";
import {RedirectLink} from "@/shared/ui";


export const ProfileButton = () => {
  const {classes} = useStyles();
  const [logoutMutation] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useSelector((state: RootState) => state.session.data);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = async () => {
    setAnchorElUser(null);
  };
  
  const handleLogout = async () => {
    await logoutMutation().unwrap().then((payload) => {
      enqueueSnackbar(payload?.message, {variant: "success"});
      
    }).finally(() => {
      dispatch({type: "logout"});
      setAnchorElUser(null);
      navigate("/");
    });
  };
  
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
          <Avatar alt="Remy Sharp" style={{borderRadius: "25%", border: "0.5px solid #292929"}}
            src={userData?.avatarURL}/>
        </IconButton>
      </Tooltip>
      <Menu
        className={classes.menu}
        classes={{paper: classes.paper}}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}><RedirectLink redirectTo="/profile">Profile</RedirectLink></MenuItem>
        <MenuItem onClick={handleCloseUserMenu}><RedirectLink redirectTo="/profile">Bucket</RedirectLink></MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};