export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-32">
      <div className="px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">© {currentYear} Reese. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
