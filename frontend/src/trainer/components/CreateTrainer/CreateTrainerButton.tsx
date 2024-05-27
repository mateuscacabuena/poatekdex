import { Button, Input, useDisclosure } from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTrainerContext } from "../../../hooks/useTrainerContext";

function CreateTrainerButton() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createTrainer, trainerList } = useTrainerContext();

  function addTrainer() {
    const id = trainerList.length;

    const newTrainer = {
      id: id + 1,
      name: name,
      imageUrl: imageUrl,
      pokemons: [],
    };

    try {
      const response = createTrainer(newTrainer);
      onClose();
      return response;
    } catch (error) {
      console.error("Trainer request error: ", error);
    }
  }

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button color={"#DC0A2D"} leftIcon={<AddIcon />} mt={10}>
          Create Trainer
        </Button>
      </PopoverTrigger>
      <PopoverContent color="#DC0A2D">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Fill the form below</PopoverHeader>
        <PopoverBody>
          <Input
            name="name"
            data-cy="name"
            placeholder="Trainer Name"
            my={1}
            borderColor={"#DC0A2D"}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="imageUrl"
            data-cy="imageUrl"
            placeholder="Trainer Image URL"
            my={1}
            borderColor={"#DC0A2D"}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </PopoverBody>
        <PopoverFooter display={"flex"} justifyContent={"flex-end"}>
          <Button
            type="submit"
            data-cy="submit"
            colorScheme="red"
            color={"white"}
            leftIcon={<CheckIcon />}
            onClick={() => addTrainer()}
          >
            Create
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default CreateTrainerButton;
