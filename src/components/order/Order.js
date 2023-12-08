import React, { useEffect, useState } from "react";
import { getOrderDetails, payOrder } from "../../api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MessageBox from "../MessageBox/MessageBox.js";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { approvePaypal, createOrderPaypal } from "../../api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

export default function Order() {
  const [order, setOrder] = useState("");
  const [paypalKey, setPaypalKey] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [reload, setReload] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const getOrder = async () => {
      const result = await getOrderDetails(id);
      setOrder(result.data);
      setTotalPrice(result.data.totalPrice);
      setPaypalKey((prevKey) => prevKey + 1);
    };
    getOrder();
  }, [id, reload]);
  console.log(totalPrice);
  const createOrder = async () => {
    try {
      console.log(totalPrice);
      const response = await createOrderPaypal(totalPrice);
      return response?.data?.id;
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  const onApprove = async (data) => {
    try {
      const response = await approvePaypal(data);
      const paypal = response?.data?.purchase_units[0]?.payments?.captures[0];
      if (paypal.status === "COMPLETED") {
        await payOrder(order._id);
        toast.success("Item(s) paid successfully");
        setReload(!reload);
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Order Details</title>
      </Helmet>
      <h1 className="my-3">Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order?.shippingAddress?.fullName} <br />
                <strong>Email:</strong> {order?.shippingAddress?.email} <br />
                <strong>Address: </strong> {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order?.orderItems?.map((item) => (
                  <ListGroup.Item key={item.product._id}>
                    <Row className="align-items-ccenter">
                      <Col md={6}>
                        <img
                          style={{ width: 50, height: 50 }}
                          src={item.product.photos}
                          alt={item.product.title}
                          className="img-prod"
                        />{" "}
                        {""}
                        <Link
                          to={`/product/${item.product._id}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {item.product.title}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>Quantity: {item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.product.price * item.quantity}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                <Row>
                  <Col
                    md={{ offset: 10 }}
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    Shipping Fee: ${order.shippingPrice}
                  </Col>
                  <Col
                    md={{ offset: 10 }}
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    Total price: ${order.totalPrice}
                  </Col>
                </Row>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order?.itemsPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order?.shippingPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order?.totalPrice?.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    <div>
                      <PayPalButtons
                        key={paypalKey}
                        createOrder={(data) => createOrder(data)}
                        onApprove={(data) => onApprove(data)}
                      />
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
