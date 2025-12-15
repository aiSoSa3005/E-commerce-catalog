import MainLayout from "../layouts/MainLayout";
import FilterBar from "../components/FilterBar";

const CartPage = () => {
  return (
    <MainLayout onSearch={() => undefined} filters={<FilterBar />}>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Cart</h1>
        <p className="text-gray-500">I tuoi articoli appariranno qui.</p>
      </div>
    </MainLayout>
  );
};

export default CartPage;
