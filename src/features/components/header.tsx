import { Link } from '@tanstack/react-router';
import { Upload } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 min-h-14 flex justify-center gap-2 bg-header text-header-foreground">
      <nav className="px-3 py-2 flex-1 max-w-7xl flex items-center justify-between">
        <Link className="text-lg font-bold" to="/">
          Cat Image Viewer
        </Link>
        <Link
          to="/upload"
          className="px-3 py-2 flex items-center gap-2 bg-secondary rounded-md text-sm transition-colors hover:bg-secondary/80"
        >
          <Upload className="size-4" />
          Upload
        </Link>
      </nav>
    </header>
  );
};

export default Header;
