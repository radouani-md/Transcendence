import Header from "@/components/Header";
import  Sidbar from "@/components/Sidbar"
// import "../globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidbar />

      <div className="flex-1 min-w-0">
        <Header />

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}