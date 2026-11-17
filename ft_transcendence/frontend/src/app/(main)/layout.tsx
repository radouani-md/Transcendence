import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import  Sidbar from "@/components/Sidbar"
import SidbarMobile from "@/components/SidbarMobile";
// import "../globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidbar />

      <div className="lg:ml-67">
        <MobileHeader />

        <div className="hidden lg:block">
          <Header />
        </div>

        <main className="pt-27 lg:pb-0 pb-20 lg:pt-20" >
          {children}
        </main>

        <SidbarMobile />

      </div>
    </div>
  );
}