import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PokemonProvider } from "./pokedex/context/PokemonContext.tsx";
import Pokedex from "./pokedex/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokedex",
    element: <Pokedex />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <PokemonProvider>
        <RouterProvider router={router} />
      </PokemonProvider>
    </ChakraProvider>
  </React.StrictMode>
);