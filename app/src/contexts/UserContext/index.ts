import React from "react";

const UserContext = React.createContext<{ id: string; name: string }>({
  id: "",
  name: "",
});

export { UserContext };
