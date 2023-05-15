import { getFirstVariant } from "~/utils/products";

export const itemMapper = (product, coupon) => {
  let { variantId, id, title, category, subCategory, section, price, listingPrice, qty = 1, vendor, sku } = product;
  let contentType = "product_group";

  if (!variantId) {
    variantId = getFirstVariant(product)?.id;
  }

  if (!variantId) {
    contentType = "product";
    variantId = id;
  }

  return {
    value: price * qty,
    attribute: {
      content_category: category?.name,
      content_subcategory: subCategory?.name,
      content_ids: [sku],
      content_name: title,
      content_type: contentType,
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
    content_category: [],
    content_subcategory: [],
    content_type: "product_group",
    currency: "INR",
    num_items: 0,
    value: 0,
  };

  const mappings = products.reduce(({ value, attributes, items, attribute }, product, index) => {
    const { items: [item], attributes: dt, value: v, attribute: a } = itemMapper(product, coupon);
    return {
      attribute: {
        ...attribute,
        content_category: [...attribute.content_category, a.content_category],
        content_subcategory: [...attribute.content_subcategory, a.content_subcategory],
        content_type: "product_group",
        content_ids: [...attribute.content_ids, ...a.content_ids],
        num_items: attribute.num_items + a.num_items,
        value: attribute.value + a.value
      },
      value: value + v,
      attributes: [...attributes, dt],
      items: [...items, { ...item, index }]
    }
  }, { value: 0, attributes: [], items: [], attribute: defaultAttribute });

  mappings.attribute.content_category = mappings.attribute.content_category.join(", ");
  mappings.attribute.content_subcategory = mappings.attribute.content_subcategory.join(", ");
  return mappings;
};