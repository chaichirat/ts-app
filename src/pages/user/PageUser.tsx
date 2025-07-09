import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { useCallback, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { users, type IUsers } from "../../constans/users";
import { ModalUser } from "../../components/ModalUser";

export const PageUser = () => {
  const [sideBarOpen, setsideBarOpen] = useState(false);
  const [action, setAction] = useState<"view" | "edit" | "delete">("view");
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<IUsers>();
  const [userList, setUserList] = useState(users);

  const onClickEdit = useCallback((user: IUsers) => {
    setAction("edit");
    setVisible(true);
    setUser(user);
  }, []);

  const onClickView = useCallback((user: IUsers) => {
    setAction("view");
    setVisible(true);
    setUser(user);
  }, []);

  const onClickDelete = useCallback((user: IUsers) => {
    setAction("delete");
    setVisible(true);
    setUser(user);
  }, []);

  const handleClose = useCallback(() => setVisible(false), []);

  const handleOpenSideBar = useCallback(() => setsideBarOpen(true), []);
  const handleCloseSideBar = useCallback(() => setsideBarOpen(false), []);

  const onUpdateUser = useCallback((updatedUser: IUsers) => {
    const newUserValue = userList.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser;
      } else {
        return user;
      }
    });

    setUserList(newUserValue);
  }, []);

  console.log("Hello Worlddd");

  return (
    <>
      <Header openSideBar={handleOpenSideBar} />
      <SideBar onOpen={sideBarOpen} onClose={handleCloseSideBar} />
      <h1>Users table</h1>
      <ModalUser
        onOpen={visible}
        onClose={handleClose}
        action={action}
        user={user}
        onUpdateUser={onUpdateUser}
      />
      <TableContainer
        sx={{
          width: "1100px",
          borderRadius: "1rem",
          backgroundColor: "rgba(230, 230, 230, 0.57)",
          backdropFilter: "blur(2.5rem)",
          boxShadow: "0px 15px 30px rgba(98, 190, 255, 0.47)",
        }}
      >
        <Table>
          <colgroup>
            <col style={{ width: "60px" }} />
            <col style={{ width: "100px" }} />
            <col style={{ width: "100px" }} />
            <col style={{ width: "80px" }} />
            <col style={{ width: "80px" }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <b>No.</b>
              </TableCell>
              <TableCell align="left">
                <b>First Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Last Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Age</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  ":nth-child(odd)": {
                    backgroundColor: "rgba(245, 245, 245, 0.27)",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="left">
                  <Box
                    display="flex"
                    flexDirection="row"
                    gap="1rem"
                    alignItems="center"
                  >
                    <Tooltip title={user.firstName} placement="left">
                      <Avatar alt={user.firstName} src={user.image} />
                    </Tooltip>
                    {user.firstName}
                  </Box>
                </TableCell>
                <TableCell align="left">{user.lastName}</TableCell>
                <TableCell align="left">{user.age}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton onClick={onClickView.bind(null, user)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={onClickEdit.bind(null, user)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => onClickDelete(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
