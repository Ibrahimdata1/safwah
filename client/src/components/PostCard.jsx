import { Card, CardContent, CardTitle } from "@/components/ui/card";
function PostCard({ title, content }) {
  return (
    <Card className="hover:shadow-xl transition cursor-pointer">
      <CardContent className="p-5">
        <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
        <p className="text-sm text-gray-500">{content}</p>
      </CardContent>
    </Card>
  );
}
export default PostCard;
