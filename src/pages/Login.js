// import styled from "styled-components";
import { useContext, useState } from "react";
import SessionContext from "../context/SessionContext";
import basma from "../components/assets/basma_logo.png";
import "./Login.css";

const Login = () => {
  const {
    actions: { login },
  } = useContext(SessionContext);

  const [state, setValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  function setState(nextState) {
    setValue((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setState({ [name]: value });
  }

  async function handleSubmit(e) {
    e.nativeEvent.preventDefault();
    login(email, password);
  }

  return (
    <div>
      <section>
        <div className="container">
          <div className="user signinBx">
            <div className="imgBx">
              <img src={basma} alt="" />
            </div>
            <div className="formBx">
              <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <a href="/">
                  <input type="submit" name="" value="Login" />
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
