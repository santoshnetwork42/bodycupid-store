import { Logger } from "aws-amplify";
import { extname } from "path";

import { STORE_ID } from "~/config";
import fetchData from "~/utils/fetchData";
import { getRedirects, createRedirects, updateRedirects } from "~/graphql/api";

const logger = new Logger("HandleRedirect", "VERBOSE");

const handleRedirect = async (path, defaultRedirect = "/collections/all") => {
  logger.verbose("Triggered handleRedirect", path, defaultRedirect);

  const extension = extname(path);
  logger.debug("handleRedirect > extension", extension);

  const pageRedirect = await fetchData(getRedirects, {
    slug: path,
    storeId: STORE_ID,
  }).then((resp) => resp.getRedirects);

  logger.verbose("handleRedirect > pageRedirect", pageRedirect);
  logger.info("handleRedirect > should redirect", !!pageRedirect?.redirect);
  if (!!pageRedirect?.redirect && pageRedirect.redirect !== path) {
    return {
      redirect: {
        destination: pageRedirect.redirect,
        permanent: true,
      },
    };
  }

  if (!!pageRedirect?.slug) {
    logger.verbose("handleRedirect > updateRedirects");
    await fetchData(updateRedirects, {
      input: {
        storeId: STORE_ID,
        slug: path,
        hitCount: (pageRedirect?.hitCount || 0) + 1,
      },
    });
  }

  if (!pageRedirect && !extension) {
    logger.verbose("handleRedirect > createRedirects");
    await fetchData(createRedirects, {
      input: {
        storeId: STORE_ID,
        slug: path,
      },
    });
  }

  logger.verbose("handleRedirect > return defaultRedirect", defaultRedirect);
  return {
    redirect: {
      destination: defaultRedirect,
      permanent: false,
    },
  };
};

export default handleRedirect;
