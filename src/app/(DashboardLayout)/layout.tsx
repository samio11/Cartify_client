"use client";
import Provider from "@/provider/Provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppCustomerSidebar } from "@/components/module/Dashboard/AppCustomerSideBar";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { AppAdminSidebar } from "@/components/module/Dashboard/AppAdminSideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const ModefiedPathName = pathName.split("/").join(" > ");
  const { user } = useUser();

  return (
    <Provider>
      <SidebarProvider>
        {user && user?.role === "customer" ? (
          <AppCustomerSidebar></AppCustomerSidebar>
        ) : (
          <AppAdminSidebar></AppAdminSidebar>
        )}
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>CARTIFY </BreadcrumbPage>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {ModefiedPathName.toUpperCase()}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {children}
        </SidebarInset>
      </SidebarProvider>
    </Provider>
  );
}
