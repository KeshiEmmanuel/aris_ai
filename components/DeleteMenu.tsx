// 3. DeleteMenu.tsx
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";

interface Props {
  id: string;
  handleDelete: (id: string) => void;
}

const DeleteMenu = ({ handleDelete, id }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>

      {/* SHADCN OVERRIDES for Dark Mode Style */}
      <DropdownMenuContent
        className="w-32 bg-black border border-neutral-800 p-1 rounded-none shadow-xl"
        align="end"
      >
        <DropdownMenuItem
          onClick={() => handleDelete(id)}
          className="group flex items-center gap-2 cursor-pointer text-xs font-mono text-red-500 focus:bg-red-950/30 focus:text-red-400 rounded-none py-2"
        >
          <Trash2 size={12} className="group-hover:animate-pulse" />
          DELETE_LOG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteMenu;
