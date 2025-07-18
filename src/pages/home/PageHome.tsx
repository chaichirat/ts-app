import { Box, Button, Card } from "@mui/material";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { SignIn } from "../../components/SignIn";
import { Count } from "../../components/Count";
import { useCallback, useEffect, useState } from "react";

type IScoreProps = {
  label: string;
};

export const Score = (props: IScoreProps) => {
  const { label } = props;

  return (
    <h1
      style={{
        color:
          Number(label) >= 5 ? "green" : Number(label) < 0 ? "red" : "black",
      }}
    >
      {label}
    </h1>
  );
};

export const CardBox = () => {
  const [count, setCount] = useState(0);

  const onAddCount = (): void => {
    setCount((prev) => prev + 1);
  };

  const onDecreaseCount = (): void => {
    setCount((prev) => prev - 1);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: 300,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex">
        <Score label={count.toString()} />
      </Box>
      <Box display="flex" justifyContent="end" margin="16px">
        <Box display="flex" justifyContent="end" alignItems="end" gap="8px">
          <Button variant="contained" color="error" onClick={onDecreaseCount}>
            -
          </Button>
          <Button variant="contained" color="success" onClick={onAddCount}>
            +
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

const ResizeComponent = () => {
  useEffect(() => {
    const handleResize = () => {
      console.log("✅ Window resized");
    };

    window.addEventListener("resize", handleResize);
    console.log("🟢 Component mounted");

    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("🔴 Component unmounted");
    };
  }, []);

  return <p>Resize the window and check the console!</p>;
};

export const PageHome = () => {
  const [open, setOpen] = useState(false);

  const [show, setShow] = useState(true);
  const [sideBarOpen, setsideBarOpen] = useState(false);

  const handleOpenSideBar = useCallback(() => {
    setsideBarOpen(true);
  }, []);
  const handleCloseSideBar = useCallback(() => {
    setsideBarOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Header openSideBar={handleOpenSideBar} />
      <SignIn open={open} onClose={handleClose} />
      <SideBar onOpen={sideBarOpen} onClose={handleCloseSideBar} />
      <h1>Welcome to React.ts Sunny!</h1>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Count />
      </Box>
      <Box margin="24px">
        <button
          onClick={() => setShow(!show)}
          style={{ color: "white", backgroundColor: show ? "green" : "red" }}
        >
          Toggle ResizeComponent
        </button>
        {show ? <ResizeComponent /> : <p>Nothing to show</p>}
      </Box>
    </>
  );
};
