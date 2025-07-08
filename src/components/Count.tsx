import { Box, Button, Card } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export const Count = () => {
  const [count, setCount] = useState(0);

  const countAdd = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const countDecrease = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  const countColor = () => {
    return (
      <h1
        style={{
          color: count >= 5 ? "green" : count < 0 ? "red" : "black",
          margin: 0,
          fontSize: "100px",
        }}
      >
        {count}
      </h1>
    );
  };

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <>
      <Card
        sx={{
          boxSizing: "border-box",
          borderRadius: "1rem",
        }}
      >
        <Box display="flex" flexDirection="column" margin="16px">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
            width="300px"
          >
            {countColor()}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            height="60px"
          >
            <Button
              sx={{ borderRadius: "50%", fontSize: "24px" }}
              variant="contained"
              onClick={countDecrease}
            >
              -
            </Button>
            <Button
              sx={{ borderRadius: "50%", fontSize: "24px" }}
              variant="contained"
              onClick={countAdd}
            >
              +
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};
