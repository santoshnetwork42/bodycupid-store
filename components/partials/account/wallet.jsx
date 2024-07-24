import { useRuleEngine } from "@wow-star/utils";
import { API } from "aws-amplify";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import {
  BackArrow,
  CreditPoint,
  DebitPoint,
  Ellipse,
  PendingLock,
  WalletLogo,
} from "~/components/icons";
import { STORE_ID } from "~/config";
import { getLoyalty } from "~/graphql/api";
import { errorHandler } from "~/utils/errorHandler";
import fetchData from "~/utils/fetchData";
import { useWindowDimensions } from "~/utils/getWindowDimension";

const Wallet = (props) => {
  const { user } = props;
  const [WowCash, setWowCash] = useState({
    transactions: [],
    totalAllotted: 0,
    totalUsed: 0,
    totalUsable: 0,
    totalExpired: 0,
  });

  useEffect(async () => {
    try {
      const { data } = await API.graphql({
        query: getLoyalty,
        variables: {
          input: { storeId: STORE_ID, userId: user?.id },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      setWowCash({
        ...data?.getLoyalty,
        transactions: data?.getLoyalty?.transactions?.filter(
          (item) => item?.status !== "CANCELLED"
        ),
      });
    } catch (error) {
      errorHandler(error);
    }
  }, []);

  const eventTitle = (eventType) => {
    const eventTitles = {
      CREDIT_PREPAID_ORDER: "Cashback added",
      CREDIT_COD_ORDER: "Cashback added",
      CREDIT_USER_SIGNUP: "Cashback added",
      DEBIT_PREPAID_ORDER: "Cashback debited",
      DEBIT_COD_ORDER: "Cashback debited",
      DEBIT_EXPIRED: "Cashback expired",
      DEBIT_BY_ADMIN: "Cashback debited",
      CREDIT_BY_ADMIN: "Promotional cashback",
      CREDIT_ORDER_REFUNDED: "Cashback added",
      CREDIT_BY_MOENGAGE: "Promotional cashback",
    };
    return eventTitles[eventType] || "";
  };

  const expireLabel = (date) => {
    const days = dayjs(date).diff(dayjs(), "days");
    if (days > 0 && days < 7) {
      return `Expires in ${days} day(s)`;
    } else if (days > 0) {
      return `Expires on ${dayjs(date).format("DD MMM YYYY")}`;
    } else if (days === 0) {
      return `Expires today`;
    } else if (dayjs(date).valueOf() <= dayjs().valueOf()) {
      return `Expired on ${dayjs(date).format("DD MMM")}`;
    }
  };

  const eventDescription = (eventType, reason) => {
    const eventTitles = {
      CREDIT_PREPAID_ORDER: "Cashback for Order",
      CREDIT_COD_ORDER: "Cashback for Order",
      CREDIT_USER_SIGNUP: "Joining Bonus",
      DEBIT_PREPAID_ORDER: "Used against Order",
      DEBIT_COD_ORDER: "Used against Order",
      DEBIT_BY_ADMIN: reason || "",
      CREDIT_BY_ADMIN: reason || "",
      CREDIT_ORDER_REFUNDED: "Refunded against Order",
      CREDIT_BY_MOENGAGE: reason || "",
      DEBIT_BY_MOENGAGE: reason || "",
    };
    return eventTitles[eventType] || "";
  };

  const itemImage = (transactionState, isBlur) => {
    if (transactionState === "CREDIT") {
      return <CreditPoint size={40} color={isBlur ? "#666666" : "#32B566"} />;
    } else if (transactionState === "DEBIT") {
      return <DebitPoint size={40} color={isBlur ? "#666666" : "#E61F42"} />;
    }
    //  else if (transactionState === "CREDIT") {
    //   return Icons.credited;
    // }
  };

  const ViewTransaction = ({ data }) => {
    const {
      event,
      transactionState,
      amount,
      expiresAt,
      status,
      reason,
      metadata,
    } = data || {};

    const isExpired = useMemo(
      () => dayjs(expiresAt).valueOf() <= dayjs().valueOf(),
      [expiresAt]
    );
    const { orderCode = "" } = metadata ? JSON.parse(metadata) : {};
    const { orderId = "" } = metadata ? JSON.parse(metadata) : {};
    return (
      <div
        className={`${
          status === "PENDING" || isExpired
            ? "pending-transaction"
            : "loyalty-transaction"
        } ${
          isMobile ? "gap-8 pt-2 pl-2 pr-2 pb-2" : "gap-20 pt-2 pl-5 pr-5 pb-2"
        }`}
      >
        <div className="pt-1">
          {itemImage(transactionState, isExpired || status === "PENDING")}
        </div>
        <div className={`d-flex-col grow-1 ${isMobile ? "" : "mt-1"}`}>
          <div className="d-flex ">
            <div
              className={`d-flex font-size-14 font-weight-6 grow-1 ${
                status === "PENDING" || isExpired ? "" : "text-black"
              } `}
            >
              {eventTitle(event)}
            </div>
            <div className="font-size-13 font-weight-8">
              {transactionState === "CREDIT" ? (
                status === "PENDING" || isExpired ? (
                  <span className="" style={{ color: "#848484" }}>
                    {"+₹"}
                    {amount?.toFixed(2)}
                  </span>
                ) : (
                  <span className="" style={{ color: "#32B566" }}>
                    {"+₹"}
                    {amount?.toFixed(2)}
                  </span>
                )
              ) : status === "PENDING" ? (
                <></>
              ) : (
                <span className="" style={{ color: "#E51F42" }}>
                  {"-₹"}
                  {amount?.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <div className="d-flex font-size-10 font-weight-3 gap-6">
            <div
              className={`grow-1 ${
                isMobile ? "line-height-normal" : "line-height-20"
              }`}
            >
              {eventDescription(event, reason)}
              {orderCode && (
                <>
                  {" "}
                  <ALink href={`/order/${orderId}`}>#{orderCode}</ALink>
                </>
              )}
            </div>
            {status === "PENDING" ? (
              <div className="expiry-label">
                <div className="d-flex align-items-center">
                  <div className="lock-margin-1">
                    <PendingLock size={14} />
                  </div>
                  <div className="font-size-10 font-weight-5 tip vis">
                    {useRuleEngine(event)?.description || "N/A"}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {!!expiresAt && (
                  <div
                    className={
                      status === "PENDING" || isExpired
                        ? "expiry-label expired"
                        : "expiry-label wrap"
                    }
                  >
                    <div>{expireLabel(expiresAt)}</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  const History = ({ Transaction }) => {
    const { data, title } = Transaction;

    return (
      <div className="">
        <div className="mb-2 font-size-13 font-weight-6 text-black">
          {title}
        </div>
        <div className="d-flex-col gap-8">
          {data?.map((transaction, index) => (
            <ViewTransaction key={index} data={transaction} />
          ))}
        </div>
      </div>
    );
  };

  const { transactions, totalAllotted, totalUsed, totalUsable, totalExpired } =
    WowCash;

  const groupedTransactions = useMemo(() => {
    if (transactions) {
      const sortedTransactions = [...transactions].sort((a, b) =>
        dayjs(b.createdAt).diff(dayjs(a.createdAt))
      );
      return sortedTransactions.reduce((result, transaction) => {
        const createdAtDate = dayjs(transaction.createdAt).format(
          "DD MMM, YYYY"
        );
        const existingGroup = result.find(
          (group) => group.title === createdAtDate
        );

        if (existingGroup) {
          existingGroup.data.push(transaction);
        } else {
          result.push({
            title: createdAtDate,
            data: [transaction],
          });
        }

        return result;
      }, []);
    }
    return [];
  }, [transactions]);

  const { isSmallSize: isMobile } = useWindowDimensions();

  return (
    <div className="loyalty">
      <div className="d-flex wow-cash">
        <div className="d-flex">
          <div className="mt-5 ">
            <ALink href="/pages/account" className="d-flex align-items-center">
              <BackArrow size={`${isMobile ? 18 : 24}`} color="none" />
            </ALink>
          </div>
          <div className="d-flex pt-6 wow-cash-title font-weight-8 font-size-20">
            Cupid Coins
            <div className="backImg">
              <WalletLogo size={100} color="none" />
              {/* <WowCashGradientLine color="none" /> */}
            </div>
          </div>
        </div>
        <div className="d-flex pt-2 pb-2">
          <div className="d-flex-col gap-8 grow-1">
            <div className="wow-cash-balance">
              Available Balance{" "}
              <div className="balance-tooltip">
                <Ellipse className="" size={14} color="none" />
                <div className="font-size-10 font-weight-5 tip vis">
                  This section talks about the terms and rules of the cashback.
                </div>
              </div>
            </div>
            <div className="text-transform-capital font-weight-8 font-size-20 line-height-26 rupee-color">
              {!!totalUsable && totalUsable > 0
                ? `₹${totalUsable?.toFixed(2)}`
                : "0.00"}
            </div>
            <div className="font-size-11 font-weight-4 text-black">
              Cashback applies automatically
            </div>
          </div>
        </div>
      </div>
      <div className="pl-3 pr-3 pt-2 pb-2" style={{ background: "#F1F1F1" }}>
        <div className="d-flex justify-content-between">
          <div className="font-weight-6 font-size-11 text-black">
            Total cashback earned ₹{totalAllotted?.toFixed(2)}
          </div>
          <div className="font-weight-6 font-size-11 text-black">
            Cashback redeemed ₹{totalUsed?.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="mobile-tabs-content">
        <div className="pt-5 pb-4 line-height-16 font-size-16 font-weight-7 text-black">
          RECENT HISTORY
        </div>

        <div
          className=""
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {groupedTransactions?.map((Transaction, index) => (
            <History Transaction={Transaction} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps, {})(Wallet);
