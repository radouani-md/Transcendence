
import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import Sidbar from "@/components/Sidbar";
import SidbarMobile from "@/components/SidbarMobile";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidbar />

      <div className="w-full min-w-0 lg:w-[calc(100%-268px)] lg:ml-67">
        <MobileHeader />

        <div className="hidden lg:block">
          <Header />
        </div>

        <main className="w-full min-w-0 min-h-screen pt-27 pb-20 lg:pt-20 lg:pb-0  bg-[#F3F4F6]">
          {children}
        </main>

        <SidbarMobile />
      </div>
    </div>
  );
}
