import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface SubHeaderProps {
  url: string;
  title: string;
}

export const SubHeader: React.FC<SubHeaderProps> = ({ url, title }) => {
  return (
    <div className="container sticky top-0 py-4 border-b bg-white supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:backdrop-blur-md flex items-center gap-4">
      <Link href={url}>
        <Button variant="outline" size="icon">
          <ChevronLeft className="w-4 aspect-square" />
        </Button>
      </Link>
      <p className="text-lg font-bold">{title}</p>
    </div>
  );
};
