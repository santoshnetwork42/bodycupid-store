const intToHex = (nr) => {
  return nr.toString(16).padStart(2, '0');
}

const getRandomString = (bytes) => {
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues).map(intToHex).join('');
}
 
export default getRandomString;
