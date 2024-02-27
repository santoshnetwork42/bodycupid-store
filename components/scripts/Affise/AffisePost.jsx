import { API } from "aws-amplify";
import { useEffect } from "react";

import { STORE_ID, AFFISE_ENABLED } from "~/config";
import { sendAffiseAnalytics } from "~/graphql/api";

function AffisePost({ order = null }) {
  console.log("order", order);
  useEffect(() => {
    const sendPostbackData = async (data) => {
      const productsTitles = data.products.items.map(
        ({ product: { title } }) => title
      );
      const paymentType = data.paymentType;
      const productNames = productsTitles.join("|");
      const totalAmount = data.totalAmount / 1.18;
      const orderValueWithTax = parseFloat(totalAmount.toFixed(2));
      try {
        const response = await API.graphql({
          query: sendAffiseAnalytics,
          variables: {
            input: {
              clickId: data.bw_clickid,
              storeId: STORE_ID,
              orderId: data.code,
              orderValue: data.totalAmount,
              orderValueWithTax,
              utmCampaign: data.bw_utm_campaign,
              discountCode: data.couponCodeId || null,
              productName: productNames,
              paymentType: paymentType.toLowerCase(),
              goal: "new",
            },
          },
        });
        if (response.data.sendAffiseAnalytics) {
          console.log("response", response.data.sendAffiseAnalytics);
        }
        console.log(
          "CK UTM source: " +
            data.bw_utm_source +
            "\nCK UTM campaign: " +
            data.bw_utm_campaign +
            "\nCK UTM medium: " +
            data.bw_utm_medium
        );
      } catch (error) {
        console.log("bw_thankyou_page_error :", error);
      }
    };
    if (!AFFISE_ENABLED || !order) return;

    try {
      // Set the survival mins for local storage data
      var ckSurvivalMinutes = 30 * 24 * 60;
      var bw_order_id = order.code;
      bw_order_id = bw_order_id.replace("#", "");
      console.log("CK thankyou script initiated");

      var count = localStorage.getItem("bw_count")
        ? parseInt(localStorage.getItem("bw_count"))
        : 0;
      if (!bw_order_id && count <= 2) {
        count += 1;
        localStorage.setItem("bw_count", count);
        location.reload();
      } else {
        localStorage.removeItem("bw_count");
      }

      // Function to retrieve data from local storage with a specific prefix
      var getCKLocalData = function (prefix) {
        var keysAndValues = {};
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key.startsWith(prefix)) {
            var value = localStorage.getItem(key);
            keysAndValues[key] = value;
          }
        }
        return keysAndValues;
      };

      // Function to delete data from local storage with a specific prefix
      var deleteCKLocalData = function () {
        Object.keys(localStorage).forEach(function (key) {
          if (/^bw_/.test(key)) {
            localStorage.removeItem(key);
          }
        });
      };

      // Retrieve local storage data with a specific prefix
      var ckLocalData = getCKLocalData("bw_");
      console.log("ckLocalData :", ckLocalData);

      // Check if local storage data is present and within the survival days
      if (
        ckLocalData.bw_timestamp &&
        ckLocalData.bw_clickid &&
        (ckLocalData.bw_utm_medium === "affise_affiliate" ||
          ckLocalData.bw_utm_medium.toLowerCase().includes("affise_affiliate"))
      ) {
        console.log("inside if");
        var epochTimestamp = ckLocalData.bw_timestamp;
        var date = new Date(epochTimestamp * 1000);
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, "0");
        var day = String(date.getDate()).padStart(2, "0");
        var hours = String(date.getHours()).padStart(2, "0");
        var minutes = String(date.getMinutes()).padStart(2, "0");
        var seconds = String(date.getSeconds()).padStart(2, "0");
        var formattedDateTime =
          year +
          "-" +
          month +
          "-" +
          day +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds;
        var providedDate = new Date(formattedDateTime);
        var currentDate = new Date();
        var timeDifference = currentDate - providedDate;
        var minutesDifference = timeDifference / (1000 * 60);

        // Check if the difference is within the survival days
        if (minutesDifference <= ckSurvivalMinutes) {
          // Check if tracking parameters are present
          if (
            !("bw_gclid" in ckLocalData) &&
            !("bw_fbclid" in ckLocalData) &&
            !("bw_igshid" in ckLocalData) &&
            !("bw_gad_source" in ckLocalData) &&
            !("bw_msclkid" in ckLocalData)
          ) {
            // Send postback data
            const dataToPass = {
              ...ckLocalData,
              ...order,
            };
            sendPostbackData(dataToPass);
          }
        } else {
          // Delete local storage data if it's older than the survival days
          deleteCKLocalData();
        }
      } else {
        console.log("Clickid or utm_source or timestamp not found");
      }
      console.log("CK thankyou script ended");
    } catch (error) {
      console.log("bw_thankyou_page_error :", error);
    }
  }, []);

  return <></>;
}

export default AffisePost;
