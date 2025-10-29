import HistoryCard from "@/components/HistoryCard";
import { getAllUserContent } from "@/utils/actions/content.action";

const ContentHistory = async () => {
  const userContent = await getAllUserContent();
  return (
    <main className="max-w-[800px] mx-auto mt-20">
      <h1 className="text-2xl font-medium mb-4">Your Content History</h1>
      {userContent.map((content) => (
        <div
          className="w-full border-gray-500 border-1 px-10 py-5 hover:bg-gray-600/10 transition-colors duration-200 rounded-lg flex items-center justify-between"
          key={content.id}
        >
          <HistoryCard
            key={content.id}
            task={content.task}
            created_at={content.created_at}
            id={content.id}
            content={content.content}
          />
        </div>
      ))}
    </main>
  );
};

export default ContentHistory;
