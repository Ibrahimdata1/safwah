import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";
import axios from "axios";
function NewThreadForm() {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchThreads = async () => {
      const res = await axios.get("http://localhost:8080/api/allThreads");
      setThreads(res.data.data);
    };
    fetchThreads();
  }, []);
  return (
    <aside className="col-span-2 p-4 hidden md:block text-gray-400 bg-[#121212f7]">
      <Table className="caption-top">
        <TableCaption className="mb-3 text-2xl font-extrabold tracking-tight lg:text-3xl bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent drop-shadow-sm">
          Webboard
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]">
              <Flame className="text-red-600 size-4" />
            </TableHead>
            <TableHead className="w-[100px]">Topic</TableHead>
            <TableHead>Username</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {threads.map((thread) => (
            <TableRow key={thread.id}>
              <TableCell>#1</TableCell>
              <TableCell className="font-medium">{thread.topic}</TableCell>
              <TableCell>{thread.user?.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </aside>
  );
}
export default NewThreadForm;
