import { useState } from "react";
import {
  Gauge,
  LogOut,
  Menu,
  Package,
  PackageOpen,
  Receipt,
  ShoppingBag,
  ShoppingBasket,
  Users,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useStore } from "@/store";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";

const menuItems = [
  {
    url: "/",
    label: "Dashboard",
    Icon: Gauge,
  },
  {
    url: "/sales",
    label: "Sale",
    Icon: ShoppingBasket,
  },
  {
    url: "/purchases",
    label: "Purchase",
    Icon: ShoppingBag,
  },
];

const settingItems = [
  {
    url: "/transactions",
    label: "Transaction",
    Icon: Receipt,
  },
  {
    url: "/users",
    label: "User",
    Icon: Users,
  },
  {
    url: "/products",
    label: "Product",
    Icon: Package,
  },
  {
    url: "/product-categories",
    label: "Product Category",
    Icon: Package,
  },
  {
    url: "/inventories",
    label: "Inventory",
    Icon: PackageOpen,
  },
];

export const Sidebar: React.FC = () => {
  const { user, onLogout } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`h-screen fixed lg:sticky lg:top-0 inset-0 z-20 lg:z-10 p-4 lg:px-0 lg:pr-4 lg:pl-[2rem] flex flex-col justify-between lg:w-1/5 lg:border-r bg-secondary lg:bg-transparent transition-transform lg:translate-y-0 ${
          isOpen ? "translate-y-0" : "-translate-y-[200%]"
        }`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-lg font-bold text-foreground/70">Menu</p>
            <ul className="space-y-2">
              {menuItems.map((menu, index) => (
                <SidebarItem key={index} {...menu} />
              ))}
            </ul>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground/70">Setting</p>
            <ul className="space-y-2">
              {settingItems.map((setting, index) => (
                <SidebarItem key={index} {...setting} />
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://source.boringavatar.com/beam" />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{user?.name}</p>
                <Link href="/profile" className="text-sm hover:underline">
                  See profile
                </Link>
              </div>
            </div>
            <Button variant="destructive">
              <LogOut onClick={onLogout} className="w-4 aspect-square" />
            </Button>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="outline"
            className="w-full flex items-center justify-start gap-2 lg:hidden"
          >
            <X className="w-4 aspect-square" />
            <span>Close</span>
          </Button>
        </div>
      </div>
      <div className="fixed lg:hidden bottom-0 inset-x-0 z-10 p-4 bg-white border-t supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:backdrop-blur-md">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-start gap-2"
        >
          <Menu className="w-4 aspect-square" />
          <span>Menu</span>
        </Button>
      </div>
    </>
  );
};
