import { Card, CardContent, CardTitle } from "@/components/ui/card";
function PostCard({ title, content, image }) {
  const imageUrl = `http://localhost:8080/uploads/${image}`;
  return (
    <Card className="hover:shadow-xl transition cursor-pointer">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
        <p className="text-sm text-gray-600">{content}</p>
      </CardContent>
    </Card>
  );
}
export default PostCard;
