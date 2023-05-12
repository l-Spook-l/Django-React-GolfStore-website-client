import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import TypeBar from "../../components/TypeBar/TypeBar";
import BrandBar from "../../components/BrandBar/BrandBar";
import ProductList from "../../components/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import {
  fetchBrands,
  fetchProducts,
  fetchTypes,
  fetchCategories,
} from "../../http/productAPI";
import Paginations from "../../components/UI/Paginations/Paginations";
import PriceBar from "../../components/PriceBar";
import CategoryBar from "../../components/CategoryBar/CategoryBar";

const Shop = observer(() => {
  const { product } = useContext(Context);

  const [loading, setLoading] = useState(true);

  /* 
  console.log('shop - product page', product.page)
  console.log('shop - product types', product.types)
  console.log('shop - product brands', product.brands) */

  // первое получение типов, брєндов, продуктов
  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchCategories().then((data) => product.setCategories(data));
    fetchProducts(null, null, null, 1, null, null, null)
      .then((data) => {
        product.setProducts(data.results);
        product.setTotalCount(data.count);
        //console.log('shop - data', data)
        //console.log('shop - data.results', data.results)
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts(
      product.selectedType.map((el) => el.slug).join(", "),
      product.selectedBrand.map((el) => el.slug).join(", "),
      product.selectedCategory.map((el) => el.slug).join(", "),
      product.page,
      product.priceMin,
      product.priceMax,
      product.ordering
    )
      .then((data) => {
        product.setProducts(data.results);
        product.setTotalCount(data.count);

        //console.log('shop - data222', data)
        //console.log('shop - data222 results222', data.results)
        //console.log('shop - product types', product.types)
        //console.log('shop - product selectedType', product.selectedType)
        //console.log('shop - product selectedType slug', product.selectedType.slug)
        //console.log('shop - product type2222222', product.types.slug)
        //console.log('shop - product brand222', product.brands)
      })
      .finally(() => setLoading(false));
  }, [
    product.selectedType,
    product.selectedBrand,
    product.selectedCategory,
    product.page,
    product.priceMin,
    product.priceMax,
    product.ordering,
  ]);

  const clearFilter = () => {
    product.setSelectedType("clear");
    product.setSelectedBrand("clear");
    product.setSelectedCategory("clear");
  };

  /* console.log("shop - product", product);
  console.log('shop - product selectedType', product.selectedType)
  console.log('shop - product brands', product.brands)
  console.log('shop - product types', product.types) */

  /* if (loading) {
    return <Spinner animation='grow'/>
  } */

  return (
    <Container style={{ paddingTop: "63px" }}>
      <Row className="mt-3">
        <Col md={10} className="d-flex flex-wrap mb-0 ">
          {product.selectedType.length !== 0 ||
          product.selectedBrand.length !== 0 ||
          product.selectedCategory.length !== 0 ? (
            <Button
              style={{ height: "46px", marginRight: "10px" }}
              onClick={() => clearFilter()}
            >
              Очистить
            </Button>
          ) : null}
          {product.selectedCategory.map((el) => (
            <Alert
              key={el.id}
              variant="light"
              className="me-1 border text-dark p-2"
            >
              {el.name}
              <Button
                type="button"
                className="ms-1 btn-close"
                style={{ fontSize: 12 }}
                aria-label="Close"
                onClick={() => product.setSelectedCategory(el)}
              ></Button>
            </Alert>
          ))}

          {product.selectedType.map((el) => (
            <Alert
              key={el.id}
              variant="light"
              className="me-1 border text-dark p-2"
            >
              {el.name}
              <Button
                type="button"
                className="ms-1 btn-close"
                style={{ fontSize: 12 }}
                aria-label="Close"
                onClick={() => product.setSelectedType(el)}
              ></Button>
            </Alert>
          ))}

          {product.selectedBrand.map((el) => (
            <Alert
              key={el.id}
              variant="light"
              className="me-1 border text-dark p-2"
            >
              {el.name}
              <Button
                type="button"
                className="ms-1 btn-close"
                style={{ fontSize: 12 }}
                aria-label="Close"
                onClick={() => product.setSelectedBrand(el)}
              ></Button>
            </Alert>
          ))}
        </Col>

        <Col md={2} className="d-flex flex-wrap align-items-end">
          {/* Сортировка по убыванию и возрастанию цены, дате создания */}
          <Form.Select
            className="mt-4"
            onChange={(e) => product.setOrdering(e.target.value)}
          >
            <option value="">Sorted by</option>
            <option value="-time_create">New Arrivals</option>
            <option value="price">Price (Low to High)</option>
            <option value="-price">Price (High to Low)</option>
          </Form.Select>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={3}>
          <Col md={9}>
            <CategoryBar />
            <PriceBar />
            <TypeBar />
            <BrandBar />
          </Col>
        </Col>
        <Col md={9}>
          <ProductList />
          <Paginations />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
