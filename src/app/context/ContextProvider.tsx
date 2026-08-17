import React, { ReactNode, useState } from "react";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Member data is no longer persisted to localStorage; auth relies on the
  // accessToken cookie, and authMember is only sourced in-memory from the
  // login/signup response. On a page refresh authMember starts as null
  // until the user logs in again, even if the accessToken cookie is valid.
  const [authMember, setAuthMember] = useState<Member | null>(null);

  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
