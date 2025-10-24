import useCategories from "../hooks/useCategories";

const FilterBar = () => {
  const { categories, error, loading } = useCategories();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Category</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterBar;
