import { TreeView } from "@/components/tree-view";
import axios from "axios";
import { useEffect, useState } from "react";

function ChapterScroll({
  bookId,
  setSelectedChapter,
  setChapters,
  chapters,
  selectedChapterId,
  matn
}) {
  const handleSelect = (item) => {
    if (item?.id) {
      setSelectedChapter(item.id);
    } else {
      console.error("no item id from chapterScroll!");
    }
  };

  const [treeData, setTreeData] = useState([]);

  const initialSelected = selectedChapterId;

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/books/${bookId}/chapters/tree`
        );
        const data = res.data.data;
        setTreeData(data);
        setChapters(flattenTree(data));
      } catch (error) {
        console.error("Error fetching chapters tree:", error);
        setTreeData([]);
        setChapters([]);
      }
    };
    if (bookId) fetchChapters();
  }, [bookId, setChapters]);

  const flattenTree = (tree) => {
    let flatList = [];
    const recurse = (nodes) => {
      if (!Array.isArray(nodes)) return;
      nodes.forEach(node => {
        const { children, ...rest } = node;
        flatList.push(rest);
        if (children) {
          recurse(children);
        }
      });
    };
    recurse(tree);
    return flatList;
  };

  return (
    <div className="w-full h-full bg-black text-white p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-black">
      <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
      {treeData.length > 0 ? (
        <TreeView
          data={treeData}
          initialSelectedItemId={initialSelected}
          onSelectChange={handleSelect}
          className="pr-2"
        />
      ) : (
        <p className="text-zinc-500">Loading contents...</p>
      )}
    </div>
  );
}

export default ChapterScroll;
