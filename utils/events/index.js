import { getFirstVariantId } from "~/utils/products";

export const itemMapper = (product, coupon) => {
  let { variantId, id, title, category, subCategory, section, price, listingPrice, qty = 1, vendor } = product;

  if (!variantId) {
    variantId = getFirstVariantId(product);
  }

  if (!variantId) {
    variantId = id;
  }

  return {
    value: price * qty,
    attributes: {
      item_id: id,
      item_name: title,
      affiliation: "",
      coupon: coupon?.code || "",
      discount: listingPrice - price,
      item_brand: vendor,
      item_category: category?.name || "",
      item_category2: subCategory?.name || "",
      item_list_id: section?.id || "",
      item_list_name: section?.name || "",
      item_variant: variantId,
      location_id: "",
      price: price.toString(),
      quantity: qty.toString()
    },
    items: [{
      item_id: id,
      item_name: title,
      affiliation: "",
      coupon: "",
      discount: listingPrice - price,
      index: 0,
      item_brand: vendor,
      item_category: category?.name || "",
      item_category2: subCategory?.name || "",
      item_list_id: section?.id || "",
      item_list_name: section?.name || "",
      item_variant: variantId,
      location_id: "",
      price: price,
      quantity: qty
    }]
  };
};

export const orderMapper = (products, coupon) => {
  return products.reduce(({ value, attributes, items }, product, index) => {
    const { items: [item], attributes: dt, value: v } = itemMapper(product, coupon);
    return {
      value: value + v,
      attributes: [...attributes, dt],
      items: [...items, { ...item, index }]
    }
  }, { value: 0, attributes: [], items: [] });
};