"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Logo from "../../../public/Logo";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { userLogout } from "@/services/Auth/auth.service";
import {
  CarTaxiFront,
  LayoutDashboard,
  LogIn,
  LogOut,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import { getAllCartDataByUser } from "@/services/cart/cart.services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function Navbar() {
  const pathName = usePathname();
  const [userCartData, setUserCartData] = useState([]);
  // console.log(pathName);
  const { user, setIsLoading, isLoading } = useUser();
  console.log(user);
  const handleUserCart = async () => {
    const { data } = await getAllCartDataByUser();
    setUserCartData(data);
    setIsLoading(true);
  };
  useEffect(() => {
    handleUserCart();
    setIsLoading(true);
  }, [isLoading]);
  const handleLogout = async () => {
    const toastId = toast.loading("User Logging...");
    try {
      await userLogout();
      toast.success("User Logout Done", { id: toastId });
      setIsLoading(true);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message, { id: toastId });
    }
  };
  console.log("User Cart Data", userCartData);
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Product" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 justify-between gap-4">
        {/* Left side */}
        <div className="flex gap-2">
          <div className="flex items-center md:hidden">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="group size-8" variant="ghost" size="icon">
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          className="py-1.5"
                          active={link.href == pathName ? true : false}
                        >
                          <Link href={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="h-full *:h-full max-md:hidden">
              <NavigationMenuList className="h-full gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index} className="h-full">
                    <NavigationMenuLink
                      active={link.href == pathName ? true : false}
                      className="text-muted-foreground hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          {user?.email ? (
            <>
              {/* Dashboard Link */}
              {user?.role === "customer" && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      disabled={userCartData?.length === 0}
                      className="flex justify-center items-center gap-1"
                    >
                      <ShoppingCart></ShoppingCart>
                      <span> {userCartData?.length}</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Cart Info</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">
                                Product Name
                              </TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead className="text-right">
                                Per Price
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {userCartData &&
                              userCartData?.map((x: any) => (
                                <TableRow>
                                  <TableCell className="font-medium">
                                    {x?.productId?.title}
                                  </TableCell>
                                  <TableCell>{x?.status}</TableCell>
                                  <TableCell>{x?.quantity}</TableCell>
                                  <TableCell className="text-right">
                                    {x?.priceAtAdd}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link
                    href="/customer/dashboard"
                    className="flex items-center gap-2 text-sm font-medium hover:underline transition-colors"
                  >
                    <LayoutDashboard size={18} />
                    Customer Dashboard
                  </Link>
                </>
              )}
              {user?.role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 text-sm font-medium hover:text-purple-600 transition-colors"
                >
                  <LayoutDashboard size={18} />
                  Admin Dashboard
                </Link>
              )}
              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                size="sm"
                variant="default"
                className="flex items-center gap-2 text-sm shadow-md hover:shadow-lg transition-all"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              className="flex items-center gap-2 text-sm bg-black  shadow-md hover:shadow-lg transition-all"
            >
              <LogIn size={16} />
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
