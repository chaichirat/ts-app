import { Header } from "../../components/Header";
import { users } from "../../constans/users";

export const PageProduct = () => {
  return (
    <>
      <Header />
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
