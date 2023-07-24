import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = {
  position: toast.POSITION.TOP_RIGHT,
  timeout: 2000,
  hideProgressBar: true,

};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer template={toast} {...options} />
      <App />
    </Provider>
  </React.StrictMode>
);
