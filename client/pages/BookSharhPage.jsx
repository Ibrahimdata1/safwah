import { useEffect, useState, useRef } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";

function BookSharhPage() {
  const { bookId } = useParams();
  const sharhRef = useRef(null);
  const chapterRef = useRef(null);
  const [matn, setMatn] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [fontSize, setFontSize] = useState(18);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupMatn, setGroupMatn] = useState([]);
  const [itemsPerPage] = useState(1);
  const [currentChapterPage, setCurrentChapterPage] = useState(1);
  const [totalChapterPages, setTotalChapterPages] = useState(0);
  const [chapterProgress, setChapterProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isChapterLoading, setIsChapterLoading] = useState(false);
  const [currentSharhIndex, setCurrentSharhIndex] = useState(0);

  useEffect(() => {
    const fetchMatnAndChapters = async () => {
      setIsLoading(true);
      try {
        const matnRes = await axios.get(
          `http://localhost:8080/api/books/${bookId}/matn`
        );
        setMatn(matnRes.data.data || []);
      } catch (error) {
        console.error("Error fetching matn:", error);
        setMatn([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatnAndChapters();
  }, [bookId]);

  useEffect(() => {
    if (chapters.length > 0 && matn && matn.length > 0 && !selectedChapter) {
      let firstChapterWithContent = null;

      const findFirst = (chapterList) => {
        for (const chapter of chapterList) {
          const hasContent = matn.some(m => m.chapterId === chapter.id);
          if (hasContent) {
            return chapter;
          }
          const children = chapters.filter(c => c.parentId === chapter.id);
          if (children.length > 0) {
            const foundInChildren = findFirst(children);
            if (foundInChildren) return foundInChildren;
          }
        }
        return null;
      };

      const rootChapters = chapters.filter(c => c.parentId === null);
      firstChapterWithContent = findFirst(rootChapters);

      if (firstChapterWithContent) {
        setSelectedChapter(firstChapterWithContent.id);
      }
    }
  }, [chapters, matn, selectedChapter]);

  useEffect(() => {
    if (!matn || !selectedChapter) {
        setGroupMatn([]);
        setTotalChapterPages(0);
        setCurrentChapterPage(1);
        setCurrentPage(1);
        setCurrentSharhIndex(0);
        return;
    }

    setIsChapterLoading(true);

    const filteredMatnForChapter = matn.filter(
      (mt) => mt.chapterId === selectedChapter
    );

    let group = [];
    for (let i = 0; i < filteredMatnForChapter.length; i += itemsPerPage) {
        group.push(filteredMatnForChapter.slice(i, i + itemsPerPage));
    }

    setGroupMatn(group);
    const newTotalPages = group.length > 0 ? group.length : 1;
    setTotalChapterPages(newTotalPages);

    const savedPage = chapterProgress[selectedChapter] || 1;
    const validPage = Math.min(Math.max(1, savedPage), newTotalPages);
    setCurrentPage(validPage);
    setCurrentChapterPage(validPage);
    setCurrentSharhIndex(0);

    setIsChapterLoading(false);

  }, [selectedChapter, matn, itemsPerPage, chapterProgress]);

  useEffect(() => {
    if (!selectedChapter || !matn || !chapters || chapters.length === 0 || matn.length === 0) return;

    const selectedHasContent = matn.some(
      (m) => m.chapterId === selectedChapter
    );

    if (!selectedHasContent) {
      const chaptersWithContent = chapters.filter(c => matn.some(m => m.chapterId === c.id));
      const currentIndex = chaptersWithContent.findIndex(c => c.id === selectedChapter);

      let nextChapterWithContent = null;
      const findNext = (startNodeId) => {
          const allChapters = chapters;
          const startIndex = allChapters.findIndex(c => c.id === startNodeId);
          if (startIndex === -1) return null;

          for (let i = startIndex + 1; i < allChapters.length; i++) {
              const chapter = allChapters[i];
              if (matn.some(m => m.chapterId === chapter.id)) {
                  return chapter;
              }
          }
          return null;
      }

      nextChapterWithContent = findNext(selectedChapter);

      if (nextChapterWithContent) {
        setSelectedChapter(nextChapterWithContent.id);
      }
    }
  }, [selectedChapter, matn, chapters]);

  const scrollToChapter = () => {
    if (chapterRef.current) {
      chapterRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  function goToNextPage() {
    if (currentPage < totalChapterPages) {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        setCurrentChapterPage(nextPage);
        setChapterProgress(prev => ({ ...prev, [selectedChapter]: nextPage }));
        setTimeout(scrollToChapter, 100);
    } else {
        const chaptersWithContent = chapters.filter(c => matn.some(m => m.chapterId === c.id));
        const currentIndex = chaptersWithContent.findIndex(c => c.id === selectedChapter);

        if (currentIndex !== -1 && currentIndex < chaptersWithContent.length - 1) {
            const nextChapter = chaptersWithContent[currentIndex + 1];
            setSelectedChapter(nextChapter.id);
            setTimeout(scrollToChapter, 100);
        }
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        setCurrentChapterPage(prevPage);
        setChapterProgress(prev => ({ ...prev, [selectedChapter]: prevPage }));
        setTimeout(scrollToChapter, 100);
    } else {
        const chaptersWithContent = chapters.filter(c => matn.some(m => m.chapterId === c.id));
        const currentIndex = chaptersWithContent.findIndex(c => c.id === selectedChapter);

        if (currentIndex > 0) {
            const prevChapter = chaptersWithContent[currentIndex - 1];
            setSelectedChapter(prevChapter.id);
            setTimeout(scrollToChapter, 100);
        }
    }
  }

  function autoGroupMatnText(text) {
    if (!text) return [];
    
    // Split text into lines and clean them
    const lines = text
      .split(/\r?\n|\r|\\n/)
      .map(line => line.trim())
      .filter(line => {
        if (/^[-\s.:"()]+$/.test(line)) return false;
        if (!line) return false;
        return true;
      });

    // Initialize data structures
    const grouped = [];
    const seenPairs = new Set();
    let currentArabic = '';
    let currentEnglish = [];
    let currentReference = null;
    let isCollectingEnglish = false;
    let isQuranVerse = false;

    function cleanText(text) {
      // Preserve Arabic diacritics while cleaning
      return text.replace(/^[-\s:"()]+|[-\s:"()]+$/g, '').trim();
    }

    function isArabicText(text) {
      // More accurate Arabic detection including diacritics
      return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0870-\u089F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
    }

    function createGroup(arabic, english, reference, type = 'text') {
      const englishText = Array.isArray(english) ? english.join(' ').trim() : english;
      const key = `${arabic}|${englishText}`;
      
      // Always include Arabic text and Quranic verses regardless of seen status
      if ((!seenPairs.has(key) && (arabic || englishText)) || isArabicText(arabic) || type === 'quran') {
        seenPairs.add(key);
        return {
          arabic,
          english: englishText,
          reference,
          type
        };
      }
      return null;
    }

    function pushGroup(group) {
      if (group && (group.arabic || group.english || group.type === 'surah')) {
        grouped.push(group);
      }
    }

    function handleSurahReference(line) {
      const match = line.match(/\[(.*?):\s*(\d+)\]$/);
      if (match) {
        if (currentArabic || currentEnglish.length > 0) {
          pushGroup(createGroup(currentArabic, currentEnglish, currentReference, isQuranVerse ? 'quran' : 'text'));
        }
        pushGroup({
          arabic: '',
          english: '',
          reference: `${match[1]}: ${match[2]}`,
          type: 'surah'
        });
        currentArabic = '';
        currentEnglish = [];
        currentReference = null;
        isQuranVerse = false;
        return true;
      }
      return false;
    }

    function extractReference(line) {
      const match = line.match(/\[([^\]]+)\]$/);
      if (match) {
        const text = line.replace(/\s*\[[^\]]+\]\s*$/, '').trim();
        return {
          text,
          reference: match[1]
        };
      }
      return { text: line.trim(), reference: null };
    }

    // Process each line
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) continue;

      // Check if line contains Quranic verse markers
      if (line.includes('{') && line.includes('}')) {
        isQuranVerse = true;
      }

      // Handle Surah references first
      if (handleSurahReference(line)) {
        isCollectingEnglish = false;
        continue;
      }

      // Extract reference and clean text
      const { text, reference } = extractReference(line);
      if (!text) continue;

      // Clean the text
      const cleanedText = cleanText(text);
      if (!cleanedText) continue;

      // Check if text is Arabic
      const isArabic = isArabicText(cleanedText);

      if (isArabic) {
        // If we were collecting English, save the previous group
        if (currentEnglish.length > 0) {
          pushGroup(createGroup(currentArabic, currentEnglish, currentReference, isQuranVerse ? 'quran' : 'text'));
          currentEnglish = [];
        }
        
        // If we already have Arabic text, save it as a separate group
        if (currentArabic) {
          pushGroup(createGroup(currentArabic, [], currentReference, isQuranVerse ? 'quran' : 'text'));
        }
        
        currentArabic = cleanedText;
        currentReference = reference;
        isCollectingEnglish = true;
      } else {
        // Handle English text
        if (isCollectingEnglish) {
          currentEnglish.push(cleanedText);
          
          // If sentence ends, create a group
          if (cleanedText.match(/[.!?]$/)) {
            pushGroup(createGroup(currentArabic, currentEnglish, currentReference, isQuranVerse ? 'quran' : 'text'));
            currentArabic = '';
            currentEnglish = [];
            currentReference = null;
            isCollectingEnglish = false;
            isQuranVerse = false;
          }
        } else {
          currentEnglish.push(cleanedText);
          if (cleanedText.match(/[.!?]$/)) {
            pushGroup(createGroup('', currentEnglish, reference));
            currentEnglish = [];
            isQuranVerse = false;
          }
        }
      }
    }

    // Handle any remaining text
    if (currentArabic || currentEnglish.length > 0) {
      pushGroup(createGroup(currentArabic, currentEnglish, currentReference, isQuranVerse ? 'quran' : 'text'));
    }

    return grouped;
  }

  const currentChapter = chapters.find((c) => c.id === selectedChapter);
  const chapterTitle = currentChapter ? currentChapter.title : 'Loading Chapter...';

  const chaptersWithContent = matn ? chapters.filter(c => matn.some(m => m.chapterId === c.id)) : [];
  const currentChapterIndex = currentChapter ? chaptersWithContent.findIndex(c => c.id === currentChapter.id) : -1;
  const chapterNumber = currentChapterIndex !== -1 ? currentChapterIndex + 1 : 0;
  const totalChaptersWithContent = chaptersWithContent.length;

  const paginationMatn = groupMatn[currentPage - 1] || [];

  const scrollToSharh = () => {
    if (sharhRef.current) {
      sharhRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextSharh = () => {
    setCurrentSharhIndex(prev => {
      const newIndex = Math.min(paginationMatn[0]?.sharh.length - 1 || 0, prev + 1);
      setTimeout(scrollToSharh, 100); // Slight delay to ensure DOM update
      return newIndex;
    });
  };

  const handlePrevSharh = () => {
    setCurrentSharhIndex(prev => {
      const newIndex = Math.max(0, prev - 1);
      setTimeout(scrollToSharh, 100); // Slight delay to ensure DOM update
      return newIndex;
    });
  };

  if (isLoading) {
    return (
        <div className="grid grid-cols-12 bg-[#121212f5]">
         <div className="col-span-1 "><DashboardLayout /></div>
         <div className="col-span-8 mx-auto px-4 py-10 space-y-6">
             <Card className="bg-[#121212] text-zinc-200 min-h-screen p-8">
                 <CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader>
                 <CardContent className="space-y-6">
                     <Skeleton className="h-20 w-full" />
                     <Skeleton className="h-40 w-full" />
                     <Skeleton className="h-20 w-full" />
                 </CardContent>
             </Card>
         </div>
         <div className="col-span-3"><Skeleton className="h-full w-full"/></div> 
        </div>
    );
  }

  return (
    <div className="grid grid-cols-12 bg-[#121212f5]">
      <div className="col-span-1">
        <DashboardLayout />
      </div>
      <div className="mx-auto px-4 py-10 space-y-6 col-span-8">
        <Card className="bg-[#121212] text-zinc-200 font-sans min-h-screen p-8 leading-relaxed tracking-wide">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 bg-zinc-800 px-4 py-3 rounded shadow">
                <button
                  className="px-2 py-1 bg-zinc-700 rounded cursor-pointer disabled:opacity-50"
                  onClick={() => {
                    const firstPage = 1;
                    setCurrentPage(firstPage);
                    setCurrentChapterPage(firstPage);
                    setChapterProgress(prev => ({ ...prev, [selectedChapter]: firstPage }));
                    setTimeout(scrollToChapter, 100);
                  }}
                  disabled={currentPage <= 1 && currentChapterIndex <= 0}
                >
                  &laquo;
                </button>
                <button
                  className="px-2 py-1 bg-zinc-700 rounded cursor-pointer disabled:opacity-50"
                  onClick={goToPreviousPage}
                  disabled={currentPage <= 1 && currentChapterIndex <= 0}
                >
                  &lsaquo;
                </button>
                <span className="mx-2 whitespace-nowrap">Chapter {chapterNumber} of {totalChaptersWithContent}</span>
                <span className="whitespace-nowrap">Page:</span>
                <input
                  type="number"
                  value={currentChapterPage}
                  onChange={(e) => {
                    const inputVal = e.target.value;
                    if (inputVal === "") {
                        setCurrentChapterPage("");
                        return;
                    }
                    const newPage = parseInt(inputVal || 1);
                    const validPage = Math.max(1, Math.min(newPage, totalChapterPages));
                    if (!isNaN(validPage)) {
                        setCurrentPage(validPage);
                        setCurrentChapterPage(validPage);
                        setChapterProgress(prev => ({ ...prev, [selectedChapter]: validPage }));
                    }
                  }}
                   onBlur={(e) => {
                     if (e.target.value === "") {
                       setCurrentChapterPage(currentPage);
                     }
                   }}
                  className="w-14 text-center bg-zinc-700 text-white rounded cursor-pointer"
                  min="1"
                  max={totalChapterPages}
                  disabled={totalChapterPages <= 1 || isChapterLoading}
                />
                <span className="whitespace-nowrap">/ {isChapterLoading ? '...' : totalChapterPages}</span>
                <button
                  className="px-2 py-1 bg-zinc-700 rounded cursor-pointer disabled:opacity-50"
                  onClick={goToNextPage}
                  disabled={currentPage >= totalChapterPages && currentChapterIndex >= totalChaptersWithContent - 1}
                >
                  &rsaquo;
                </button>
                <button
                  className="px-2 py-1 bg-zinc-700 rounded cursor-pointer disabled:opacity-50"
                  onClick={() => {
                    const lastPage = totalChapterPages;
                    setCurrentPage(lastPage);
                    setCurrentChapterPage(lastPage);
                    setChapterProgress(prev => ({ ...prev, [selectedChapter]: lastPage }));
                    setTimeout(scrollToChapter, 100);
                  }}
                  disabled={currentPage >= totalChapterPages && currentChapterIndex >= totalChaptersWithContent - 1}
                >
                  &raquo;
                </button>
              </div>
              <div className="flex items-center gap-2">
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
            </div>
            <h2 ref={chapterRef} className="text-2xl font-bold text-center mb-6 font-vazir text-white" style={{ direction: 'rtl' }}>{chapterTitle}</h2>
          </CardHeader>
          <CardContent>
            {isChapterLoading ? (
                 <div className="space-y-6">
                     <Skeleton className="h-20 w-full" />
                     <Skeleton className="h-40 w-full" />
                     <Skeleton className="h-20 w-full" />
                 </div>
            ) : paginationMatn.length > 0 ? (
              paginationMatn.map((mt) => (
                <div key={mt.id} className="mb-12">
                  {mt.matnText && (
                      <CardTitle
                        className="font-bold text-white mb-8 leading-relaxed tracking-wide"
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        <div className="mb-8">
                          <div className="relative mb-4">
                            <p
                              className="font-vazir text-right leading-relaxed whitespace-pre-wrap"
                              style={{ 
                                fontSize: `${fontSize}px`, 
                                direction: 'rtl',
                                lineHeight: '2'
                              }}
                            >
                              {mt.matnText}
                            </p>
                          </div>
                        </div>
                      </CardTitle>
                  )}

                  {mt.sharh && mt.sharh.length > 0 && mt.sharh[currentSharhIndex] && (
                    <>
                      <Separator className="border-zinc-700 my-8" />
                      <div key={mt.sharh[currentSharhIndex].id} className="mb-8">
                        {mt.sharh[currentSharhIndex].scholar && (
                          <div ref={sharhRef} className="flex items-center gap-2 mb-6 bg-zinc-800/50 p-3 rounded-md">
                            <span className="font-roboto text-gray-400 text-sm">
                              Sharh by:
                            </span>
                            <span
                              className="font-vazir text-gray-300"
                              style={{ fontSize: `${fontSize - 2}px` }}
                            >
                              {mt.sharh[currentSharhIndex].scholar}
                            </span>
                          </div>
                        )}

                        {mt.sharh[currentSharhIndex].sharhText && (
                          <div className="pl-4 border-l-2 border-zinc-800">
                            <div className="relative mb-4">
                              <p
                                className="font-vazir text-right leading-relaxed whitespace-pre-wrap"
                                style={{ 
                                  fontSize: `${fontSize}px`, 
                                  direction: 'rtl',
                                  lineHeight: '2'
                                }}
                              >
                                {mt.sharh[currentSharhIndex].sharhText}
                              </p>
                            </div>
                          </div>
                        )}

                        {mt.sharh[currentSharhIndex].footnote && mt.sharh[currentSharhIndex].footnote.length > 0 && (
                          <div className="mt-6 text-right border-t border-zinc-800 pt-4">
                            {mt.sharh[currentSharhIndex].footnote.map((fn) => (
                              <Popover key={fn.id}>
                                <PopoverTrigger asChild>
                                  <sup className="cursor-pointer text-blue-400 hover:text-blue-300 mx-1">
                                    [{fn.id}]
                                  </sup>
                                </PopoverTrigger>
                                <PopoverContent className="text-sm max-w-md text-right bg-zinc-800 border-zinc-700 text-zinc-200 font-vazir p-4 rounded-lg shadow-lg">
                                  <p className="mb-1 leading-relaxed whitespace-pre-wrap">
                                    {fn.footnoteText}
                                  </p>
                                </PopoverContent>
                              </Popover>
                            ))}
                          </div>
                        )}

                        {mt.sharh.length > 1 && (
                          <div className="flex items-center justify-center gap-2 mb-6">
                            <button
                              className="px-3 py-1 bg-zinc-700 rounded cursor-pointer disabled:opacity-50"
                              onClick={handlePrevSharh}
                              disabled={currentSharhIndex === 0}
                            >
                              Previous Sharh
                            </button>
                            <span className="text-gray-400">
                              {currentSharhIndex + 1} / {mt.sharh.length}
                            </span>
                            <button
                              className="px-3 py-1 bg-zinc-700 rounded cursor-pointer disabled:opacity-50"
                              onClick={handleNextSharh}
                              disabled={currentSharhIndex === mt.sharh.length - 1}
                            >
                              Next Sharh
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
                 <p className="text-center text-gray-500">No content available for this chapter or page.</p>
            )}
          </CardContent>
          <CardFooter className='flex justify-center'>
             <div className="flex items-center justify-center mb-4">
              <div className="flex items-center gap-2 bg-zinc-800 px-4 py-3 rounded shadow">
                 <button
                   className="px-2 py-1 bg-zinc-700 rounded cursor-pointer disabled:opacity-50"
                   onClick={() => {
                     const firstPage = 1;
                     setCurrentPage(firstPage);
                     setCurrentChapterPage(firstPage);
                     setChapterProgress(prev => ({ ...prev, [selectedChapter]: firstPage }));
                     setTimeout(scrollToChapter, 100);
                   }}
                   disabled={currentPage <= 1 && currentChapterIndex <= 0}
                 >
                   &laquo;
                 </button>
                 <button
                   className="px-2 py-1 bg-zinc-700 rounded cursor-pointer disabled:opacity-50"
                   onClick={goToPreviousPage}
                   disabled={currentPage <= 1 && currentChapterIndex <= 0}
                 >
                   &lsaquo;
                 </button>
                 <span className="mx-2 whitespace-nowrap">Chapter {chapterNumber} of {totalChaptersWithContent}</span>
                 <span className="whitespace-nowrap">Page:</span>
                 <input
                   type="number"
                   value={currentChapterPage}
                   onChange={(e) => {
                     const inputVal = e.target.value;
                     if (inputVal === "") {
                         setCurrentChapterPage("");
                         return;
                     }
                     const newPage = parseInt(inputVal || 1);
                     const validPage = Math.max(1, Math.min(newPage, totalChapterPages));
                     if (!isNaN(validPage)) {
                         setCurrentPage(validPage);
                         setCurrentChapterPage(validPage);
                         setChapterProgress(prev => ({ ...prev, [selectedChapter]: validPage }));
                     }
                   }}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setCurrentChapterPage(currentPage);
                      }
                    }}
                   className="w-14 text-center bg-zinc-700 text-white rounded cursor-pointer"
                   min="1"
                   max={totalChapterPages}
                   disabled={totalChapterPages <= 1 || isChapterLoading}
                 />
                 <span className="whitespace-nowrap">/ {isChapterLoading ? '...' : totalChapterPages}</span>
                  <button
                    className="px-2 py-1 bg-zinc-700 rounded cursor-pointer disabled:opacity-50"
                    onClick={goToNextPage}
                     disabled={currentPage >= totalChapterPages && currentChapterIndex >= totalChaptersWithContent - 1}
                  >
                    &rsaquo;
                  </button>
                  <button
                    className="px-2 py-1 bg-zinc-700 rounded cursor-pointer disabled:opacity-50"
                    onClick={() => {
                       const lastPage = totalChapterPages;
                       setCurrentPage(lastPage);
                       setCurrentChapterPage(lastPage);
                       setChapterProgress(prev => ({ ...prev, [selectedChapter]: lastPage }));
                       setTimeout(scrollToChapter, 100);
                    }}
                     disabled={currentPage >= totalChapterPages && currentChapterIndex >= totalChaptersWithContent - 1}
                  >
                    &raquo;
                  </button>
              </div>
            </div>
             <h2 className="text-2xl font-bold text-center mb-6 font-vazir text-white" style={{ direction: 'rtl' }}>{chapterTitle}</h2>

          </CardFooter>
        </Card>
      </div>
      <div className="col-span-3 sticky top-0 h-screen overflow-y-auto border-l border-zinc-700">
        <ChapterScroll
          bookId={bookId}
          setSelectedChapter={setSelectedChapter}
          setChapters={setChapters}
          chapters={chapters}
          selectedChapterId={selectedChapter}
          matn={matn}
        />
      </div>
    </div>
  );
}
export default BookSharhPage;
