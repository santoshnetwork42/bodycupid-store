import { useAppRouter } from "~/utils/navigation";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { MagnifyingGlass, Search } from "~/components/icons";
import { eventActions } from "~/store/events";
import AutoTyper from "~/components/features/auto-typing";
import { useIsInteractive } from "~/utils/contexts/navbar";

function SearchForm({ type = "input", defaultSearch = "", productSearched }) {
  const router = useAppRouter();
  const [search, setSearch] = useState(defaultSearch);
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();
  const { pathname } = router;

  const isInteractive = useIsInteractive();

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
        onSubmitSearch();
        setTimer(null);
      }, 400);

      setTimer(timerId);
    }
  }, [search]);

  useEffect(() => {
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }, [router.pathname]);

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

  function onSubmitSearchForm(e) {
    e.preventDefault();
    onSubmitSearch();
  }

  async function onSubmitSearch() {
    dispatch(eventActions.search(search));
    document.querySelector(".header-search")?.classList.toggle("show");
    await router.push({
      pathname: "/search",
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
        {pathname === "/search" ? (
          <input
            id="search-input"
            type="text"
            className="form-control"
            name="search"
            autoComplete="off"
            value={search}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmitSearchForm(e);
            }}
            onChange={onSearchChange}
            placeholder="Search for products..."
            required
            autoFocus
          />
        ) : (
          <button
            className="form-control search-box-container"
            onClick={async () => {
              await router.push({
                pathname: "/search",
              });
            }}
          >
            <div id="search-input" type="text" name="search" required>
              {!isInteractive ? (
                <p className="m-0 font-size-16">Search for products...</p>
              ) : (
                <AutoTyper
                  dataText={[
                    "Search for Shower Gel",
                    "Search for Face Wash",
                    "Search for Body Lotion",
                    "Search for Body Scrub",
                    "Search for Perfume",
                    "Search for Body Mist",
                    "Search for Gift Set",
                  ]}
                />
              )}
            </div>
          </button>
        )}

        <button
          className="btn btn-search"
          type="submit"
          aria-label="search"
          onClick={onSubmitSearchForm}
        >
          <MagnifyingGlass color="currentColor" size={20} />
        </button>
      </div>
    </div>
  );
}

export default connect(null, {
  productSearched: eventActions.productSearched,
})(React.memo(SearchForm));
