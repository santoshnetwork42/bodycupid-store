import ALink from "~/components/features/custom-link";
import OptimizedImage from "~/components/features/optimized-image";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function ShopBanner(props) {
  const { category } = props;
  const {
    subTitle = "",
    title = "Wow Shop",
    current = "Wow Shop",
    bannerUrl,
    bannerImage,
  } = category || {};

  return (
    <>
      {/* <div
        className="page-header"
        style={{
          backgroundImage: bannerUrl
            ? `url(${bannerImage?.originalUrl || getPublicImageURL(bannerUrl)})`
            : null,
          backgroundColor: "#3C63A4",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {subTitle ? <h3 className="page-subtitle">{subTitle}</h3> : ""}
        {title ? <h1 className="page-title">{title}</h1> : ""}
        <ul className="breadcrumb">
          <li>
            <ALink href="/">
              <i className="d-icon-home"></i>
            </ALink>
          </li>
          <li className="delimiter">/</li>
          <li>{current}</li>
        </ul>
      </div> */}

      <div className="shop-banner-container">
        {/* <img
          className="shop-banner-img"
          src={getPublicImageURL(bannerUrl)}
          alt=""
        /> */}
        {bannerImage && (
          <div className="shop-banner-img">
            <figure>
              <OptimizedImage
                optimizedData={bannerImage}
                loading="eager"
                alt="category banner"
              />
            </figure>
          </div>
        )}

        <div className="shop-content">
          {subTitle ? <h3 className="page-subtitle">{subTitle}</h3> : ""}
          {title ? <h1 className="page-title">{title}</h1> : ""}
          <ul className="breadcrumb">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li className="delimiter">/</li>
            <li>{current}</li>
          </ul>
        </div>
      </div>
    </>
  );
}
