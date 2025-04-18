import { TreeView } from "@/components/tree-view";
import axios from "axios";
import { useEffect, useState } from "react";
function ChapterScroll({ bookId, setSelectedChapter, setChapters }) {
  const handleSelect = (item) => {
    if (!item.id) {
      console.error("no item id from chapterScroll!");
      return;
    } else {
      setSelectedChapter(item.id);
    }
  };
  const [treeData, setTreeData] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const fetchChapters = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/books/${bookId}/chapters`
      );
      const data = res.data.data;
      setChapters(data);
    };
    fetchChapters();
  }, [bookId]);
  useEffect(() => {
    const fetchChaptersTree = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/books/${bookId}/chapters/tree`
      );
      const data = res.data.data;
      setTreeData(data);
      if (data.length > 0) {
        setSelected(data[0].id);
      }
    };
    if (bookId) fetchChaptersTree();
  }, [bookId]);
  return (
    <div className="w-full h-screen bg-black text-white p-4 overflow-y-auto overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
      <TreeView
        data={treeData}
        initialSelectedItemId={selected}
        onSelectChange={handleSelect}
      />
    </div>
  );
}
export default ChapterScroll;
