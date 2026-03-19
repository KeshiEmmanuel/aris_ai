import DeleteMenu from "@/components/DeleteMenu";
import HistoryRow from "@/components/editor/HistoryCard";
import {
  getAllUserContent,
  deleteContent,
} from "@/utils/actions/content.action";
import { Terminal, ChevronRight, Archive } from "lucide-react";
type props = {
  id: string;
  mode: string;
  input_context: string;
  created_at: string;
};

const ContentHistory = async () => {
  const userContent = await getAllUserContent();

  return (
    <main className="max-w-6xl mx-auto mt-20 px-6 font-sans text-white pb-20">
      {/* HEADER: ZENDT ARCHIVE STYLE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-neutral-800 pb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3">
            <Terminal size={12} />
            <span>Sys_Admin</span>
            <ChevronRight size={10} />
            <span className="text-indigo-500">Generation_Log</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
            CONTENT ARCHIVE
          </h1>
        </div>

        {/* Record Counter */}
        <div className="flex items-center gap-3 px-4 py-2 bg-neutral-950 border border-neutral-800">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wide">
            {userContent.length} Valid Records
          </span>
        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="hidden md:grid grid-cols-[2fr_1fr_150px_50px] gap-6 px-5 pb-3 text-[10px] font-mono uppercase tracking-widest text-neutral-600 select-none">
        <span>Primary_Identifier</span>
        <span className="pl-4 border-l border-transparent">Context_Vector</span>
        <span className="text-right">Timestamp</span>
        <span className="text-right">Cmd</span>
      </div>

      {/* THE LIST */}
      {userContent.length > 0 ? (
        <div className="border border-neutral-800 bg-black divide-y divide-neutral-800">
          {userContent.map((content) => (
            <div
              key={content.id}
              className="group grid grid-cols-[1fr_50px] md:grid-cols-[1fr_auto] items-center hover:bg-neutral-900/30 transition-colors duration-200"
            >
              {/* Main Clickable Row */}
              <HistoryRow
                id={content.id}
                mode={content.mode}
                input_context={content.input_context}
                created_at={content.created_at}
              />

              {/* Delete Action (Isolated to prevent navigation trigger) */}
              <div className="flex items-center justify-center h-full border-l border-neutral-800/50">
                <DeleteMenu id={content.id} handleDelete={deleteContent} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="border border-dashed border-neutral-800 bg-neutral-950/20 py-24 flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-neutral-900 rounded-full mb-6">
            <Archive className="w-8 h-8 text-neutral-600" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-neutral-300 mb-2">
            Database Empty
          </h3>
          <p className="text-sm font-mono text-neutral-600 max-w-xs">
            No generation logs found. Initialize a new workflow to populate the
            archive.
          </p>
        </div>
      )}
    </main>
  );
};

export default ContentHistory;
