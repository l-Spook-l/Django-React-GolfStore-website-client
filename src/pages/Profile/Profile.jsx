import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { Alert, Col, Container, Nav, Row } from "react-bootstrap";
import Cart from "../../components/Cart/Cart";
import { useLocation } from "react-router-dom";
import Subscribes from "../../components/Subscribes/Subscribes";
import Wallet from "../../components/Wallet/Wallet";
import style from "./Profile.module.css";
import UserInfo from "../../components/UserInfo/UserInfo";
import Wishlist from "../../components/Wishlist/Wishlist";

const Profile = observer(() => {
  const { user } = useContext(Context);

  const location = useLocation();

  const state = location.state;

  const [activeTab, setActiveTab] = useState("userInfo");

  const [view, setView] = useState(<UserInfo />);

  useEffect(() => {
    blurHandler(state);
  }, [state]);

  const blurHandler = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "userInfo":
        setView(<UserInfo />);
        break;
      case "cart":
        setView(<Cart />);
        break;
      case "wishlist":
        setView(<Wishlist />);
        break;
      case "subscribe":
        setView(<Subscribes />);
        break;
      case "wallet":
        setView(<Wallet />);
        break;
    }
  };
  console.log("jsdfj;dskgf;ksdg;f activeTab", activeTab);

  return (
    <Container style={{ paddingTop: "63px" }}>
      <Row className="">
        <Col md={3} className={style.blockWithMenu}>
          <Nav className="d-flex flex-column">
            <Alert
              className={`${style.alertMenu} ${activeTab === "userInfo" ? style.alertMenuActive : ""}`}
              onClick={() => blurHandler("userInfo")}
            >
              {user.user.first_name} {user.user.last_name}
              <span>{user.user.email}</span>
            </Alert>
            <hr />
            <Alert
              className={`${style.alertMenu} ${activeTab === "cart" ? style.alertMenuActive : ""}`}
              onClick={() => blurHandler("cart")}
            >
              My Cart
            </Alert>

            <Alert
              className={`${style.alertMenu} ${activeTab === "wishlist" ? style.alertMenuActive : ""}`}
              onClick={() => blurHandler("wishlist")}
            >
              Wishlist
            </Alert>
            <Alert
              className={`${style.alertMenu} ${activeTab === "subscribe" ? style.alertMenuActive : ""}`}
              onClick={() => blurHandler("subscribe")}
            >
              Subscriptions
            </Alert>
            <Alert
              className={`${style.alertMenu} ${activeTab === "wallet" ? style.alertMenuActive : ""}`}
              onClick={() => blurHandler("wallet")}
            >
              My Wallet
            </Alert>
          </Nav>
        </Col>
        <Col md={9}>{view}</Col>
      </Row>
    </Container>
  );
});

export default Profile;
