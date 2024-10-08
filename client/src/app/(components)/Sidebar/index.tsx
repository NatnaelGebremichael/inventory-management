"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state/globalSlice";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  Users,
  ShoppingCart,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
          hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
            isActive ? "bg-blue-200 text-white" : ""
          }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapased = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapased));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapased ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapased ? "px-5" : "px-8"
        }`}
      >
        <Image
          src="https://inventory-management-s3-stack.s3.af-south-1.amazonaws.com/logo.png"
          alt="NatiStock-logo"
          width={27}
          height={27}
          className="rounded w-8"
        />
        <h1
          className={`${
            isSidebarCollapased ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          Stock
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        {/* <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapased}
        /> */}
        {/* <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapased}
        /> */}
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapased}
        />
        <SidebarLink
          href="/purchaseOrder"
          icon={ShoppingCart}
          label="Purchase Order"
          isCollapsed={isSidebarCollapased}
        />
        <SidebarLink
          href="/stock"
          icon={Clipboard}
          label="Stock Recipt"
          isCollapsed={isSidebarCollapased}
        />
        <SidebarLink
          href="/orders"
          icon={ShoppingCart}
          label="Orders"
          isCollapsed={isSidebarCollapased}
        />
        {/* <SidebarLink
          href="/barcode"
          icon={QrCode}
          label="Barcode"
          isCollapsed={isSidebarCollapased}
        /> */}
        <SidebarLink
          href="/users"
          icon={Users}
          label="Users"
          isCollapsed={isSidebarCollapased}
        />
        {/* <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapased}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapased}
        /> */}
      </div>

      {/* Footer */}
      <div className={`${isSidebarCollapased ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 NatuStock
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
