import "./styles.css";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Search } from "../../Icon/Search";
import { Sort } from "../../Icon/Sort";

function searchBar() {
  return (
    <div className="search-bar">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search boxSize={"1.2rem"} />
        </InputLeftElement>
        <Input type="tel" placeholder="Search" />
      </InputGroup>
      <div className="filter">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Sort boxSize={"1.2rem"} />}
            borderRadius={"2rem"}
            variant={"outline"}
          />
          <MenuList color={"#DC0A2D"} zIndex={2}>
            <MenuItem>Lowest Number</MenuItem>
            <MenuItem>Highest Number</MenuItem>
            <MenuItem>A-Z</MenuItem>
            <MenuItem>Z-A</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default searchBar;
