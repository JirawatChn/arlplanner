export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background mt-12">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2025 Airport Rail Link Prediction System</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
