import React, { ReactNode, useEffect, useState } from "react";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";
import MemberService from "../services/MemberService";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Member data is no longer persisted to localStorage; auth relies on the
  // accessToken cookie. On mount we re-derive authMember from the
  // /member/detail endpoint (valid as long as the cookie is valid), so a
  // page refresh doesn't log the user out.
  const [authMember, setAuthMember] = useState<Member | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  useEffect(() => {
    const memberService = new MemberService();
    memberService
      .getMemberDetail()
      .then((member) => {
        if (member) setAuthMember(member);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, authLoading, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
