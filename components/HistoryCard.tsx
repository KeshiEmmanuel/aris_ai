import { getTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface Props {
  task: string;
  content: string;
  id: string;
  created_at?: string;
}

export default function HistoryCard({ task, content, id, created_at }: Props) {
  return (
    <Link href={`/dashboard/${id}`}>
      <h2 className="font-semibold text-lg">{task}....</h2>
      <p className="text-xs text-gray-400">
        {getTimeAgo(created_at as string)}
      </p>
    </Link>
  );
}
