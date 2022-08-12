import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyCartThunk, getCartThunk } from "../store/slices/cart.slice";

const CartSidebar = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const cartProducts = useSelector((state) => state.cart);
  const navige = useNavigate();
  console.log(cartProducts);

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartProducts.map((cartProduct) => (
          <div
            key={cartProduct.id}
            onClick={() => navige(`/product/${cartProduct.id}`)}
          >
            <section className="pt-5 pb-5">
              <div className="container">
                <div className="row w-100">
                  <div className="col-lg-12 col-md-12 col-12">
                    <table
                      id="shoppingCart"
                      class="table table-condensed table-responsive"
                    >
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td data-th="Product">
                            <div className="row">
                              <div>
                                <h6>{cartProduct.title}</h6>
                                <p className="font-weight-light">
                                  {cartProduct.brand}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td data-th="Price">{cartProduct.price}</td>
                          <td data-th="Quantity">
                            <input
                              type="number"
                              className="form-control form-control-lg text-center"
                            />
                          </td>
                          <td className="actions" data-th="">
                            <div className="text-right">
                              <button className="btn btn-white border-secondary bg-white btn-md mb-2">
                                <i className="fi fi-rs-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
        <div className="float-right text-right">
          <h4>Subtotal:</h4>
          <h1></h1>
          <div className="col-sm-6 order-md-2 text-right">
            <button
              className="btn btn-primary mb-4 btn-lg pl-5 pr-5"
              onClick={() => dispatch(buyCartThunk())}
            >
              Checkout
            </button>
          </div>
        </div>
        <div className="col-sm-6 text-md-left">
          <a>
            <i className="fas fa-arrow-left mr-2"></i> Continue Shopping
          </a>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSidebar;
