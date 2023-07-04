import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextImage from "next/image";
import { API, graphqlOperation } from "aws-amplify";
import { connect, useDispatch } from 'react-redux';
import { eventActions } from "~/store/events";
import ALink from "~/components/features/custom-link";
import { MagnifyingGlass, Search } from "~/components/icons";
import { searchProductsBasic } from "~/graphql/api";
import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { STORE_ID } from "~/config";
import { errorHandler } from "~/utils/errorHandler";

function SearchForm({ type = "input", defaultSearch = "",productSearched }) {
  const router = useRouter();
  const [search, setSearch] = useState(defaultSearch);
  const [timer, setTimer] = useState(null);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const searchProducts = useCallback(async (searchTerm) => {
    try {
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
          imageLimit: 1,
        })
      );
      setData(items);
      productSearched({
       "search term":searchTerm,
       "Item Count":items.length
      })
    } catch (error) {
      errorHandler(error);
    }
  }, []);

  useEffect(() => {
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    setSearch(defaultSearch);
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
    e.stopPropagation();
    e.currentTarget.parentNode.classList.toggle("show");
  }
  function onSearchExpand(e) {
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

  async function onSubmitSearchForm(e) {
    e.preventDefault();
    dispatch(eventActions.search(search,totalItem));
    document.querySelector(".header-search")?.classList.toggle("show");
    await router.push({
      pathname: "/collections/search",
      query: { search },
    });

    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");

    return false;
  }

  return (
    <div
      className={`header-search  ${
        type === "icon" ? "hs-toggle d-block" : "hs-simple"
      }`}
    >
      {type === "icon" && (
        <a
          href="#"
          className="search-toggle"
          role="button"
          onClick={onSearchClick}
        >
          <Search />
        </a>
      )}
      <div className="input-wrapper">
        <input
          type="text"
          className="form-control"
          name="search"
          autoComplete="off"
          value={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmitSearchForm(e);
          }}
          onChange={onSearchChange}
          placeholder="Search..."
          required
        />

        <button
          className="btn btn-search"
          type="submit"
          aria-label="search"
          onClick={onSubmitSearchForm}
        >
          <MagnifyingGlass color="currentColor" size={20} />
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
                  href={`/products/${product.slug}`}
                  className="autocomplete-suggestion"
                  key={`search-result-${index}`}
                >
                  <NextImage
                    src={getPublicImageURL(thumbImage.imageKey)}
                    width={40}
                    height={40}
                    alt={thumbImage.alt}
                    loading="eager"
                    priority
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
      </div>
    </div>
  );
}

export default connect(null, {
  productSearched: eventActions.productSearched,
})(React.memo(SearchForm));
