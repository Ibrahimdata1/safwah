function ThreadList({ threads }) {
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
