import crypto from "crypto";

export const hashParameter = (parameter) => {
  if (!parameter) return null;
  const sha256Hash = crypto.createHash('sha256');
  sha256Hash.update(parameter);
  return sha256Hash.digest('hex');
};

const hashParameters = (parameters) => {
  return Object.entries(parameters).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: hashParameter(value),
  }), {});
};

export default hashParameters;