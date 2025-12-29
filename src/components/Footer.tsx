import { Terminal, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-muted-foreground">
              dev.backend
            </span>
          </div>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Feito com <Heart className="w-4 h-4 text-primary fill-primary" /> em {currentYear}
          </p>

          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">const</span> passion ={" "}
            <span className="text-primary">"code"</span>;
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
