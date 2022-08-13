import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AuthForm from "../Components/Auth/authForm";
const Auth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);
  if (isLoading) {
    return <p className="loader">Loading...</p>;
  }

  return (
    <>
      <AuthForm />
    </>
  );
};

export default Auth;
