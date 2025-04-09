import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function SidebarItem({ icon, label, link }) {
  return (
    <Link to={link} className="w-full">
      <Button
        variant="ghost"
        className="w-full justify-start text-sm font-normal text-muted-foreground hover:text-primary cursor-pointer"
      >
        <span className="mr-3">{icon}</span>
        {label}
      </Button>
    </Link>
  );
}
export default SidebarItem;
