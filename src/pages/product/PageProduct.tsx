import { useCallback, useState } from "react";
import { Header } from "../../components/Header";
import { SignIn } from "../../components/SignIn";
import { SideBar } from "../../components/SideBar";

export const PageProduct = () => {
  const [open, setOpen] = useState(false);
  const [sideBarOpen, setsideBarOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenSideBar = useCallback(() => {
    setsideBarOpen(true);
  }, []);
  const handleCloseSideBar = useCallback(() => {
    setsideBarOpen(false);
  }, []);

  return (
    <>
      <Header openSideBar={handleOpenSideBar} />
      <SignIn open={open} onClose={handleClose} />
      <SideBar onOpen={sideBarOpen} onClose={handleCloseSideBar} />
      <div>
        <h1>Product Page</h1>
        <p>This is the product page content.</p>
      </div>
    </>
  );
};
