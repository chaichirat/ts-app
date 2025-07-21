import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { paths } from "../constans/path";
import { SideBar } from "./SideBar";

const settings = ["Profile", "Account", "Logout"];

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const onOpenSideBar = useCallback(() => setOpen(true), []);
  const onCloseSideBar = useCallback(() => setOpen(false), []);

  const onOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);
  const onCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <>
      <nav>
        <Box display="flex" alignItems="center">
          <Box marginLeft="2rem">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onOpenSideBar}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <SideBar onOpen={open} onClose={onCloseSideBar} />
          <div className="nav-logo">
            <a href="https://react.dev" target="_blank">
              <img
                src="https://download.logo.wine/logo/React_(web_framework)/React_(web_framework)-Logo.wine.png"
                alt="React logo"
              />
              <h2>React</h2>
            </a>
          </div>
        </Box>
        <div className="menu">
          <li>
            <Link to={paths.home}>Home</Link>
          </li>
          <li>
            <Link to={paths.product}>Product</Link>
          </li>
          <li>
            <Link to={paths.users}>Users</Link>
          </li>
          <li>
            <Link to={paths.profile}>Profile</Link>
          </li>
        </div>
        <Box marginRight="2rem" marginLeft="8rem">
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Your account.">
              <IconButton onClick={onOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Sunny"
                  src="https://external-preview.redd.it/DV3mZUmp6UPShpkTqx8kFi_7W1HoxzscJ_CdI-Odcsw.jpg?auto=webp&s=f0041b75fe43c288cb5de925bcdf8d0c9e2bfc80"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              onClose={onCloseUserMenu}
            >
              {settings.map((text) => (
                <ListItem key={text} disablePadding onClick={onCloseUserMenu}>
                  <ListItemButton
                    onClick={() => {
                      if (text === "Logout") {
                      }
                    }}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </nav>
    </>
  );
};
