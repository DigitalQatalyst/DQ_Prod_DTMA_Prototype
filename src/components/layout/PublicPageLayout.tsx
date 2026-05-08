import Navbar from "./Navbar";
import Footer from "./Footer";

interface PublicPageLayoutProps {
  children: React.ReactNode;
}

const PublicPageLayout = ({ children }: PublicPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[80px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicPageLayout;
