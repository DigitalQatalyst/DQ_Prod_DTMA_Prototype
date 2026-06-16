import Navbar from "./Navbar";
import Footer from "./Footer";

interface PublicPageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PublicPageLayout = ({ children, className }: PublicPageLayoutProps) => {
  return (
    <div className={`min-h-screen bg-white ${className ?? ""}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicPageLayout;
