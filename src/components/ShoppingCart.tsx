import { useEffect, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { axiosInstance } from "../config/config";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { IItem } from "../types/types";
import { formatCurrency } from "../utilities/formatCurrency";
import CartItem from "./CartItem";

interface ShoppingCartProps {
  isOpen: boolean;
}
const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen }) => {
  const { closeCart, cartItems } = useShoppingCart();
  const [items, setItems] = useState<IItem[]>([]);

  const fetchItems = async () => {
    try {
      const res = await axiosInstance.get<IItem[]>("items");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = items.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
