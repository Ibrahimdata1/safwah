import { useState } from "react";
import supabase from "../utils/supabaseClient.js";
import { Alert } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AuthUser() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin === true) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) return setMessage(error.message);
        setMessage("SignIn Success!");
      } else {
        const {
          data: { user },
          error,
        } = await supabase.auth.signUp({ email, password });
        if (error) return setMessage(error.message);
        await axios.post("http://localhost:8080/auth/signUp", {
          userId: user.id,
          name,
          surname,
          password,
          email,
        });
        setMessage("Registered Success!");
        navigate("/homepage");
      }
    } catch (error) {
      <Alert>Error Auth 500! {error}</Alert>;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="py-8 px-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">
            {isLogin ? "SignIn" : "Register"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    type="surname"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              {isLogin ? "SignIn" : "SignUp"}
            </Button>
          </form>
          <div className="text-sm text-center text-gray-600">
            {isLogin ? "No Account Yet?" : "Have Account Already?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {isLogin ? "Register" : "SignIn"}
            </button>
          </div>
          {message && (
            <div className="text-center text-sm text-red-500 pt-2">
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
export default AuthUser;
