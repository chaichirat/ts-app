import { useCallback, useState } from "react";
import { Header } from "../../components/Header";

export const PageProfile = () => {
  const [sideBarOpen, setsideBarOpen] = useState(false);

  const handleOpenSideBar = useCallback(() => {
    setsideBarOpen(true);
  }, []);
  const handleCloseSideBar = useCallback(() => {
    setsideBarOpen(false);
  }, []);
  return (
    <div>
      <Header openSideBar={handleOpenSideBar} />
      <h1>Hello World</h1>
    </div>
  );
};
