import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import HistoryRow from "./HistoryCard";
import { getAllUserContent } from "@/utils/actions/content.action";

export default function DashboardRecentLog({
  recentDrafts,
}: {
  recentDrafts: any[];
}) {
  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-500" />
          RECENT LOGS
        </h2>

        <Link href="/history">
          <Button
            variant="ghost"
            size="sm"
            className="group font-mono text-xs text-neutral-500 hover:text-white hover:bg-neutral-900"
          >
            VIEW_ALL_LOGS
            <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* THE LIST */}
      {/* We reuse HistoryRow here to handle the logic automatically */}
      <div className="border border-neutral-800 bg-black divide-y divide-neutral-800">
        {recentDrafts.map((draft) => (
          <div
            key={draft.id}
            className="hover:bg-neutral-900/40 transition-colors duration-200"
          >
            <HistoryRow
              id={draft.id}
              mode={draft.mode}
              input_context={draft.input_context}
              created_at={draft.created_at}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
