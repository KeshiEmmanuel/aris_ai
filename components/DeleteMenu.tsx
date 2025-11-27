"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { HiDotsHorizontal } from "react-icons/hi";

interface Props {
  id: string;
  handleDelete: (id: string) => void;
}
const DeleteMenu = ({ handleDelete, id }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <HiDotsHorizontal size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-sans">
        <DropdownMenuItem onClick={() => handleDelete(id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteMenu;
