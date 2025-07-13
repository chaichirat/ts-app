import { useCallback, useState } from "react";
import { Header } from "../../components/Header";
import { FormProfile } from "./components/FormProfile";

export const PageProfile = () => {
  const [sideBarOpen, setsideBarOpen] = useState(false);

  const handleOpenSideBar = useCallback(() => {
    setsideBarOpen(true);
  }, []);
  const handleCloseSideBar = useCallback(() => {
    setsideBarOpen(false);
  }, []);

  // const onSubmit = useCallback((values: IProfileType) => {
  //   console.log("Form submitted with values:", values);
  // }, []);

  return (
    <>
      <Header openSideBar={handleOpenSideBar} />
      <FormProfile />
    </>
  );
};
