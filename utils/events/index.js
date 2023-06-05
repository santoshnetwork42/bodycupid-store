import { getFirstVariant } from "~/utils/products";
import { getProductPrice } from "~/utils/products";

export const itemMapper = (product, coupon) => {
  let {
    variantId,
    id,
    title,
    category,
    subCategory,
    section,
    qty = 1,
    vendor,
    sku,
  } = product;

  let contentType = "product_group";

  if (!variantId) {
    variantId = getFirstVariant(product)?.id;
  }

  const { price, listingPrice } = getProductPrice(product, variantId);

  if (!variantId) {
    contentType = "product";
    variantId = id;
  }

  return {
    value: price * qty,
    vercel: {
      content_category: category?.name,
      content_subcategory: subCategory?.name,
      content_ids: sku,
      content_name: title,
      content_type: contentType,
      currency: "INR",
      num_items: 1,
      value: price,
    },
    pixel: {
      content_category: category?.name,
      content_subcategory: subCategory?.name,
      content_ids: [sku],
      content_name: title,
      content_type: contentType,
      currency: "INR",
      num_items: 1,
      value: price,
    },
    pinpoint: {
      item_id: id,
      item_name: title,
      affiliation: "",
      coupon: coupon?.code || "",
      discount: (listingPrice - price).toString(),
      item_brand: vendor,
      item_category: category?.name || "",
      item_category2: subCategory?.name || "",
      item_list_id: section?.id || "",
      item_list_name: section?.name || "",
      item_variant: variantId,
      location_id: "",
      price: price.toString(),
      quantity: qty.toString(),
    },
    ga: [
      {
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
        quantity: qty,
      },
    ],
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

  const mappings = products.reduce(
    ({ value, pinpoint, ga, pixel, vercel }, product, index) => {
      const {
        ga: [itemNew],
        pinpoint: pinpointNew,
        value: valueNew,
        pixel: pixelNew,
        vercel: vercelNew
      } = itemMapper(product, coupon);

      return {
        value: value + valueNew,
        pixel: {
          ...pixel,
          content_category: [
            ...pixel.content_category,
            pixelNew.content_category,
          ],
          content_subcategory: [
            ...pixel.content_subcategory,
            pixelNew.content_subcategory,
          ],
          content_type: "product_group",
          content_ids: [...pixel.content_ids, ...pixelNew.content_ids],
          num_items: pixel.num_items + pixelNew.num_items,
          value: pixel.value + pixelNew.value,
        },
        pinpoint: [...pinpoint, pinpointNew],
        vercel: [...vercel, vercelNew],
        ga: [...ga, { ...itemNew, index }],
      };
    },
    {
      value: 0,
      pinpoint: [],
      ga: [],
      vercel: [],
      pixel: defaultAttribute,
    }
  );

  mappings.pixel.content_category = mappings.pixel.content_category.join(", ");
  mappings.pixel.content_subcategory =
    mappings.pixel.content_subcategory.join(", ");

  return mappings;
};

export const userMapper = (userData, address) => {
  const { city, state, country, pinCode } = address || {};
  if (userData) {
    const { phone, firstName, lastName, email, gender, dob } = userData;
    return { phone, firstName, lastName, email, gender, dob, city, state, country, pinCode };
  }

  return { city, state, country, pinCode };
};