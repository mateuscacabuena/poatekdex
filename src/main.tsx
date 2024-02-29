import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import PokemonDetails from "./components/PokemonDetails/PokemonDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/:name", //futuramente, colocar o nome do pokemon
  //   element: <PokemonDetails />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
