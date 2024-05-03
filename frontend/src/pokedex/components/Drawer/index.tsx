import { useNavigate } from "react-router-dom";
import "./styles.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  MenuList,
  MenuItem,
  Menu,
} from "@chakra-ui/react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function TrainerDrawer({ isOpen, onClose }: DrawerProps) {
  const navigate = useNavigate();
  function handleLogout() {
    onClose();
    navigate("/")
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>*trainer* Pokedex</DrawerHeader>

        <DrawerBody p={0}>
          <ul className="drawer-list">
            <li onClick={() => handleLogout()}>Sair</li>
          </ul>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default TrainerDrawer;