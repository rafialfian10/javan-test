import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CartItem from "../cartItem/cartItem";
import { FunctionCreateTransaction } from "../../redux/features/TransactionSlice";
import { transactionsData } from "../../db/transactionData";
import Swal from "sweetalert2";
import "./cart.scss";

const Cart = ({ cartsData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});

  const handleDecrement = ({ id }) => {
    if (quantities[id] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: prevQuantities[id] - 1,
      }));
    }
  };

  const handleIncrement = ({ id, note }) => {
    console.log("data qty :",quantities[id]);
    console.log("note :", note);
    if (quantities[id] === undefined || quantities[id] < note) {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cartsData?.forEach((cartData) => {
      totalPrice += parseFloat(
        (cartData?.price * (quantities[cartData?.id] || 0)).toFixed(2)
      );
    });

    return totalPrice.toFixed(2);
  };

  const handleCheckout = async () => {
    const newTransaction = {
      id: transactionsData.length + 1,
      totalPrice: calculateTotalPrice(),
      items: cartsData?.map((cart) => ({
        id: cart?.id,
        title: cart?.title,
        price: cart?.price,
        quantity: quantities[cart?.id] || 0,
      })),
    };

    await dispatch(FunctionCreateTransaction(newTransaction));
    setQuantities({});
    Swal.fire({
      text: "Transaction Successfully",
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  return (
    <>
      <Row className="containerCarts">
        <Row className="mb-3 p-0">
          <Col xs={6} md={6} xl={6} className="d-flex jusfity-content-start">
            <Form.Text className="totalItems">
              Cart ({cartsData.length} items)
            </Form.Text>
          </Col>
          <Col xs={6} md={6} xl={6} className="d-flex justify-content-end">
            <Button onClick={() => navigate("/tableData")}>History Transaction</Button>
          </Col>
        </Row>
        <Col xs={12} md={8} xl={8} className="mb-3">
          <Card className="contentCart">
            {cartsData?.map((cartData) => (
              <CartItem
                key={cartData?.id}
                item={cartData}
                quantities={quantities}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            ))}
          </Card>
        </Col>
        <Col xs={12} md={4} xl={4}>
          <Card className="contentAmount">
            <Card.Body>
              <Card.Text className="amountTitle">The total amount of</Card.Text>
              <div className="contentTemporaryAmount">
                <Card.Text className="temporaryAmount">
                  Temporary amount
                </Card.Text>
                <Card.Text className="totalPrice">
                  ${calculateTotalPrice()}
                </Card.Text>
              </div>
              <div className="contentShopping">
                <Card.Text className="shopping">Shopping</Card.Text>
                <Card.Text className="free">Gratis</Card.Text>
              </div>
              <Card className="my-3 border border-1 border-secondary"></Card>
              <div className="contentTemporaryAmount">
                <div className="contentVat">
                  <Card.Text className="temporaryAmount">
                    The total amount of
                  </Card.Text>
                  <Card.Text className="vat">(Including VAT)</Card.Text>
                </div>
                <Card.Text className="totalPrices">
                  ${calculateTotalPrice()}
                </Card.Text>
              </div>
              <Button
                className="btnCheckout btn btn-primary"
                onClick={handleCheckout}
              >
                GO TO CHECKOUT
              </Button>
            </Card.Body>
          </Card>

          <Card className="contentOptional mt-3">
            <Card.Body>
              <Form.Select className="text-secondary">
                <option>Add a checkout code (optional)</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
