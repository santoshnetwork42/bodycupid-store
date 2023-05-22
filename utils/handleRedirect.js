import { Logger } from "aws-amplify";

import fetchData from "~/utils/fetchData";
import { getPageRedirects, createPageRedirects } from "~/graphql/api";

const logger = new Logger("HandleRedirect");

const handleRedirect = async (path, defaultRedirect = "/collections/all") => {
  logger.verbose("Triggered handleRedirect", path, defaultRedirect);
  const pageRedirect = await fetchData(getPageRedirects, {
    slug: path,
  }).then((resp) => resp.getPageRedirects);


  logger.verbose("handleRedirect > pageRedirect", pageRedirect);
  logger.info("handleRedirect > should redirect", pageRedirect && pageRedirect.redirect !== path);
  if (pageRedirect && pageRedirect.redirect !== path) {
    return {
      redirect: {
        destination: pageRedirect.redirect,
        permanent: true,
      },
    };
  }

  if (!pageRedirect) {
    logger.verbose("handleRedirect > createPageRedirects");
    await fetchData(createPageRedirects, {
      input: {
        slug: path,
        redirect: path,
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