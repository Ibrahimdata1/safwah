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
      if (current.sharh.length > 0) {
        let groupPage = [current];
        let j = i + 1;
        while (
          j < filterMatn.length &&
          filterMatn[j].sharh.length === 0 &&
          groupPage.length < 3
        ) {
          groupPage.push(filterMatn[j]);
          j++;
        }
        group.push(groupPage);
        i = j;
      } else {
        let groupPage = [];
        while (
          i < filterMatn.length &&
          groupPage.length < 3 &&
          filterMatn[i].sharh.length === 0
        ) {
          groupPage.push(filterMatn[i]);
          i++;
        }
        group.push(groupPage);
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
  useEffect(() => {
    if (!selectedChapter || !matn || !chapters) return;

    const selectedHasContent = matn.some(
      (m) => m.chapterId === selectedChapter
    );

    // ถ้า chapter ที่ถูกเลือกไม่มีเนื้อหา
    if (!selectedHasContent) {
      const children = chapters.filter((c) => c.parentId === selectedChapter);
      const firstChildWithContent = children.find((c) =>
        matn.some((m) => m.chapterId === c.id)
      );
      if (firstChildWithContent) {
        setSelectedChapter(firstChildWithContent.id);
      }
    }
  }, [selectedChapter, matn, chapters]);
  const paginationMatn = groupMatn[currentPage - 1] || [];
  const totalPages = groupMatn.length;
  function autoGroupMatnText(text) {
    const lines = text
      .split(/\r?\n|\r|\\n/)
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const grouped = [];
    for (let i = 0; i < lines.length; i += 2) {
      grouped.push([lines[i] || "", lines[i + 1] || ""]);
    }
    return grouped;
  }
  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
    } else {
      const currentIndex = chapters.findIndex((c) => c.id === selectedChapter);
      const nextChapters = chapters.slice(currentIndex + 1);

      for (const ch of nextChapters) {
        const hasContent = matn.some((m) => m.chapterId === ch.id);
        if (hasContent) {
          setSelectedChapter(ch.id);
          return;
        }
      }
      // ไม่มี chapter ถัดไป → ไม่ทำอะไร
    }
  }
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
                    onClick={goToNextPage}
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
                  {autoGroupMatnText(mt.matnText).map((pair, index) => (
                    <div key={index} className="mb-6">
                      {pair.map((line, i) => {
                        const isArabic = /[\u0600-\u06FF]/.test(line);
                        return (
                          <p
                            key={i}
                            className={`leading-relaxed ${
                              isArabic
                                ? "font-vazir text-right"
                                : "font-roboto text-left"
                            }`}
                            style={{ fontSize: `${fontSize}px` }}
                          >
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  ))}
                </CardTitle>
              </div>
            ))}
            {paginationMatn.map((mt) => {
              return (
                <div key={mt.id} className="mb-12">
                  {/* ถ้ามี Sharh ค่อยแสดง separator และคำอธิบาย */}
                  {mt.sharh.length > 0 && (
                    <>
                      <Separator className="border-zinc-700 my-4" />
                      {mt.sharh[0]?.scholar && (
                        <p
                          className=" font-roboto mb-4 text-gray-400"
                          style={{ fontSize: `${fontSize - 2}px` }}
                        >
                          Sharh by: {mt.sharh[0].scholar}
                        </p>
                      )}

                      {mt.sharh.map((sh) => (
                        <div key={sh.id} className="mb-6">
                          {sh.sharhText
                            .split(/\r?\n/)
                            .filter((line) => line.trim() !== "")
                            .map((line, index) => {
                              const isArabic = /[\u0600-\u06FF]/.test(line);
                              return (
                                <p
                                  key={index}
                                  className={`mb-2 leading-relaxed ${
                                    isArabic
                                      ? "font-vazir text-right"
                                      : "font-roboto text-left"
                                  }`}
                                  style={{ fontSize: `${fontSize}px` }}
                                >
                                  {line}
                                </p>
                              );
                            })}

                          {/* แสดง footnote แยกต่างหาก */}
                          {sh.footnote?.map((fn) => (
                            <Popover key={fn.id}>
                              <PopoverTrigger asChild>
                                <sup className="cursor-pointer text-blue-400 ml-1">
                                  [{fn.id}]
                                </sup>
                              </PopoverTrigger>
                              <PopoverContent className="text-sm max-w-md text-right">
                                <p className="font-vazir mb-1">
                                  {fn.footnoteText}
                                </p>
                              </PopoverContent>
                            </Popover>
                          ))}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="flex justify-center">
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
                    onClick={goToNextPage}
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
            </div>
          </CardFooter>
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
