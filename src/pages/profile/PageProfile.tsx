import { Header } from "../../components/Header";
import { FormProfile } from "./components/FormProfile";

export const PageProfile = () => {
  // const onSubmit = useCallback((values: IProfileType) => {
  //   console.log("Form submitted with values:", values);
  // }, []);

  return (
    <>
      <Header />
      <FormProfile />
    </>
  );
};
