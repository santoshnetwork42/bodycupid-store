import { getFirstVariantId } from "~/utils/products";

export const itemMapper = (product, coupon) => {
  let { variantId, id, title, category, subCategory, section, price, listingPrice, qty = 1, vendor, sku } = product;

  if (!variantId) {
    variantId = getFirstVariantId(product);
  }

  if (!variantId) {
    variantId = id;
  }

  return {
    value: price * qty,
    attribue: {
      content_category: category?.name,
      content_subcategory: subCategory?.name,
      content_ids: [sku],
      content_name: title,
      content_type: "product_group",
      currency: "INR",
      num_items: 1,
      value: price,
    },
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
  const defaultAttribute = {
    content_ids: [],
    content_type: "product_group",
    currency: "INR",
    num_items: 0,
    value: 0,
  };

  return products.reduce(({ value, attributes, items, attribue }, product, index) => {
    const { items: [item], attributes: dt, value: v, attribue: a } = itemMapper(product, coupon);
    return {
      attribue: {
        ...attribue,
        content_ids: [...attribue.content_ids, ...a.content_ids],
        num_items: attribue.num_items + a.num_items,
        value: attribue.value + a.value
      },
      value: value + v,
      attributes: [...attributes, dt],
      items: [...items, { ...item, index }]
    }
  }, { value: 0, attributes: [], items: [], attribue: defaultAttribute });
};