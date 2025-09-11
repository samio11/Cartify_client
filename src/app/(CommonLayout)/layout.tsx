"use client";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar></Navbar>
//       <div className="grow-1">{children}</div>
//       <Footer></Footer>
//     </div>
//   );
// }

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <div className="grow-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer></Footer>
    </div>
  );
}
