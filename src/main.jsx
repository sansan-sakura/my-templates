import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />,
//     errorElement: <PageNotFound />,
//     children: [
//       { path: "/home", element: <Home />, errorElement: <PageNotFound /> },
//       {
//         path: "movies/:movieTitle",
//         element: <MovieDetail />,
//         errorElement: <PageNotFound />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <MovieProvider>
//       <RouterProvider router={router} />
//     </MovieProvider>
//   </React.StrictMode>
// );
