import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthUser from "../pages/AuthUser";
import Homepage from "../pages/Homepage";
import NewsFeed from "./components/NewsFeed";
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
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route
          path="/auth"
          element={!user ? <AuthUser /> : <Navigate to="/newsFeed" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
