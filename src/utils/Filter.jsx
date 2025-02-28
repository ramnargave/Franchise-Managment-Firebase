export const filterFoods = (food, filterFood, searchQuery) => {
    return food.filter(food => {
      let match = true;
  
      // Category Filter
    //   if (filters.category && food.category.toLowerCase() !== filters.category.toLowerCase()) {
    //     match = false;
    //   }
      
  
      // Price Range Filter
      if (filterFood.price) {
        if (filterFood.price === '150' && food.finalprice > 150) match = false;
        if (filterFood.price === 'Below_200' && food.finalprice < 200) match = false;
        if (filterFood.price === '300' && food.finalprice < 300) match = false;
      }

      // Vegane Filter
       if (filterFood.vegane) {
        const isVeganFilter = filterFood.vegane === 'true';
          if (isVeganFilter && food.isVeg === false) match = false;
          if (!isVeganFilter && food.isVeg === true) match = false;
        }
      
      // Rating Filter
      if (filterFood.rating) {
        if (filterFood.rating === '2' && food.rating > 2) match = false;
        if (filterFood.rating === 'Below_3' && food.rating > 3) match = false;
        if (filterFood.rating === 'Above_3' && food.rating < 3) match = false;
      }


        // Name Search Filter
    if (searchQuery && !food.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        match = false;
      }
  
      return match;
    });
  }
;  