import "./App.css";
import Routes from "./components/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default withRouter(App);
