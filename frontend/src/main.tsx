import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { PokemonProvider } from "./context/PokemonContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </ChakraProvider>
  </React.StrictMode>
);