import React, { useEffect, useState } from "react";
import "../App.css";
import {
  filterCategoryThunk,
  filterProductsThunk,
  getProductsThunk,
} from "../store/slices/products.slice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  InputGroup,
  Button,
  Form,
  ListGroup,
} from "react-bootstrap";
import axios from "axios";
import { addCartThunk } from "../store/slices/cart.slice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [productId, setProductId] = useState(Number);

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  const addCart = () => {
    alert("añadiendo");
    const productAdd = {
      id:productId,
      quantity,
    };

    dispatch(addCartThunk(productAdd));
    console.log(productAdd);
  };

  return (
    <div>
      <Row>
        <Col lg={3}>
          <ListGroup as="ul">
            <ListGroup.Item active>Categories</ListGroup.Item>
            <ListGroup.Item>
              {categories.map((category) => (
                <ListGroup.Item
                  key={category.id}
                  onClick={() => dispatch(filterCategoryThunk(category.id))}
                >
                  {category.name}
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <h1>Home</h1>
          <InputGroup className="mb-3">
            <Button
              variant="primary"
              onClick={() => dispatch(filterProductsThunk(searchValue))}
            >
             <i className="fi fi-rr-search"></i>
            </Button>
            <Form.Control
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </InputGroup>

          <Row xs={1} md={2} className="g-4">
            {products.map((product) => (
             
              <Col key={product.id}>
                
                <Card>
                  <Card.Img
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="productImage"
                    variant="top"
                    src={product.productImgs?.[0]}
                  />

                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>

                    <Card.Text>
                      Price
                      <br />${product.price}
                    </Card.Text>
                    
                     
                      
                      <Button className="buttonShop"
                        variant="primary"
                        id="button-addon1"
                        onClick={addCart}
                       
                      >
                        <i className="fi fi-bs-shopping-cart"></i>
                      </Button>
                  
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
