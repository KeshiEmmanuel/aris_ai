import TextEditor from "@/components/TextEditor";
import { getContent } from "@/utils/actions/content.action";

type ContentPageProps = {
  params: Promise<{ id: string }>;
};

const ContentPage = async ({ params }: ContentPageProps) => {
  const { id } = await params;
  const content = await getContent(id);
  // console.log(content);
  return (
    <div>
      <TextEditor content={content.content} contentTitle={content.task} id={content.id} />
    </div>
  );
};

export default ContentPage;
