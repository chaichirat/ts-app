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
  action: "view" | "edit" | "delete";
  user: IUsers | undefined;
  onUpdateUser: (user: IUsers) => void;
};

export const ModalUser = (props: IModalUserProps) => {
  const { onOpen, onClose, action, user, onUpdateUser } = props;

  const [image, setImage] = useState(user?.image);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);

  const onSubmit = useCallback(() => {
    const updatedUser = {
      id: user?.id,
      image: image,
      firstName: firstName,
      lastName: lastName,
      age: age,
    };

    onUpdateUser(updatedUser);
    onClose();
  }, [firstName, lastName, age]);

  const onChangeFirstName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFirstName(e.target.value),
    [firstName]
  );
  const onChangeLastName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setLastName(e.target.value),
    [lastName]
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
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
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
                value={firstName}
                onChange={onChangeFirstName}
                disabled={isDisable}
              />
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              <TextField
                sx={{ width: "100%" }}
                id="standard-basic"
                label="Last name."
                variant="outlined"
                value={lastName}
                onChange={onChangeLastName}
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
            {action === "edit" && (
              <Button variant="contained" type="submit" onClick={onSubmit}>
                Submit
              </Button>
            )}
            {action === "delete" && (
              <Button variant="contained" color="error" onClick={onClose}>
                Delete
              </Button>
            )}
          </Box>
        </Card>
      </Modal>
    </>
  );
};
