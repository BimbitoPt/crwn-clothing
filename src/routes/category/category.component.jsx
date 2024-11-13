import { useEffect, Fragment, useMemo } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainer, Title } from "./category.styles";
import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectIsCategoriesLoading,
} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsCategoriesLoading);

  // Memoize products to optimize re-renders
  const products = useMemo(() => {
    return categoriesMap && categoriesMap[category];
  }, [category, categoriesMap]);

  useEffect(() => {
    if (!products) {
      console.log("Category not found:", category); // Debugging
    }
  }, [category, products]);

  // Handle case when products are not found
  if (!category) {
    return <div>Invalid category.</div>;
  }

  if (!categoriesMap || !products) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder
  }

  if (products.length === 0) {
    return <div>No products found in this category.</div>;
  }

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
