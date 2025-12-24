import MainLayout from "../layouts/MainLayout";
import FilterBar from "../components/FilterBar";
import useCartStore from "../store/cartStore";
import CardProduct from "../components/CardProduct";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const CartPage = () => {
  const { cartProducts } = useCartStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <MainLayout
      onSearch={() => undefined}
      filters={<FilterBar />}
      side={<Outlet />}
    >
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Cart</h1>
        <p className="text-gray-500">I tuoi articoli appariranno qui.</p>
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {cartProducts.map((p) => (
            <CardProduct
              key={p._id}
              product={p}
              onCartClick={() => console.log("Hi")}
              OnImgClick={() => {
                const params = searchParams.toString();
                const url = params
                  ? `/cart/product/${p._id}/${params}`
                  : `/cart/product/${p._id}`;
                navigate(url);
              }}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
