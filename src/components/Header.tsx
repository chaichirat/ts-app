import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { paths } from "../constans/path";
import { SideBar } from "./SideBar";
import { useTranslation } from "react-i18next";
import { useRouter } from "../utills/router";

const settings = ["Profile", "Account", "Logout"];

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { i18n } = useTranslation();
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  const [open, setOpen] = useState(false);

  const onOpenSideBar = useCallback(() => setOpen(true), []);
  const onCloseSideBar = useCallback(() => setOpen(false), []);

  const onOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);
  const onCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  // const onChangeLanguage = useCallback(() => {
  //   const newLang = language === "en" ? "th" : "en";
  //   i18n.changeLanguage(newLang);
  //   setLanguage(newLang);
  // }, [language, i18n]);

  const onChangeLng = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
      setLanguage(lng);
    },
    [i18n]
  );

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
          <li>
            <Link to={paths.profile2}>Profile2</Link>
          </li>
          <li>
            <Link to={paths.profile3}>Profile3</Link>
          </li>
          <li>
            <Link to={paths.profile4}>Profile4</Link>
          </li>
          <li>
            <Link to={paths.profile5}>Profile5</Link>
          </li>
          <li>
            <Link to={paths.profile6}>Profile6</Link>
          </li>
          <li>
            <Link to={paths.profile7}>Profile7</Link>
          </li>
          <li>
            <Link to={paths.profile8}>Profile8</Link>
          </li>
          <li>
            <Link to={paths.profile9}>Profile9</Link>
          </li>
          <li>
            <Link to={paths.profile10}>Profile10</Link>
          </li>
          <li>
            <Link to={paths.profile11}>Profile11</Link>
          </li>
        </div>

        <Box
          display="flex"
          alignItems="center"
          gap="2rem"
          marginLeft="1rem"
          marginRight="2rem"
        >
          <Box display="flex" gap="8px">
            {/* <Typography
              onClick={onChangeLanguage}
              variant="button"
              sx={{
                cursor: "pointer",
                willchange: "filter",
                transition: "filter 300ms",
                "&:hover": { filter: "drop-shadow(0 0 0.6em #ffffffd0)" },
              }}
            >
              {language === "en" ? "th" : "en"}
            </Typography> */}
            <Typography
              onClick={() => onChangeLng("th")}
              variant="button"
              sx={{
                cursor: "pointer",
                willchange: "filter",
                transition: "filter 300ms",
                "&:hover": {
                  filter: "drop-shadow(0 0 0.6em #ffffffd0)",
                  color: "aqua",
                },
                color: language === "th" ? "aqua" : "",
              }}
            >
              th
            </Typography>
            <Typography variant="button">|</Typography>
            <Typography
              onClick={() => onChangeLng("en")}
              variant="button"
              sx={{
                cursor: "pointer",
                willchange: "filter",
                transition: "filter 300ms",
                "&:hover": {
                  filter: "drop-shadow(0 0 0.6em #ffffffd0)",
                  color: "aqua",
                },
                color: language === "en" ? "aqua" : "",
              }}
            >
              en
            </Typography>
          </Box>

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
                        router.push(paths.signIn);
                      }
                      if (text === "Profile") {
                        router.push(paths.profile);
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
