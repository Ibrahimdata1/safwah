import { TreeView } from "@/components/tree-view";
const data = [
  {
    id: "1",
    name: "หมวดที่ 1",
    children: [
      {
        id: "1-1",
        name: "บทที่ 1.1",
        children: [
          { id: "1-1-1", name: "หัวข้อย่อย 1.1.1" },
          { id: "1-1-2", name: "หัวข้อย่อย 1.1.2" },
        ],
      },
      {
        id: "1-2",
        name: "บทที่ 1.2",
      },
    ],
  },
  {
    id: "2",
    name: "หมวดที่ 2",
    draggable: true,
    droppable: true,
  },
];
function ChapterScroll() {
  const handleSelect = (item) => {
    console.log("choose chapter", item);
  };
  return (
    <div className="w-[300px] h-screen bg-black text-white p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
      <TreeView
        data={data}
        initialSelectedItemId="1-1-2"
        onSelectChange={handleSelect}
      />
    </div>
  );
}
export default ChapterScroll;
