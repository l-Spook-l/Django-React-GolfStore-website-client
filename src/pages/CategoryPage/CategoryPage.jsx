import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import Paginations from "../../components/Paginations/Paginations";
import ProductList from "../../components/ProdcutList/ProductList";
import { MAIN_ROUTE } from "../../utils/consts";
import style from "./CategoryPage.module.css";
import MyOffcanvas from "../../components/MyOffcanvasFilters/MyOffcanvasFilters";
import PriceBar from "../../components/Filters/PriceBar/PriceBar";
import TypeBar from "../../components/Filters/TypeBar/TypeBar";
import BrandBar from "../../components/Filters/BrandBar/BrandBar";

const CategoryPage = observer(() => {
  const { user } = useContext(Context);
  const { product } = useContext(Context);

  const { slug } = useParams();
  //console.log("slug", slug);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const navigate = useNavigate();

  // первое получение типов, брєндов, продуктов
  useEffect(() => {
    window.scrollTo(0, 0);
    product.setPage(1)
    product.setSelectedType("clear");
    product.setSelectedBrand("clear");
    product.setSelectedCategory("clear");
    fetchOneCategory(slug).then((data) => {
      product.setTypes(data.type);
      product.setBrands(data.brand);
      console.log("CategoryPage - fetchOneCategory - data", data);
    })
    //.finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductsByCategory(
      slug,
      product.selectedType.map((el) => el.slug).join(", "),
      product.selectedBrand.map((el) => el.slug).join(", "),
      product.page,
      product.priceMin,
      product.priceMax,
      product.ordering
    )
      .then((data) => {
        product.setProducts(data.results);
        product.setTotalCount(data.count);

        //console.log('category page - data', data)
        //console.log('category page - data results', data.results)
        //console.log('category page - product types', product.types)
        //console.log('category page - product brand', product.brands)
        //console.log('category page - product selectedType', product.selectedType)
      })
      //.finally(() => setLoading(false));
  }, [
    product.selectedType,
    product.selectedBrand,
    product.page,
    product.priceMin,
    product.priceMax,
    product.ordering,
    slug,
    user.wishList.product,
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

  const handleClose = () => {
    setShowOffcanvas(false);
  };

  const handleOpen = () => {
    setShowOffcanvas(true);
  };

  return (
    <Container className={style.forContainer}>
      <Breadcrumb className="mt-2">
        <Breadcrumb.Item onClick={() => navigate(MAIN_ROUTE)}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{category}</Breadcrumb.Item>
      </Breadcrumb>
      <button className={style.filterButton} onClick={handleOpen}>
        Filters
      </button>
      <Row className="mt-3">
        <Col md={10} className="d-flex flex-wrap mb-0 ">
          {product.selectedType.length !== 0 ||
          product.selectedBrand.length !== 0 ? (
            <Button className={style.clearButton} onClick={() => clearFilter()}>
              Clear
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
      <div className={style.shopMainBlock}>
        <div className={style.filters}>
          <PriceBar />
          <TypeBar />
          <BrandBar />
        </div>
        <div className={style.productSection}>
          <ProductList />
          <Paginations />
        </div>
      </div>
      <MyOffcanvas
        showOffcanvas={showOffcanvas}
        setShowOffcanvas={handleClose}
      />
    </Container>
  );
});

export default CategoryPage;
