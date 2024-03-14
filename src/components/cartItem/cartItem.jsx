import { Button, Card, Col, Row } from "react-bootstrap";
import { Trash, Heart, HeartFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import {
  FunctionDeleteCart,
  FunctionGetCarts,
  FunctionUpdateCart,
} from "../../redux/features/CartSlice";
import "./cartItem.scss";

const CartItem = ({ item, quantities, handleIncrement, handleDecrement }) => {
  const dispatch = useDispatch();

  const formattedPrice = `$${(
    item?.price * (quantities[item?.id] || 0)
  ).toFixed(2)}`;

  const handleWishlist = async ({ id }) => {
    try {
      await dispatch(FunctionUpdateCart(id));
      dispatch(FunctionGetCarts());
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  const handleDeleteCart = async ({ id }) => {
    try {
      await dispatch(FunctionDeleteCart(id));
      dispatch(FunctionGetCarts());
    } catch (error) {
      console.error("Failed to delete cart:", error);
    }
  };

  return (
    <Row className="mb-4">
      <Col
        xs={12}
        md={3}
        xl={3}
        className="d-flex flex-column align-items-center"
      >
        <Card.Img src={item?.image} className="imgCart" />
        <Card.Text className="itemPrice">${item?.price}</Card.Text>
      </Col>
      <Col xs={12} md={9} xl={9} className="p-0">
        <Card.Body className="contentBodyCart">
          <Row className="contentBtnCart">
            <Col xs={6} md={6} xl={8} className="p-0">
              <Card.Title className="titleCart">{item?.title}</Card.Title>
            </Col>
            <Col xs={6} md={6} xl={4} className="btnCart">
              <Button
                className="btnMinus"
                onClick={() => handleDecrement({ id: item?.id })}
              >
                -
              </Button>
              <Card.Text className="amountCart">
                {quantities[item?.id] || 0}
              </Card.Text>
              <Button
                className="btnPlus"
                onClick={() =>
                  handleIncrement({ id: item?.id, note: item?.note })
                }
              >
                +
              </Button>
            </Col>
          </Row>
          <Row className="contentDescriptionCart">
            <Card.Text className="type">{item?.type}</Card.Text>
            <Card.Text className="note">
              {item?.note !== "" ? `(Note, ${item?.note} piece)` : ""}
            </Card.Text>
          </Row>
          <Row>
            <Card.Text className="color">Color : {item?.color}</Card.Text>
            <Card.Text className="size">Size : {item?.size}</Card.Text>
          </Row>
          <Row className="contentPriceCart mt-4">
            <Col xs={12} md={12} xl={9} className="contentIcon">
              <Card.Text
                onClick={() => handleDeleteCart({ id: item?.id })}
                className="remove"
              >
                <Trash className="me-2" /> Remove Item
              </Card.Text>
              <Card.Text
                onClick={() => handleWishlist({ id: item?.id })}
                className="love"
              >
                {item?.wishlist ? (
                  <HeartFill className="me-2" />
                ) : (
                  <Heart className="me-2" />
                )}{" "}
                Move to Wishlist
              </Card.Text>
            </Col>
            <Col xs={12} md={12} xl={3} className="p-0">
              <Card.Text className="price">{formattedPrice}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Col>
    </Row>
  );
};

export default CartItem;
