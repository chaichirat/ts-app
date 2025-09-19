import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { type IUsers } from "../constans/users";
import { useCallback, useEffect, useMemo, useState } from "react";

type IModalUserProps = {
  onOpen: boolean;
  onClose: () => void;
  action: "create" | "view" | "edit" | "delete";
  user?: IUsers;
  onCreateUser: (user: IUsers) => void;
  onUpdateUser: (user: IUsers) => void;
  onDeleteUser: (user: IUsers) => void;
};

export const ModalUser = (props: IModalUserProps) => {
  const {
    onOpen,
    onClose,
    action,
    user,
    onCreateUser,
    onUpdateUser,
    onDeleteUser,
  } = props;

  const [image, setImage] = useState(user?.image);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [name, setName] = useState(user?.name);
  const [age, setAge] = useState(user?.age);

  const onCreate = useCallback(() => {
    const createUser: IUsers = {
      id: Date.now(),
      image,
      name,
      age,
    };

    onCreateUser(createUser);
    onClose();
  }, [name, age]);

  const onSubmit = useCallback(() => {
    const updatedUser = {
      ...user,
      image,
      name,
      age,
    };

    onUpdateUser(updatedUser);
    onClose();
  }, [name, age]);

  const onDelete = useCallback(() => {
    const deleteUser = {
      ...user,
      image,
      name,
      age,
    };
    onDeleteUser(deleteUser);
    onClose();
  }, [name, age]);

  const onChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setName(e.target.value),
    [name]
  );

  const onChangeAge = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setAge(e.target.value),
    [age]
  );

  const isDisable = useMemo(() => {
    return action === "view" || action === "delete";
  }, [action]);

  useEffect(() => {
    setImage(user?.image);
    setName(user?.name);
    setAge(user?.age);
  }, [user, onOpen]);

  return (
    <>
      <Modal open={onOpen} onClose={onClose}>
        <Card
          sx={{
            width: 300,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "1rem",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            margin="1rem"
          >
            <Avatar src={image} sx={{ width: 100, height: 100 }} />
          </Box>
          <CardContent sx={{ textAlign: "left" }}>
            <Typography gutterBottom variant="h6" component="div">
              <TextField
                sx={{ width: "100%" }}
                id="standard-basic"
                label="First name."
                variant="outlined"
                value={name}
                onChange={onChangeName}
                disabled={isDisable}
              />
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              <TextField
                sx={{ width: "100%" }}
                id="standard-basic"
                label="Age."
                variant="outlined"
                value={age}
                onChange={onChangeAge}
                disabled={isDisable}
              />
            </Typography>
          </CardContent>
          <Box display="flex" justifyContent="space-between" margin="0px 16px">
            <Button variant="text" onClick={onClose}>
              Cancle
            </Button>
            {action === "create" && (
              <Button
                variant="contained"
                type="submit"
                color="success"
                onClick={onCreate}
              >
                Create
              </Button>
            )}
            {action === "edit" && (
              <Button variant="contained" type="submit" onClick={onSubmit}>
                Submit
              </Button>
            )}
            {action === "delete" && (
              <Button variant="contained" color="error" onClick={onDelete}>
                Delete
              </Button>
            )}
          </Box>
        </Card>
      </Modal>
    </>
  );
};
