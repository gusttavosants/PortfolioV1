const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <span className="font-bold">Gustavo</span>
            <span className="font-bold text-primary">Melo</span>
          </div>

          <p className="text-sm text-muted-foreground">
            © {currentYear} · Todos os direitos reservados
          </p>

          <p className="text-sm text-muted-foreground">
            Desenvolvido com <span className="text-primary">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
