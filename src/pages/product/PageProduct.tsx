import { useCallback, useState } from "react";
import { Header } from "../../components/Header";
import { SignIn } from "../../components/SignIn";
import { users } from "../../constans/users";

export const PageProduct = () => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Header />
      <SignIn open={open} onClose={handleClose} />
      <div>
        <h1>Product Page</h1>
        <p>This is the product page content.</p>
      </div>
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <p>
              {user.id}. {user.firstName} {user.lastName} age: {user.age}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
