import { Button } from "@/components/ui/button";
function SidebarItem({ icon, label }) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-sm font-normal text-muted-foreground hover:text-primary cursor-pointer"
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Button>
  );
}
export default SidebarItem;
