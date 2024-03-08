import React, { useEffect } from "react";

function Affise() {
  useEffect(() => {
    try {
      var ckSurvivalMinutes = 30 * 24 * 60;

      // Function to extract query parameters from the URL
      var getCKSearchParams = function () {
        var searchParams = new URLSearchParams(window.location.search);
        var params = {};
        searchParams.forEach(function (value, key) {
          params[key] = value;
        });
        return params;
      };

      // Function to store query parameters in local storage

      var storeCKInLocalStorage = function (params) {
        // Remove specific items from local storage if they are not present in 'params'
        if (!("gclid" in params)) {
          localStorage.removeItem("bw_gclid");
        }
        if (!("fbclid" in params)) {
          localStorage.removeItem("bw_fbclid");
        }
        if (!("igshid" in params)) {
          localStorage.removeItem("bw_igshid");
        }
        if (!("gad_source" in params)) {
          localStorage.removeItem("bw_gad_source");
        }
        if (!("msclkid" in params)) {
          localStorage.removeItem("bw_msclkid");
        }

        // If any of the specified parameters are present, clear all 'bw_' items from local storage
        if (
          "gclid" in params ||
          "fbclid" in params ||
          "igshid" in params ||
          "gad_source" in params ||
          "msclkid" in params
        ) {
          Object.keys(localStorage).forEach(function (key) {
            if (/^bw_/.test(key)) {
              localStorage.removeItem(key);
            }
          });
        } else {
          for (var key in params) {
            if (params.hasOwnProperty(key)) {
              localStorage.setItem("bw_" + key, params[key]);
            }
          }

          // Store the current timestamp in local storage
          var currentTimestamp = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
          localStorage.setItem("bw_timestamp", currentTimestamp);
        }
      };
      // Get the query parameters from the URL
      var ckSearchParams = getCKSearchParams();
      // console.log("ckSearchParams :", ckSearchParams);
      // Store the query parameters in local storage
      storeCKInLocalStorage(ckSearchParams);
      // console.log("head script ended");
    } catch (error) {
      console.log("bw_head_error", error);
    }
  }, []);

  return <></>;
}

export default Affise;
