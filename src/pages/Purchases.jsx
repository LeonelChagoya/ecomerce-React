import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../store/slices/purchases.slice";
import Table from "react-bootstrap/Table";

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());

    console.log(purchases);
  }, []);

  return (
    <div>
      <h1>Purchases</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>title</th>
            <th>unit</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.createdAt}</td>
              <td>{purchase.cart.products[0]?.title}</td>
              <td>{purchase.cart.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Purchases;
