import React, { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { toast } from "react-toastify";

export default function SessionProvider({ children }) {
  const [session, setSession] = useState({
    user: { access_token: localStorage.getItem("access_token") },
  });

  function updateSession(nextSession) {
    let value =
      typeof nextSession === "function"
        ? nextSession
        : (prevSession) => ({ ...prevSession, ...nextSession });
    setSession(value);
  }

  useEffect(() => {
    let admin_id = localStorage.getItem("admin_id");
    let access_token = localStorage.getItem("access_token");
    let user = { admin_id, access_token };
    updateSession({ user });
  }, []);

  async function login(email, password) {
    const body = new FormData();
    body.append("email", email);
    body.append("password", password);
    const response = await fetch("https://powerful-retreat-11092.herokuapp.com/api/admins/login", {
      method: "POST",
      body,
    });
    const result = await response.json();
    console.log(result);

    if (result.error) {
      toast.error("Incorrect Email or Password!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const { access_token, admin_id } = result;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("admin_id", admin_id);
      const user = { access_token, admin_id };
      updateSession({ user });
      toast.dark(`Welcome ${admin_id}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_id");
    const user = { access_token: null, admin_id: null };
    updateSession({ user });
    toast.dark("Goodbye!!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const context = {
    session,
    actions: { login, logout },
  };
  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}
