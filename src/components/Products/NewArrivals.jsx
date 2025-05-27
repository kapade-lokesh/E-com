import axios from "axios";
import React, { use, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLEFT, setScrollLEFT] = useState(0);
  const [isDragable, setIsDragable] = useState(false);
  const [canScrollLeft, setcanScrollLeft] = useState(false);
  const [canScrollRight, setcanScrollRight] = useState(true);

  const [Arrivals, setArrivals] = useState([]);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}products/getnewarrivals`
        );
        setArrivals(response.data.products);
      } catch (error) {
        console.error("Error fetching arrivals:", error);
      }
    };

    fetchArrivals();
  }, []);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    //set the leftscroll and right scroll

    if (container) {
      const leftscroll = container.scrollLeft;
      const rightscroll =
        container.scrollWidth > leftscroll + container.clientWidth;
      setcanScrollLeft(leftscroll > 0);
      setcanScrollRight(rightscroll);
    }

    // console.log({
    //   scrollLeft: container.scrollLeft,
    //   clientWidth: container.clientWidth,
    //   totalScroll: container.scrollWidth,
    // });
  };

  //handling the mouse drawg
  const handleMouseMove = (e) => {
    if (!isDragable) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    console.log("StatevarLeft", scrollLEFT);
    scrollRef.current.scrollLeft = scrollLEFT - walk;
  };

  const handleMouseDown = (e) => {
    setIsDragable(true);
    setStartX(e.pageX);
    setScrollLEFT(scrollRef.current.scrollLeft);

    // console.log("page-X", e.pageX);
    // console.log("scrollLeft", scrollRef.current.scrollLeft);
    // console.log("startx", startX);
    // console.log("StatevarLeft", scrollLEFT);
  };

  const handleMouseUporLeave = () => {
    setIsDragable(false);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
    }
    updateScrollButtons();
    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, [Arrivals]);

  return (
    <section className="relative">
      {/* Heading */}
      <div className="  container mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrob on cutting edge of fashion
        </p>
      </div>

      {/* buttons */}
      <div className=" right-0 absolute  top-[100px] flex space-x-2">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`p-1 rounded border ${
            canScrollLeft
              ? " bg-white text-black"
              : "cursor-not-allowed text-gray-300"
          }`}
        >
          <FiChevronLeft className="text-xl" />
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`p-1 rounded border ${
            canScrollRight
              ? " bg-white text-black"
              : "cursor-not-allowed text-gray-300"
          }`}
        >
          <FiChevronRight className="text-xl" />
        </button>
      </div>

      {/* Arrivals products */}

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUporLeave}
        onMouseUp={handleMouseUporLeave}
        onMouseMove={handleMouseMove}
        className="container mx-auto overflow-x-scroll flex space-x-6 relative"
      >
        {Arrivals.map((product) => {
          return (
            <div
              className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
              key={product._id}
            >
              <img
                src={product?.images[0]?.url}
                alt={product?.images[0]?.altText}
                draggable="false"
                className="w-full h-[400px] object-cover rounded-lg"
              />

              <div className="backdrop-blur-md text-white bg-opacity-50 p-2 rounded-b-lg absolute right-0 left-0 bottom-0">
                <Link to={`/product/${product._id}`}>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="mt-1">&#8377; {product.price}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NewArrivals;
