import React, { useState } from "react";

interface Category {
  name: string;
  slug: string;
  image?: string;
}

interface CategorySelectionProps {
  categories?: Category[];
  selectedCategory?: string;
  onCategorySelect: (slug: string) => void;
}

const defaultCategories: Category[] = [
  {
    name: "Basic pent",
    slug: "cotton-dresses",
    image: "/categories/cotton.jpg",
  },
  {
    name: "Cargo pent",
    slug: "salwar-kameez",
    image: "/categories/salwar.jpg",
  },
  {
    name: "Capri",
    slug: "short-kurtis",
    image: "/categories/kurti.jpg",
  },
  { name: "Short", slug: "plus-size", image: "/categories/plus.jpg" },
  { name: "Mom fit", slug: "tops", image: "/categories/tops.jpg" },
  /*{
    name: "Men’s Kurta Set",
    slug: "mens-kurta",
    image: "/categories/mens.jpg",
  },
  {
    name: "Jaipuri Tops",
    slug: "jaipuri-tops",
    image: "/categories/jaipuri.jpg",
  },
  {
    name: "Wedding Saree",
    slug: "wedding-saree",
    image: "/categories/wedding.jpg",
  },

  {
    name: "Embellished Saree",
    slug: "embellished-saree",
    image: "/categories/embellished.jpg",
  },*/
];

const CategorySelection: React.FC<CategorySelectionProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = () => {
    const data = categories?.length ? categories : defaultCategories;
    if (showAll || typeof window === "undefined") return data;
    const width = window.innerWidth;
    if (width < 640) return data.slice(0, 4);
    if (width < 768) return data.slice(0, 6);
    return data;
  };

  const handleCategoryClick = (slug: string) => {
    onCategorySelect(slug);
  };

  return (
    <div className="py-6 px-4 text-center">
      {/* Centered Title Above Cards */}
      <h2 className="text-xl font-bold text-gray-900 mb-8">
        CATEGORIES TO BAG
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visibleCategories().map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat.slug)}
            className={`cursor-pointer group p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1 text-center ${
              cat.slug === selectedCategory
                ? "border border-primary shadow-md scale-[1.02]"
                : ""
            }`}
          >
            <div className="mx-auto w-16 h-16 rounded-full overflow-hidden mb-3 border border-gray-200">
              <img
                src={cat.image || "/placeholder.svg"}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 group-hover:underline group-hover:text-primary">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Show More Button on Small Screens */}
      {!showAll && (
        <div className="mt-2 sm:hidden">
          <button
            onClick={() => setShowAll(true)}
            className="bg-black text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-800"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySelection;
