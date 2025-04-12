import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import BookCard from "@/components/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";

function NewsFeed() {
  const [books, setBooks] = useState([]);
  const getFeed = async () => {
    const newsFeed = await axios.get("http://localhost:8080/api/books");
    setBooks(newsFeed.data.data);
  };
  useEffect(() => {
    getFeed();
  }, []);
  const handleNewBook = () => getFeed();
  return (
    <div className="min-h-screen bg-[#121212f5] text-white col-span-8">
      <div className="max-w-4xl mx-auto">
        <PostForm onPost={handleNewBook} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books?.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </div>
  );
}
export default NewsFeed;
