import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { Context } from "../..";
import {
  deleteProductFromWishList,
  fetchListProductsWishList,
} from "../../http/productAPI";
import { FaTimes } from "react-icons/fa";
import style from "./Wishlist.module.css";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";

const WishListPage = observer(() => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* console.log("wishList user wishList", user.wishList);
  console.log("wishList user wishList", user.wishList.id);
  console.log("wishList user wishList", user.wishList.product); */

  /* console.log('WishListPage user', user)
  console.log('WishListPage user user', user.user)
  console.log('WishListPage user user id', user.user.id) */

  useEffect(
    () => {
      fetchListProductsWishList(user.wishList.id)
        .then((products) => {
          user.setWishList({ id: user.wishList.id, product: products.results });
        })
        .finally(() => setLoading(false));
    },
    [
      /* user.wishList.product.length */
    ]
  );

  const deleteProduct = (wishListId, productId) => {
    deleteProductFromWishList(wishListId, productId);
    const wishList = user.wishList.product.filter(
      (item) => item.product.id !== productId
    );
    user.setWishList({ id: wishListId, product: wishList });
  };

  const productSlug = (productName) => 
    {
      const name = productName.toLowerCase().replace(/\'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return name
    } 

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <Container style={{ paddingTop: "63px" }}>
      <Row>
        <h2>Wishlist</h2>
        {user.wishList.product.map((el) => (
          <Card
            border="light"
            key={el.product.id}
            className={style.cardProduct}
          >
            <Col md={{ span: 2, offset: 10 }} className="text-right">
              <Button
                onClick={() => deleteProduct(user.wishList.id, el.product.id)}
                className={style.cardProductButton}
              >
                <FaTimes />
              </Button>
            </Col>
            <Image width={180} height={180} src={el.product.photos[0]['image']} 
            onClick={() => navigate(`${PRODUCT_ROUTE}/${productSlug(el.product.name)}`)}
            />
            <div>{el.product.name}</div>
            <div className="m-auto">
              <div>{el.product.price} $</div>
            </div>
          </Card>
        ))}
      </Row>
    </Container>
  );
});

export default WishListPage;
