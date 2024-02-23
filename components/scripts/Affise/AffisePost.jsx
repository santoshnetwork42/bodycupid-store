import React, { useEffect } from "react";

function AffisePost({ order }) {
  console.log("order", order);
  useEffect(() => {
    if (!order) return;
    try {
      // Set the survival mins for local storage data
      var ckSurvivalMinutes = 30 * 24 * 60;
      // Extract order details from Shopify variables
      var bw_order_id = order.code; // Pass order ID here
      bw_order_id = bw_order_id.replace("#", ""); // Remove '#' from the order ID
      var bw_order_value_with_tax_1 = order.totalAmount; // Extract order total amount after deduction of Taxes, any coupon code or gift vouchers used
      var bw_order_value =
        bw_order_value_with_tax_1 - bw_order_value_with_tax_1 * 0.18; // Calculate tax, if required change the value from .18 to actual tax percentage
      var bw_discount_code = order.couponCodeId; // Extract discount code used, if any
      var bw_secure_code = "FETCH FROM AFFISE"; // create a new offer in affise and get the secure postback code from offer > edit > postback > secure code
      const productsTitles = order.products.items.map(({ title }) => title);
      const productNames = productsTitles.join("|");
      var bw_product_name = encodeURIComponent(productNames); // fetch it from Array and add it here, in case of multiple product seperate it by pipe and encode the variable
      var bw_goal = ""; // pass user type whether it is new or repeat
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
      var deleteCKLocalData = function (prefix) {
        Object.keys(localStorage).forEach(function (key) {
          if (/^bw_/.test(key)) {
            localStorage.removeItem(key);
          }
        });
      };

      // Function to send postback data
      var ckPostback = function (data) {
        var url =
          "https://offers-buywow.affise.com/postback?clickid=" +
          data.bw_clickid +
          "&secure=" +
          bw_secure_code +
          "&action_id=" +
          bw_order_id +
          "&sum=" +
          bw_order_value +
          "&status=2&custom_field1=" +
          bw_order_value +
          "&custom_field2=" +
          data.bw_utm_campaign +
          "&custom_field3=" +
          bw_discount_code +
          "&custom_field5=" +
          bw_product_name;

        // Fetch the postback URL
        fetch(url)
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error));

        // Log UTM source and campaign
        console.log(
          "CK UTM source: " +
            data.bw_utm_source +
            "\nCK UTM campaign: " +
            data.bw_utm_campaign +
            "\nCK UTM medium: " +
            data.bw_utm_medium
        );
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
            ckPostback(ckLocalData);
          }
        } else {
          // Delete local storage data if it's older than the survival days
          deleteCKLocalData("bw_");
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
