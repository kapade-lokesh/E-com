import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";

const Topbar = () => {
  return (
    <React.Fragment>
      <div className="bg-indigo-500 text-white">
        <div className="container mx-auto flex items-center justify-between p-1">
          <div className="hidden md:flex  items-center space-x-4">
            <a href="">
              {" "}
              <TbBrandMeta className="h-5 w-5" />
            </a>

            <a href="">
              {" "}
              <IoLogoInstagram className="h-5 w-5" />
            </a>

            <a href="">
              {" "}
              <RiTwitterXLine className="h-5 w-5" />
            </a>
          </div>

          <div className="text-sm text-center text-white flex-grow">
            <span>Hurray up for shopping !!</span>
          </div>

          <div className="hidden md:block text-sm text-white">
            +91 8554996834
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
