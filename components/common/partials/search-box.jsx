import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { API, graphqlOperation } from "aws-amplify";

import ALink from "~/components/features/custom-link";

import { searchProductsBasic } from "~/graphql/api";

import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { STORE_ID } from "~/config";

function SearchForm({ type = "input" }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [timer, setTimer] = useState(null);
  const [data, setData] = useState([]);

  const searchProducts = useCallback(async (searchTerm) => {
    const {
      data: {
        searchProducts: { items },
      },
    } = await API.graphql(
      graphqlOperation(searchProductsBasic, {
        filter: {
          storeId: { eq: STORE_ID },
          status: { eq: "ENABLED" },
          title: { matchPhrasePrefix: searchTerm },
        },
      })
    );
    setData(items);
  }, []);

  useEffect(() => {
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    setSearch("");
  }, [router.query.slug]);

  useEffect(() => {
    if (search.length > 2) {
      if (timer) clearTimeout(timer);
      let timerId = setTimeout(() => {
        searchProducts(search);
        setTimer(null);
      }, 500);

      setTimer(timerId);
    }
  }, [search]);

  useEffect(() => {
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }, [router.pathname]);

  function removeXSSAttacks(html) {
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    // Removing the <script> tags
    while (SCRIPT_REGEX.test(html)) {
      html = html.replace(SCRIPT_REGEX, "");
    }

    // Removing all events from tags...
    html = html.replace(/ on\w+="[^"]*"/g, "");

    return {
      __html: html,
    };
  }

  function matchEmphasize(name) {
    let regExp = new RegExp(search, "i");
    return name.replace(regExp, (match) => "<strong>" + match + "</strong>");
  }

  function onSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.parentNode.classList.toggle("show");
  }

  function onBodyClick(e) {
    if (e.target.closest(".header-search"))
      return (
        e.target.closest(".header-search").classList.contains("show-results") ||
        e.target.closest(".header-search").classList.add("show-results")
      );

    document.querySelector(".header-search.show") &&
      document.querySelector(".header-search.show").classList.remove("show");
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: "/collections/all",
      query: {
       
        search: search,
      },
    });
  }

  return (
    <div
      className={`header-search  ${
        type === "icon" ? "hs-toggle d-block" : "hs-simple"
      }`}
    >
      <a
        href="#"
        className="search-toggle"
        role="button"
        onClick={onSearchClick}
      >
        {type === "icon" ? (
          <i className="d-icon-search"></i>
        ) : (
          <i className="icon-search-3"></i>
        )}
      </a>
      <form
        action="#"
        method="get"
        onSubmit={onSubmitSearchForm}
        className="input-wrapper"
      >
        <input
          type="text"
          className="form-control"
          name="search"
          autoComplete="off"
          value={search}
          onChange={onSearchChange}
          placeholder="Search..."
          required
        />

        <button className="btn btn-search" type="submit" aria-label="search">
          <i className="d-icon-search"></i>
        </button>

        <div className="live-search-list bg-white scrollable">
          {search.length > 2 &&
            data.map((product, index) => {
              const images =
                product.images?.items.sort((a, b) => a.position - b.position) ||
                [];

              const thumbImage = images.find((i) => i.isThumb) ||
                images[0] || { imageKey: product.imageUrl };
              return (
                <ALink
                  href={`/product/${product.slug}`}
                  className="autocomplete-suggestion"
                  key={`search-result-${index}`}
                >
                  <LazyLoadImage
                    effect="opacity"
                    src={getPublicImageURL(thumbImage.imageKey)}
                    width={40}
                    height={40}
                    alt={thumbImage.alt}
                  />
                  <div
                    className="search-name ml-1"
                    dangerouslySetInnerHTML={removeXSSAttacks(
                      matchEmphasize(product.title)
                    )}
                  ></div>
                  <span className="search-price">
                    <span className="new-price">
                      ₹{toDecimal(product.price)}
                    </span>
                  </span>
                </ALink>
              );
            })}
        </div>
      </form>
    </div>
  );
}

export default React.memo(SearchForm);
