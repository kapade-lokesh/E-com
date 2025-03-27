import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="border-t py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-2 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">newsletter text </h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>

          <p className="font-medium text-sm text-gray-500 mb-6">
            signup and get 12% off on your first oerder
          </p>

          <form action="" className="flex">
            <input
              type="email"
              name=""
              placeholder="Enter your email"
              id=""
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all "
            />

            <button className="bg-black text-white p-3 text-sm rounded-r-md hover:bg-gray-800 transotion-all">
              subscribe
            </button>
          </form>
        </div>

        {/* shop link */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">shop</h3>
          <ul className="space-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Mens's Top wear
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                womens's Top wear
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Mens's Bottom wear
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                womens's Bottom wear
              </Link>
            </li>
          </ul>
        </div>

        {/* support links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                contact us
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About us
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQ's
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow us</h3>

          <div className="flex items-center space-x-4 mb-6">
            <a
              href="www.facebook.com"
              target="_blank"
              rel="noopener noreferer"
              className="hover:text-gray-300"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>

            <a
              href="www.facebook.com"
              target="_blank"
              rel="noopener noreferer"
              className="hover:text-gray-300"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>

            <a
              href="www.facebook.com"
              target="_blank"
              rel="noopener noreferer"
              className="hover:text-gray-300"
            >
              <RiTwitterXLine className="h-5 w-5" />
            </a>
          </div>
          <p className="text-gray-500">call us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" /> +91 8554996834
          </p>
        </div>
      </div>

      {/* copyright section */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          @2025, All Copyright Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
