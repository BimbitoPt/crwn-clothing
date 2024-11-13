import { createSelector } from "reselect";

// Select the categories slice from the Redux state
const selectCategoryReducer = (state) => state.categories;

// Select the 'categories' array from the categories slice
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// Memoize and create the categories map from categories
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    // If categories is empty or undefined, return an empty object to avoid unnecessary work
    if (!categories || categories.length === 0) return {};

    // Use reduce to create the categoriesMap
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectIsCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
