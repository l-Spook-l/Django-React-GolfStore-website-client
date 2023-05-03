import React, { useContext, useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Context } from '../..';
import { createBasketForUser, fetchBasket, fetchListProductsBasket } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
  const productsTest = [
    {
      id: 1,
      name: "PING Men's G430 MAX Driver",
      price: 549,
      rating: 0,
      brand: "PING Golf",
      type: "Golf clubs",
      photo: "photos/product/PING_Mens_G430_MAX_Driver_dLLZ5Ri.jpg",
    },
    {
      id: 2,
      name: "TaylorMade Men's Stealth 2 Plus Driver",
      price: 549,
      rating: 0,
      brand: "TaylorMade Golf",
      type: "Golf clubs",
      photo: "photos/product/TaylorMade_Mens_Stealth_2_Plus_Driver.jpg",
    },
    {
      id: 3,
      name: "Callaway Men's Paradym Driver",
      price: 549,
      rating: 0,
      brand: "Callaway Golf",
      type: "Golf clubs",
      photo: "photos/product/Callaway_Mens_Paradym_Driver.jpg",
    },
    {
      id: 4,
      name: "adidas Women's Performance Golf Polo",
      price: 54,
      rating: 0,
      brand: "Adidas Golf",
      type: "Golf clothing",
      photo: "photos/product/Callaway_Mens_Paradym_Driver.jpg",
    },
  ];
  
  const {user} = useContext(Context)

  console.log('Basket user', user)
  console.log('Basket user user', user.user)
  console.log('Basket user user id', user.user.id)

  useEffect(() => {
    fetchBasket(user.user.id).then((data) => {
      console.log('Basket data one ', data)
      fetchListProductsBasket(data.id).then((products) => {
      console.log('fetchListProductsBasket products', products)
      console.log('fetchListProductsBasket products results', products.results)
      })
    })
   /*  console.log('Basket data one ', data) */
  }, [])

  return (
    <Container>
      <h2>Моя корзина</h2>
      <Row className='mt-5'>
        <Col md={2}>
        <Image width={150} height={150} src={productsTest[1].photo} />
        </Col>
      <Col md={7}>
        <h5>{productsTest[1].name}</h5>
        <p>кол-во</p>
        <p>{productsTest[1].price}</p>
      </Col>
      <Col md={3}>
        <h5>Итоговая сумма</h5>
        <p>{productsTest[1].price}</p>
        <Button>Оформить заказ</Button>
      </Col>
      </Row>

    </Container>
  )
})

export default Basket