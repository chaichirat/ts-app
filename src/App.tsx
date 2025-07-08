import "./App.css";
import { Router } from "./utills/router";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
};
