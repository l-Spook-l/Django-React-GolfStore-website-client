import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  fetchOneCategory,
  fetchProductsByCategory,
} from "../../http/productAPI";
import {
  Alert,
  Breadcrumb,
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import PriceBar from "../../components/PriceBar/PriceBar";
import BrandBar from "../../components/BrandBar/BrandBar";
import Paginations from "../../components/UI/Paginations/Paginations";
import ProductList from "../../components/ProductList";
import TypeBar from "../../components/TypeBar/TypeBar";
import { MAIN_ROUTE } from "../../utils/consts";

const CategoryPage = observer(() => {
  const { product } = useContext(Context);

  const { slug } = useParams();
  console.log("slug", slug);

  // первое получение типов, брєндов, продуктов
  useEffect(() => {
    fetchOneCategory(slug).then((data) => {
      product.setTypes(data.type);
      product.setBrands(data.brand);
      console.log("CategoryPage - fetchOneCategory - data", data);
    });
    fetchProductsByCategory(slug, null, null, 1, null, null, null).then(
      (data) => {
        product.setProducts(data.results);
        product.setTotalCount(data.count);
        console.log("CategoryPage - fetchProductsByCategory - data", data);
      }
    );
  }, [slug]);

  useEffect(() => {
    fetchProductsByCategory(
      slug,
      product.selectedType.map((el) => el.slug).join(", "),
      product.selectedBrand.map((el) => el.slug).join(", "),
      product.page,
      product.priceMin,
      product.priceMax,
      product.ordering
    ).then((data) => {
      product.setProducts(data.results);
      product.setTotalCount(data.count);

      /* console.log('category page - data', data)
      console.log('category page - data results', data.results)
      console.log('category page - product types', product.types)
      console.log('category page - product brand', product.brands)
      console.log('category page - product selectedType', product.selectedType) */
    });
  }, [
    product.selectedType,
    product.selectedBrand,
    product.page,
    product.priceMin,
    product.priceMax,
    product.ordering,
  ]);

  const clearFilter = () => {
    product.setSelectedType("clear");
    product.setSelectedBrand("clear");
  };

  //console.log('category', category)
  //console.log('category results', category.results[0].name)
  //console.log("CategoryPage - product", product);
  //console.log('CategoryPage - product selectedType', product.selectedType)
  //console.log('CategoryPage - product brands', product.brands)
  //console.log('CategoryPage - product types', product.types)

  const category = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Container style={{ paddingTop: "63px" }}>
      <Breadcrumb className="mt-2">
        <Breadcrumb.Item>
          <NavLink to={MAIN_ROUTE}>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{category}</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-3">
        <Col md={10} className="d-flex flex-wrap mb-0 ">
          {product.selectedType.length !== 0 ||
          product.selectedBrand.length !== 0 ? (
            <Button
              style={{ height: "46px", marginRight: "10px" }}
              onClick={() => clearFilter()}
            >
              Очистить
            </Button>
          ) : null}
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
            <TypeBar />
            <PriceBar />
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

export default CategoryPage;
