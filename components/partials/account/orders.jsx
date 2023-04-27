import React, { useCallback, useEffect, useState } from "react";
import ALink from "~/components/features/custom-link";
import { connect } from "react-redux";
import { API } from "aws-amplify";

import TokenPagination from "~/components/features/token-pagination";
import { formateDate, toDecimal } from "~/utils";
import { searchOrders } from "~/graphql/api";
import { STORE_ID } from "~/config";

function AccountOrders({ user }) {
  const [orders, setOrders] = useState([]);
  const [totalOrder, setTotalOrder] = useState();
  const [token, setToken] = useState(null);
  const perPage = 10;

  const getOrders = useCallback(
    async (reset) => {
      try {
        const {
          data: {
            searchOrders: { items, total, nextToken },
          },
        } = await API.graphql({
          query: searchOrders,
          variables: {
            filter: {
              userId: { eq: user.id },
              storeId: { eq: STORE_ID },
              status: { ne: "PENDING" },
            },
            sort: [{ field: "orderDate", direction: "desc" }],
            limit: perPage,
            nextToken: reset ? null : token,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        if (reset) {
          setOrders(items);
        } else {
          setOrders([...orders, ...items]);
        }
        setTotalOrder(total);
        setToken(nextToken);
      } catch (error) {}
    },
    [user, orders, token]
  );

  useEffect(() => {
    if (user) {
      getOrders(true);
    }
  }, []);

  return (
    <div>
      <table className="order-table mb-3">
        <thead>
          <tr>
            <th className="pl-2">Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th className="pr-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="order-number">
                <ALink href={`/order/${order.id}`}>#{order.code}</ALink>
              </td>
              <td className="order-date">
                <time>{formateDate(order.orderDate)}</time>
              </td>
              <td className="order-status">
                <span>{order.status}</span>
              </td>
              <td className="order-total">
                <span>₹{toDecimal(order.totalAmount)}</span>
              </td>
              <td className="order-action">
                <ALink
                  href={`/order/${order.id}`}
                  className="btn btn-link btn-underline"
                >
                  View
                </ALink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TokenPagination
        onPage={() => getOrders(false)}
        total={totalOrder}
        loaded={orders?.length}
        nextToken={token}
        content="orders"
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps)(AccountOrders);
