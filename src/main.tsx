import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonScreen from "./components/PokemonScreen/PokemonScreen.tsx";
import { PokemonProvider } from "./context/PokemonContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:name",
    element: <PokemonScreen />,
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
