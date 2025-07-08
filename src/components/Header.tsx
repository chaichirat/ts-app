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
import { useRouter } from "../utills/router";

type IHeaderProps = {
  openSideBar: () => void;
  label?: string;
};

const settings = ["Profile", "Account", "Logout"];

export const Header = (props: IHeaderProps) => {
  const { openSideBar, label } = props;

  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pathSignIn = useCallback(() => {
    router.push(paths.signIn);
  }, []);

  return (
    <>
      <nav>
        <Box display="flex" alignItems="center">
          <Box marginLeft="2rem">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={openSideBar}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Box>
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
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </div>
        <Box marginRight="2rem" marginLeft="5rem">
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Your account.">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((text) => (
                <ListItem
                  key={text}
                  disablePadding
                  onClick={handleCloseUserMenu}
                >
                  <ListItemButton
                    onClick={() => {
                      if (text === "Logout") {
                        pathSignIn();
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
