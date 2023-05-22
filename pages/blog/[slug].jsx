import NextImage from "next/image";
import Head from "next/head";
import ALink from "~/components/features/custom-link";
import { getBlog } from "~/graphql/queries";
import fetchData from "~/utils/fetchData";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

function PostSingle({ blog: post }) {
  const { seo, featuredImage, createdAt, title, content } = post;

  return (
    <main className="main skeleton-body">
      <Head>
        <title>{seo?.pageTitle}</title>
      </Head>

      <h1 className="d-none">Wow life science - Blog Single</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>

            <li>{seo?.pageURL}</li>
          </ul>
        </div>
      </nav>

      <div className="page-content with-sidebar">
        <div className="container">
          <div className="row gutter-lg">
            <div>
              <div className="post post-single ">
                <figure className="post-media">
                  <ALink href="#">
                    <NextImage
                      src={getPublicImageURL(featuredImage)}
                      alt={title}
                      width={900}
                      height={500}
                      loading="eager"
                      priority
                    />
                  </ALink>
                </figure>

                <div className="post-details">
                  <div className="post-meta">
                    on{" "}
                    <ALink href="#" className="post-date">
                      {new Date(createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        timeZone: "UTC",
                      })}
                    </ALink>
                  </div>
                  <h4 className="post-title">
                    <ALink href="#">{title}</ALink>
                  </h4>
                  <div className="post-body mb-7">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  try {
    const { params } = context;
    const { slug } = params || {};

    const res = await fetchData(getBlog, {
      id: slug,
    });
    return {
      props: {
        blog: res?.getBlog,
      },
    };
  } catch (error) {
    Logger.error("error in fetching of blog", error);
  }
  return {
    notFound: true,
  };
};

export default PostSingle;
