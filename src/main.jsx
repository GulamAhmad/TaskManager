import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./App/store.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Details from "./pages/Details/Details.jsx";
import EditForm from "./pages/EditForm/EditForm.jsx";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

const route = createBrowserRouter([
  {
    element: <App />,
    path: "/",
  },
  {
    element: <Details />,
    path: "/details/:taskid",
  },
  {
    element: <EditForm />,
    path: "/edit/:tid",
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={route} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
