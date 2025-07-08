import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import { useCallback, useState } from "react";
import { paths } from "../constans/path";
import { useRouter } from "../utills/router";

type ISideBarProps = {
  onOpen: boolean;
  onClose: () => void;
};

export const SideBar = (props: ISideBarProps) => {
  const { onOpen, onClose } = props;

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const pathHome = useCallback(() => {
    router.push(paths.home);
  }, []);

  const pathUsers = useCallback(() => {
    router.push(paths.users);
  }, []);

  const pathProduct = useCallback(() => {
    router.push(paths.product);
  }, []);

  const DrawerList = (
    <Box
      sx={{ width: 250, height: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {["Home", "Users", "Product"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={
                index === 0 ? pathHome : index === 1 ? pathUsers : pathProduct
              }
            >
              <ListItemIcon>
                {index === 0 ? (
                  <HomeIcon />
                ) : index === 1 ? (
                  <PersonIcon />
                ) : (
                  <CategoryIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer open={onOpen} onClose={onClose}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
