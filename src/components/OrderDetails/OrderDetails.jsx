import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateOrder } from "../../redux/slices/orderSlice";
import styles from "./OrderDetails.module.scss";

const OrderDetails = () => {
  const { id: orderId } = useParams();

  const [delay, setDelay] = useState(null);

  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState(null);

  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);

  const { id, status, priority, estimatedDelivery, orderPrice, priorityPrice } =
    order;

  useEffect(() => {
    const delayTimestamp = new Date(estimatedDelivery).getTime();
    const currentTime = new Date().getTime();
    const differenceInMilliseconds = Math.abs(currentTime - delayTimestamp);

    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const millisecondsInHour = 1000 * 60 * 60;
    const millisecondsInMinute = 1000 * 60;

    const hours = Math.floor(
      (differenceInMilliseconds % millisecondsInDay) / millisecondsInHour,
    );
    const minutes = Math.floor(
      (differenceInMilliseconds % millisecondsInHour) / millisecondsInMinute,
    );

    const formattedHours = hours > 0 ? hours + "h" : "";
    const formattedMinutes = minutes > 0 ? minutes + "min" : "";

    setDelay(formattedHours + formattedMinutes);

    const estimatedDeliveryTimestamp = new Date(estimatedDelivery);
    const formattedDate = estimatedDeliveryTimestamp.toLocaleString("en-US", {
      month: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    setEstimatedDeliveryTime(formattedDate);
  }, [orderId, estimatedDelivery]);

  const handlePrioritizeOrder = () => {
    dispatch(updateOrder(id));
  };

  return (
    <div className={styles.order}>
      <div className={styles.info}>
        
        <div className={styles.header}>
          <div>
            Order #{id} status: {status}
          </div>
          <div className={styles.details}>
            {priority && <div className={styles.priority}>priority</div>}
            <div className={styles.status}>{status} order</div>
          </div>
        </div>

        {delay && (
          <div className={styles.delivery}>
            <div>Only {delay} left 😊</div>
            <div>(Estimated delivery: {estimatedDeliveryTime})</div>
          </div>
        )}

        <div className={styles.items}>
          {order.cart.map((item) => (
            <div className={styles.itemContainer} key={item.pizzaId}>
              <div className={styles.description}>
                <div>
                  {item.quantity} * {item.name}
                </div>
              </div>
              <div>
                <span>{item.unitPrice * item.quantity} &euro;</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.price}>
          <div>Price pizza: {orderPrice} &euro;</div>
          <div>To pay on delivery: {orderPrice + priorityPrice} &euro;</div>
        </div>

        {!priority && (
          <div className={styles.action}>
            <button
              onClick={handlePrioritizeOrder}
              className={styles.actionBtn}>
              Prioritize
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
