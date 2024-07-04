import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import { axiosInstance } from "../config/config";
import { IItem } from "../types/types";

const Store = () => {
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
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {items.map((item) => {
          return (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Store;
