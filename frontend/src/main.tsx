import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PokemonProvider } from "./context/PokemonContext.tsx";
import { TrainerProvider } from "./context/TrainerContext.tsx";
import Pokedex from "./pokedex/Pokedex.tsx";

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
        <TrainerProvider>
          <RouterProvider router={router} />
        </TrainerProvider>
      </PokemonProvider>
    </ChakraProvider>
  </React.StrictMode>
);
