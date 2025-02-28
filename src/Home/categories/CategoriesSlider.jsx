import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../firebase/FirebaseConfig";

function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const q = query(collection(db, "categories"));
      const data = await getDocs(q);
      const categoriesList = data.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
    };

    getCategories();
  }, []);

  return (
    <>
      <div className="bg-slate-100 mt-4 pt-2 rounded-lg p-2 md:p-4">
        <div className="pl-2 pt-1 md:pt-4 font-semibold md:text-3xl">
          What are you looking for?
        </div>
        <div className="filter-main p-5 flex items-center gap-5 overflow-scroll md:mt-3">
          {categories.map((category) => (
            <Link to={`/menu/${category.value}`} key={category.id} className="rounded-lg">
              <div className="w-20 md:w-28 lg:w-36 lg:h-36 md:h-24 bg-white rounded-full overflow-hidden">
                {/* You can replace the image URL with the category image URL */}
                <img
                  src={category.imageurl}
                  alt={category.categoryName}
                  className="rounded-full w-full h-full "
                />
              </div> 
              <div className="flex items-center justify-around font-semibold mt-1 text-sm md:text-lg lg:text-xl">
                {category.categoryName} {/* Dynamically display the category name */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoriesSlider;
