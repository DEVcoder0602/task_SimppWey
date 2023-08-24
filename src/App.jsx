import "./App.css";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import OriginalData from "./components/listing/OriginalData";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Listing from "./components/listing/Listing";
import ServerDetails from "./components/data/ServerDetails";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <OriginalData />,
        },
        {
          path: "/listing",
          element: <Listing />,
        },
        {
          path: "/server/:name",
          element: <ServerDetails />,
        },
      ],
    },
  ]);

  return (
    <>
      <div className="app-container">
        <h1 className="text-center text-2xl my-4">
          Hi I am Priyansh Sharma <WavingHandIcon fontSize="large" />
        </h1>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
