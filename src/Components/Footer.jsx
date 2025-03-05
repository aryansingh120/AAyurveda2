import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-orange-500 text-blue-300 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Aayurveda</h2>
            <p className="mt-3 text-sm text-white">Quality products for a healthier and better life.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="text-white transition duration-300">Home</a></li>
              <li><a href="#" className="text-white transition duration-300">Products</a></li>
              <li><a href="#" className="text-white transition duration-300">About Us</a></li>
              <li><a href="#" className="text-white transition duration-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Subscribe</h3>
            <p className="mt-3 text-sm text-white">Get updates on new arrivals & special offers.</p>
            <div className="mt-3 flex">
              <input type="email" placeholder="Enter your email" className="w-full p-2 text-gray-800 rounded-l-md outline-none"/>
              <button className="bg-yellow-400 px-4 py-2 text-gray-900 font-semibold rounded-r-md hover:bg-yellow-500 transition">Subscribe</button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-white"><FaFacebook size={22} /></a>
              <a href="#" className="text-white"><FaTwitter size={22} /></a>
              <a href="#" className="text-white"><FaInstagram size={22} /></a>
              <a href="#" className="text-white"><FaLinkedin size={22} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-8 pt-4 text-center text-sm text-white">
          2025 YourBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
