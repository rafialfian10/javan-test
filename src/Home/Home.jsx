import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FunctionGetCarts } from "../redux/features/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../components/cart/cart";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();

  const cartsData = useSelector((state) => state.cart.cartsData);

  useEffect(() => {
    dispatch(FunctionGetCarts());
  }, [dispatch]);

  return (
    <Row className="containerCarts">
      <Col xs={12} md={12} xl={12}>
        <h1 className="title">Shooping Cart</h1>
      </Col>
      <Cart cartsData={cartsData} />
    </Row>
  );
};

export default Home;
