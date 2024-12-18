import { createContext } from "react";

const UserContext = createContext({
  loggedUser : 'Default',
});

export default UserContext;