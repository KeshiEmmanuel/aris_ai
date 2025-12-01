"use client";

import { BiSolidZap } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoIosAttach, IoIosDocument, IoIosRocket } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa6";
import { FaBinoculars, FaCode, FaMicrophone } from "react-icons/fa";
import { TiFlowParallel } from "react-icons/ti";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import generateContent from "@/lib/context/ai";
import { toast } from "sonner";
import { createContent } from "@/utils/actions/content.action";

type Props = {
  isAuthenticated: boolean;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  mode: { value: string; text: string };
  setMode: React.Dispatch<
    React.SetStateAction<{ value: string; text: string }>
  >;
  setGeneratedContent?: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentId?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
};

const TextArea = ({
  isAuthenticated,
  setDescription,
  description,
  mode,
  setMode,
  setGeneratedContent,
  setIsLoading,
  isLoading,
  setCurrentId,
}: Props) => {
  const modes = [
    {
      value: "email_writer",
      text: "Email writer",
      icon: <MdEmail className="mr-1" />,
    },
    {
      value: "blog_writer",
      text: "Blog post writer",
      icon: <IoShareSocialOutline className="mr-1" />,
    },
    {
      value: "landing_page_writer",
      text: "Landing page writer",
      icon: <IoIosRocket className="mr-1" />,
    },
    {
      value: "product_update_writer",
      text: "Product update writer",
      icon: <IoIosDocument className="mr-1" />,
    },
  ];

  async function handleGenerate() {
    if (!description || !mode.value) {
      toast.error("Please provide description and select a mode");
      return;
    }

    setIsLoading?.(true);
    try {
      // ✅ Fixed parameter order: description first, then mode
      const data = await generateContent(description, mode.value);

      if (data?.success) {
        console.log("Generated text:", data.text);
        setGeneratedContent?.(data.text);
        // Handle the generated content here
        const dataFromDB = await createContent(
          data.text,
          mode.value,
          description,
        );
        setCurrentId?.(dataFromDB.id);
        setDescription("");
      } else {
        console.error("Error:", data.finishReason);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading?.(false);
      setDescription("");
    }
  }

  return (
    <section>
      <div
        className={`relative textbox px-1 pb-8 ${isLoading && "animate-pulse"}`}
      >
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="pl-10 h-[110px] w-full resize-none border-none outline-none px-2 pt-8"
          placeholder="Ask Zendt to write a blog post about..."
        />
        <div className="flex items-center justify-between pl-10 pr-4 pb-2">
          <div className="relative flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <motion.div
                  initial={false}
                  animate={{
                    width: mode.text ? "auto" : "2rem",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`flex items-center gap-1 overflow-hidden ${
                    mode.text
                      ? ` ${!isAuthenticated ? "text-orange-400 bg-black" : "text-black bg-orange-400"} text-sm py-0.5 px-3 rounded-full`
                      : "bg-transparent"
                  }`}
                >
                  <BiSolidZap
                    className={`${!isAuthenticated ? "text-orange-400 bg-black" : "text-black bg-orange-400"} w-5 p-1 h-5 rounded-full shrink-0`}
                  />
                  <AnimatePresence mode="wait">
                    {mode.text && (
                      <motion.span
                        key={mode.text}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        {mode.text}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background text-foreground font-sans">
                {modes.map((NewMode) => (
                  <DropdownMenuItem
                    onSelect={() =>
                      setMode({
                        value: NewMode.value,
                        text: NewMode.text,
                      })
                    }
                    key={NewMode.value}
                  >
                    {NewMode.icon} {NewMode.text}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <IoIosAttach className="text-gray-500" />
          </div>
          {isAuthenticated ? (
            <button
              onClick={() => handleGenerate()}
              className="bg-foreground text-black p-1 rounded-full"
            >
              <FaArrowUp />
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-foreground text-black p-1 rounded-full"
            >
              <FaArrowUp />
            </Link>
          )}
        </div>
      </div>

      {!isAuthenticated && (
        <div className="mt-5 flex w-full text-black gap-2 justify-center text-[12px]">
          <button className="bg-orange-300 border border-black/20  flex items-center gap-1 py-1 px-3 rounded-2xl">
            <FaBinoculars />
            Write a landing page
          </button>
          <button className="bg-orange-300 border border-black/20 flex items-center gap-1 py-1 px-3 rounded-2xl">
            <TiFlowParallel />
            Create a product update blog
          </button>
          <button className="bg-orange-300 border border-black/20 flex items-center gap-1 py-1 px-3 rounded-2xl">
            <FaCode />
            Monthly changelog blog post
          </button>
          <button className="bg-orange-300 border border-black/20 flex items-center gap-1 py-1 px-3 rounded-2xl">
            <FaMicrophone />
            Trial user nurture sequence
          </button>
        </div>
      )}
    </section>
  );
};

export default TextArea;
