export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-32">
      <div className="px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">© {currentYear} Reese. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href="mailto:hello@example.com"
              className="text-muted hover:text-foreground transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
