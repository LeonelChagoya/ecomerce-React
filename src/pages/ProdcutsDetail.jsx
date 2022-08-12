import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCartThunk } from "../store/slices/cart.slice";
import { getProductsThunk } from "../store/slices/products.slice";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const ProdcutsDetail = () => {
  const allProducts = useSelector((state) => state.products);
  const [productDetail, setProductDetail] = useState({});
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [quantity, setQuantity] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navige = useNavigate();

  useEffect(() => {
    const productsFind = allProducts.find(
      (productsItem) => productsItem.id === Number(id)
    );
    setProductDetail(productsFind);

    const filteredProducts = allProducts.filter(
      (productsItem) => productsItem.category.id === productsFind.category.id
    );

    setSuggestedProducts(filteredProducts);
    console.log(filteredProducts);
  }, [allProducts, id]);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const addCart = () => {
    alert("añadiendo");
    const productAdd = {
      id: productDetail.id,
      quantity,
    };

    dispatch(addCartThunk(productAdd));
    console.log(productAdd);
  };
  

  

  
  return (
    <div>
      <h1>Products Details</h1>
      <img
        className="productImage"
        src={productDetail?.productImgs?.[0]}
        alt=""
      />{" "}
      <InputGroup className="mb-3">
        <Button
          variant="secondary"
          id="button-addon1"
          onClick={addCart}
        >
          Buy
        </Button>
        <Form.Control 
          placeholder="Quantity"
          aria-label="Example text with button addon"
          aria-describedby="basic-addon2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </InputGroup>
     <h3>  Discover similar items</h3>
      {suggestedProducts.map((products) => (
        
        <div
        
          key={products.id}
          onClick={() => navige(`/product/${products.id}`)}
        >
         
          {products.title}
          
        </div>
      ))}
      <InputGroup className="mb-3">
        <Button
          variant="secondary"
          id="button-addon1"
          onClick={addCart}
        >
          Buy
        </Button>
        <Form.Control 
          placeholder="Quantity"
          aria-label="Example text with button addon"
          aria-describedby="basic-addon2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </InputGroup>
      
    </div>
  );
};

export default ProdcutsDetail;
