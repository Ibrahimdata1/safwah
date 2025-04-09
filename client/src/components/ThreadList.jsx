import { useEffect, useState } from "react";
import axios from "axios";
function ThreadList() {
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    const fetchThread = async () => {
      const res = await axios.get("http://localhost:8080/api/allThreads");
      setThreads(res.data.data);
      console.log("fetchThreads", res.data.data);
    };
    fetchThread();
  }, []);
  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-2">
      <h3 className="text-white text-lg font-semibold mb-2">Latest Thread</h3>
      {threads.map((thread, index) => (
        <div key={index} className="text-white hover:underline cursor-pointer">
          <p className="text-sm">{thread.topic}</p>
          <p className="text-xs text-gray-400 ">{thread.content}</p>
        </div>
      ))}
    </div>
  );
}
export default ThreadList;
