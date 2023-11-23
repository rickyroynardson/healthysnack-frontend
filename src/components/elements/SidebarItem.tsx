import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

interface SidebarItemProps {
  url: string;
  label: string;
  Icon: LucideIcon;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  url,
  label,
  Icon,
}) => {
  const router = useRouter();
  const isActive = router.pathname === url;

  return (
    <li>
      <Link href={url}>
        <Button
          variant={isActive ? "default" : "ghost"}
          className={`w-full flex items-center justify-start gap-2 ${
            !isActive && "bg-white"
          }`}
        >
          <Icon className="w-5 aspect-square" />
          <span>{label}</span>
        </Button>
      </Link>
    </li>
  );
};
