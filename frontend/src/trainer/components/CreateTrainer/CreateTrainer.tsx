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
import TrainerAPI from "../../../services/trainerAPI";

function CreateTrainer() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function createTrainer() {
    const id = await TrainerAPI.getTrainerList().then(
      (trainers) => trainers.length
    );

    const newTrainer = {
      id: id + 1,
      name: name,
      imageUrl: imageUrl,
      pokemons: [],
    };

    try {
      const response = await TrainerAPI.createTrainer(newTrainer);
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
            placeholder="Trainer Name"
            my={1}
            borderColor={"#DC0A2D"}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Trainer Image URL"
            my={1}
            borderColor={"#DC0A2D"}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </PopoverBody>
        <PopoverFooter display={"flex"} justifyContent={"flex-end"}>
          <Button
            colorScheme="red"
            color={"white"}
            leftIcon={<CheckIcon />}
            onClick={() => createTrainer()}
          >
            Create
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default CreateTrainer;