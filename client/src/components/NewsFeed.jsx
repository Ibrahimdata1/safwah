import BookCard from "@/components/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";

function NewsFeed({ url }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const newsFeed = await axios.get("http://localhost:8080/api/books");
        // Remove duplicates based on book ID
        const uniqueBooks = Array.from(new Map(newsFeed.data.data.map(book => [book.id, book])).values());
        setBooks(uniqueBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    };
    getFeed();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212f5] text-white col-span-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books?.map((book) => (
          <BookCard book={book} key={book.id} url={url} />
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;
