import "./styles.css";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Sort } from "../../../Icon/Sort";

interface FilterButtonProps {
  handleFilter: (option: number) => void;
}

function FilterButton({ handleFilter }: FilterButtonProps) {
  return (
    <div className="filter">
      <Menu>
        <MenuButton
          as={IconButton}
          data-cy="menu-button"
          aria-label="filter button"
          icon={<Sort boxSize={"1.2rem"} />}
          borderRadius={"2rem"}
          variant={"outline"}
          transition={"0.3s ease"}
          _hover={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 1px 3px 1px #00000033",
          }}
        />
        <MenuList color={"#DC0A2D"} zIndex={2}>
          <MenuItem onClick={() => handleFilter(1)}>Lowest Number</MenuItem>
          <MenuItem onClick={() => handleFilter(2)}>Highest Number</MenuItem>
          <MenuItem onClick={() => handleFilter(3)}>A-Z</MenuItem>
          <MenuItem onClick={() => handleFilter(4)}>Z-A</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default FilterButton;
