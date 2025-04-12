import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
function BookSharhPage() {
  const { bookId } = useParams();
  const [paragraphs, setParagraphs] = useState(null);
  useEffect(() => {
    const fetchParagraphs = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/books/${bookId}/paragraphs`
      );
      setParagraphs(res.data.data);
    };
    fetchParagraphs();
  }, [bookId]);
  if (!paragraphs) return <Skeleton className="w-full h-64" />;
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Read Book</h1>
      {paragraphs.map((paragraph) => (
        <Card key={paragraph.id} className="shadow">
          <CardHeader>
            <CardTitle className="text-right font-semibold text-lg text-gray-800">
              {paragraph.arText}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-700 mb-4">{paragraph.engText}</p>
            <Separator className="my-4" />
            {paragraph.sharh.map((sh) => (
              <div key={sh.id} className="mb-6">
                <p className="text-sm font-semibold mb-1">
                  Sharh by: {sh.scholar}
                </p>
                <p className="text-right text-gray-800">{sh.arExplain}</p>
                <p className="text-sm text-gray-700 mt-2">{sh.engExplain}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
export default BookSharhPage;
