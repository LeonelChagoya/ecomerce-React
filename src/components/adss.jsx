import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCartThunk, setLoginMessage } from 'redux/actions';

const ProductInfo = ({product}) => {
    const [ quantity, setQuantity ] = useState(1);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const addToCart = () => {
        if(localStorage.getItem("token")){
            dispatch(addToCartThunk(product.id, quantity))
        } else {
            navigate("/login")
            dispatch(setLoginMessage("You have to log in to add products to your cart"));
        }
    }

    return (
        <div className="product-info">
            <div className="brand">
                {product?.brand}
            </div>
            <h2>{product?.title}</h2>
            <div className="product-data">
                <div className="product-options">
                    <div className="flex">
                        <div className="price">
                            <span className='label'>Price</span>
                            <span className="amount">
                                $ {product?.price}
                            </span>
                        </div>
                        <div className="quantity">
                            <div className="label">Quantity</div>
                            <div className="flex">
                                <button 
                                    onClick={() => setQuantity(quantity-1)}
                                    disabled={quantity <= 1}
                                >
                                    <i className="icon-minus"></i>
                                </button>
                                <div className="value">
                                    {quantity}
                                </div>
                                <button onClick={() => setQuantity(quantity+1)}>
                                    <i className="icon-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className="add-cart-button" onClick={addToCart}>
                        Add to cart <i className='icon-shopping-cart'></i>
                    </button>
                </div>
                <p className='product-description'>
                    {product?.description}
                </p>
            </div>
        </div>
    );
};

export default ProductInfo;
