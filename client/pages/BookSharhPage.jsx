import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import ChapterScroll from "@/components/ChapterScroll";
import DashboardLayout from "@/components/DashboardLayout";
import axios from "axios";
function BookSharhPage() {
  const { bookId } = useParams();
  const [matn, setMatn] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [fontSize, setFontSize] = useState(18);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupMatn, setGroupMatn] = useState([]);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchMatn = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/books/${bookId}/matn`
      );
      setMatn(res.data.data);
    };
    fetchMatn();
  }, [bookId]);
  useEffect(() => {
    if (!matn) return;
    const filterMatn = matn.filter(
      (mt) => !selectedChapter || mt.chapterId === selectedChapter
    );
    let group = [];
    let i = 0;
    while (i < filterMatn.length) {
      const current = filterMatn[i];
      if (current.sharh.length === 0) {
        group.push(filterMatn.slice(i, i + 3));
        i += 3;
      } else {
        group.push([current]);
        i += 1;
      }
    }
    setGroupMatn(group);
    setCurrentPage(1);
  }, [selectedChapter, matn]);
  useEffect(() => {
    if (chapters.length > 0 && !selectedChapter) {
      const mainChapter = chapters.find((chapter) => chapter.parentId === null);
      if (mainChapter) {
        const children = chapters.filter(
          (chapter) => chapter.parentId == mainChapter.id
        );
        const childWithContent = children.find((child) =>
          matn.some((mt) => mt.chapterId === child.id)
        );
        if (childWithContent) {
          setSelectedChapter(childWithContent.id);
        } else {
          setSelectedChapter(null);
        }
      }
    }
  }, [chapters, matn]);
  const paginationMatn = groupMatn[currentPage - 1] || [];
  const totalPages = groupMatn.length;
  return (
    <div className="grid grid-cols-12 bg-[#121212f5]">
      <div className="col-span-1 ">
        <DashboardLayout />
      </div>
      <div className=" mx-auto px-4 py-10 space-y-6 col-span-8">
        <Card className="bg-[#121212] text-zinc-200 font-sans min-h-screen p-8 leading-relaxed tracking-wide">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-zinc-800 px-4 py-3 flex flex-wrap items-center justify-between text-sm rounded shadow">
                <div className="space-x-1 rtl:space-x-reverse flex items-center">
                  <button
                    className="px-2 py-1 bg-zinc-700 rounded cursor-pointer"
                    onClick={() => setCurrentPage(1)}
                  >
                    &laquo;
                  </button>
                  <button
                    className="px-2 py-1 bg-zinc-700 rounded cursor-pointer"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  >
                    &lsaquo;
                  </button>
                  <span>صفحة:</span>
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) =>
                      setCurrentPage(Math.max(1, parseInt(e.target.value || 1)))
                    }
                    className="w-14 text-center bg-zinc-700 text-white rounded cursor-pointer"
                  />
                  <button
                    className="px-2 py-1 bg-zinc-700 rounded cursor-pointer"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                  >
                    &rsaquo;
                  </button>
                  <button
                    className="px-2 py-1 bg-zinc-700 rounded cursor-pointer"
                    onClick={() =>
                      setCurrentPage(
                        Math.ceil(filterMatn.length / itemsPerPage)
                      )
                    }
                  >
                    &raquo;
                  </button>
                </div>
              </div>
              <button
                onClick={() => setFontSize((s) => Math.max(s - 2, 8))}
                className="px-2 py-1 bg-zinc-700 rounded cursor-pointer"
              >
                -A
              </button>
              <button
                onClick={() => setFontSize((s) => Math.min(s + 2, 36))}
                className="px-2 py-1 bg-zinc-700 rounded cursor-pointer"
              >
                +A
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {paginationMatn.map((mt) => (
              <div key={mt.id} className="mb-12">
                <CardTitle
                  className=" font-bold text-white font-vazir mb-2 leading-relaxed "
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {mt.arText}
                </CardTitle>
                <p
                  className=" font-roboto font-semibold text-white mb-2"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {mt.engText}
                </p>
                <Separator className="border-zinc-700 my-4" />
                {mt.sharh.length > 0 && mt.sharh[0]?.scholar && (
                  <p
                    className=" font-roboto mb-4 text-gray-400"
                    style={{ fontSize: `${fontSize - 2}px` }}
                  >
                    Sharh by: {mt.sharh[0].scholar}
                  </p>
                )}
                {mt.sharh.map((sh) => (
                  <div key={sh.id} className="mb-6">
                    <p
                      className="font-vazir text-right mb-4 font-medium"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {sh.arExplain}
                      {sh.footnote?.map((fn) => (
                        <Popover key={fn.id}>
                          <PopoverTrigger asChild>
                            <sup className="cursor-pointer text-blue-400 ml-1">
                              [{fn.id}]
                            </sup>
                          </PopoverTrigger>
                          <PopoverContent className="text-sm max-w-md text-right">
                            <p className="font-vazir mb-1">{fn.ar}</p>
                            <p className="font-roboto text-left">{fn.eng}</p>
                          </PopoverContent>
                        </Popover>
                      ))}
                    </p>
                    <p
                      className="font-roboto text-lg"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {sh.engExplain}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
      <div className="col-span-3">
        <ChapterScroll
          bookId={bookId}
          setSelectedChapter={setSelectedChapter}
          setChapters={setChapters}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
export default BookSharhPage;
