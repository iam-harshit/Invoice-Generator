import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Invoice from "./components/Invoice";
import InvoiceFormWrapper from "./utils/useNavigate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <div className="App d-flex flex-column align-items-center justify-content-center w-100 h-screen">
          <Container>
            <Outlet />
            <ToastContainer />
          </Container>
        </div>
      </Provider>
    );
  }
}

export const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Invoice />,
      },
      {
        path: "/invoice-form",
        element: <InvoiceFormWrapper />,
      },
    ],
  },
]);
export default App;
