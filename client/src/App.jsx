import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthUser from "../pages/AuthUser";
import PostForm from "@/components/PostForm";
import PostMatn from "@/components/PostMatn";
import PostSharh from "@/components/PostSharh";
import PostChapter from "@/components/PostChapter";
import Homepage from "../pages/Homepage";
import Webboard from "./components/NewThreadForm";
import BookSharhPage from "../pages/BookSharhPage";
import BookSharhAdmin from "../pages/BookSharhAdmin";
import AdminEditBook from "../pages/AdminEditBook";
import AdminPage from "../pages/AdminPage";
import NotFound from "../pages/NotFound";
import supabase from "../utils/supabaseClient.js";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);
  if (loading)
    return (
      <div className="flex justify-center p-4 animate-pulse text-gray-600">
        Loading....
      </div>
    );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Homepage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/homepage"
          element={user ? <Homepage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthUser /> : <Navigate to="/homepage" />}
        />
        <Route path="/webboard" element={<Webboard />} />
        <Route path="/booksharh/:bookId" element={<BookSharhPage />} />
        <Route path="/admin/books" element={<AdminPage />}>
          <Route index element={<PostForm />} />
          <Route path="postmatn" element={<PostMatn />} />
          <Route path="postsharh" element={<PostSharh />} />
          <Route path="postchapter" element={<PostChapter />} />
          <Route path="editbooks/:bookId" element={<BookSharhAdmin />} />
          <Route path="adminedit" element={<AdminEditBook />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
