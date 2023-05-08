 import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import { Alert, Col, Container, Nav, Row } from "react-bootstrap";
import Basket from "../Basket/Basket";
import { NavLink, Route, Routes } from "react-router-dom";
import WishListPage from "../WishListPage/WishListPage";
import Subscribes from "../../components/Subscribes/Subscribes";
import Wallet from "../../components/Wallet/Wallet";
import style from "./Profile.module.css"
import UserInfo from "../../components/UserInfo/UserInfo";

const Profile = observer(() => {
  const { user } = useContext(Context);

  const [activeTab, setActiveTab] = useState("basket");

  const [view, setView] = useState(<UserInfo />);

  const blurHandler = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "userInfo":
        setView(<UserInfo />);
        break;
      case "basket":
        setView(<Basket />);
        break;
      case "wishlist":
        setView(<WishListPage />);
        break;
      case "subscribe":
        setView(<Subscribes />);
        break;
      case "wallet":
        setView(<Wallet />);
        break;
    }
  };

  return (
    <Container style={{ paddingTop: "63px" }}>
      <Row className="">
        <Col md={2} className=" mt-5">
          <Nav className="d-flex flex-column">
            <Alert className={style.alertMenu} onClick={() => blurHandler('userInfo')}>{user.user.username}<p>{user.user.email}</p></Alert>
            <hr />
            <Alert className={style.alertMenu} onClick={() => blurHandler("basket")} active={activeTab === "basket"}>
              Моя корзина
            </Alert>
            <Alert className={style.alertMenu} onClick={() => blurHandler("wishlist")} active={activeTab === "wishlist"}>
              Список желаний
            </Alert>
            <Alert className={style.alertMenu} onClick={() => blurHandler("subscribe")} active={activeTab === "subscribe"}>
              Розсилки
            </Alert>
            <Alert className={style.alertMenu} onClick={() => blurHandler("wallet")} active={activeTab === "wallet"}>
              Мой кошелек
            </Alert>
          </Nav>
        </Col>
        <Col md={10}>{view}</Col>
      </Row>
    </Container>
  );
}); 

export default Profile;
