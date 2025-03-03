import Link from "next/link";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="flex items-center justify-center bg-gray-900">
         <footer className="bg-gray-900 text-white">
        <div className="container px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm">We provide top-notch customer support solutions to businesses of all sizes.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-sm hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-sm hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-sm hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-sm">Email: support@example.com</p>
              <p className="text-sm">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm">&copy; 2023 Support Ticketing System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
   
  );
};

export default Footer;
