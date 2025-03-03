import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto max-w-screen-xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold">Support Ticketing System</h1>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="#services" className="text-sm font-medium hover:text-primary">
            Services
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
