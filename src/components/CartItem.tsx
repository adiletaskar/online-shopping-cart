import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { axiosInstance } from "../config/config";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem as CartItemProps, IItem } from "../types/types";
import { formatCurrency } from "../utilities/formatCurrency";

const CartItem: React.FC<CartItemProps> = ({ id, quantity }) => {
  const { removeFromCart } = useShoppingCart();
  const [item, setItem] = useState<IItem | undefined>();

  const fetchItemById = async () => {
    try {
      const res = await axiosInstance.get(`items/${id}`);
      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItemById();
  }, []);

  if (!item) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        alt={item.name}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >&times;</Button>
    </Stack>
  );
};

export default CartItem;
