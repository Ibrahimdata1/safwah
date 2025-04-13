import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import ChapterScroll from "@/components/ChapterScroll";
import axios from "axios";
function BookSharhPage() {
  const { bookId } = useParams();
  const [matn, setMatn] = useState(null);
  useEffect(() => {
    const fetchMatn = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/books/${bookId}/matn`
      );
      setMatn(res.data.data);
    };
    fetchMatn();
  }, [bookId]);
  if (!matn) return <Skeleton className="w-full h-64" />;
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2"></div>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6 col-span-8">
        <h1 className="text-2xl font-bold">Read Book</h1>
        {matn.map((mt) => (
          <Card key={mt.id} className="shadow">
            <CardHeader>
              <CardTitle className="font-semibold text-lg text-white">
                {mt.arText}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-white mb-4">{mt.engText}</p>
              <Separator className="my-4" />
              {mt.sharh.map((sh) => (
                <div key={sh.id} className="mb-6">
                  <p className="text-sm font-semibold mb-4">
                    Sharh by: {sh.scholar}
                  </p>
                  <p className="text-right text-white">{sh.arExplain}</p>
                  <p className="text-sm text-white mt-2">{sh.engExplain}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="col-span-2">
        <ChapterScroll />
      </div>
    </div>
  );
}
export default BookSharhPage;
