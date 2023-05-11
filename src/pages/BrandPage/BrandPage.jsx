import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { fetchOneBrand, fetchProductsByBrand } from '../../http/productAPI';
import { Context } from '../..';
import { useParams } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import TypeBar from '../../components/TypeBar/TypeBar';
import PriceBar from '../../components/PriceBar';
import ProductList from '../../components/ProductList';
import Paginations from '../../components/UI/Paginations/Paginations';

const BrandPage = observer(() => {
  const { product } = useContext(Context);
  
  const {slug} = useParams()
  console.log('slug', slug)

  // первое получение типов, брєндов, продуктов
  useEffect(() => {
    fetchOneBrand(slug).then((data) => {
      product.setTypes(data.type)
      product.setCategories(data.categories)
      console.log('brandPage - fetchOneBrand - data', data)
    })
    fetchProductsByBrand(slug, null, null, 1, null, null, null).then((data) => {
      product.setProducts(data.results);
      product.setTotalCount(data.count);
      console.log('brandPage - fetchProductsByBrand - data', data)
    });
  }, []);

  useEffect(() => {
    fetchProductsByBrand(
      slug,
      product.selectedType.map((el) => el.slug).join(", "),
      product.selectedCategory.map((el) => el.slug).join(", "),
      product.page,
      product.priceMin,
      product.priceMax,
      product.ordering,
    ).then((data) => {
      product.setProducts(data.results);
      product.setTotalCount(data.count);

      /* console.log('brand page - data', data)
      console.log('brand page - data results', data.results)
      console.log('brand page - product ', product)
      console.log('brand page - product types', product.types)
      console.log('brand page - product categories', product.categories)
      console.log('brand page - product selectedType', product.selectedType) */
    });
  }, [product.selectedType, product.selectedCategory, product.page, product.priceMin, product.priceMax, product.ordering]);

  const clearFilter = () => {
    product.setSelectedType('clear')
    product.setSelectedCategory('clear')
  }
  //console.log('category', category)
  //console.log('category results', category.results[0].name)
  //console.log("CategoryPage - product", product);
  //console.log('CategoryPage - product selectedType', product.selectedType)
  //console.log('CategoryPage - product brands', product.brands)
  //console.log('CategoryPage - product types', product.types)

  return (
    <Container style={{paddingTop: '63px'}}>
      
      <Row className="mt-3">
        <Col md={10} className="d-flex flex-wrap mb-0 ">
        {product.selectedType.length !== 0 || product.selectedBrand.length !== 0
         ? <Button style={{height: '46px', marginRight: '10px'}} onClick={() => clearFilter()}>Очистить</Button>
         : null
         }
          {product.selectedType.map((el) => 
            <Alert 
              key={el.id}
              variant="light" 
              className="me-1 border text-dark p-2"  >
              {el.name  }
              <Button 
                type="button" 
                className="ms-1 btn-close"
                style={{fontSize: 12}}
                aria-label="Close" 
                onClick={() => product.setSelectedType(el)} 
              ></Button>
            </Alert>
            )}

{/*             {product.selectedBrand.map((el) =>
              <Alert 
                key={el.id} 
                variant="light" 
                className="me-1 border text-dark p-2"  >
                {el.name}
                <Button 
                  type="button" 
                  className="ms-1 btn-close"
                  style={{fontSize: 12}}  
                  aria-label="Close" 
                  onClick={() => product.setSelectedBrand(el)} 
                ></Button>
              </Alert>
            )} */}
        </Col>
        
        <Col md={2} className="d-flex flex-wrap align-items-end">
          {/* Сортировка по убыванию и возрастанию цены, дате создания */}
          <Form.Select className="mt-4" onChange={(e) => product.setOrdering(e.target.value)}>
            <option value="">Sorted by</option>
            <option value="-time_create">Новинки</option>
            <option value="price">Цена (От дешевых до дорогих)</option>
            <option value="-price">Цена (От дорогих до дешевых)</option>
          </Form.Select>
        </Col>

      </Row>
      <hr />
      <Row>
        <Col md={3}>
          <Col md={9}>
            <CategoryBar/>
            <TypeBar />
            <PriceBar />
          </Col>
        </Col>
        <Col md={9}>
          <ProductList />
          <Paginations />
        </Col>
      </Row>
    </Container>
  );
})

export default BrandPage