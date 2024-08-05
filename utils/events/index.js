import { v4 as uuid } from "uuid";

import { addPhonePrefix, getSource, removePhonePrefix } from "~/utils/helper";
import {
  getFirstVariant,
  getProductInventory,
  getProductMeta,
  getProductPrice,
} from "~/utils/products";
import { getCouponDiscount } from "../coupons";
import { getPublicImageURL } from "../getPublicImageUrl";
export const itemMapper = (
  product,
  coupon,
  user,
  checkoutSource = "BODYCUPID"
) => {
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
    variants,
  } = product;

  let contentType = "product_group";
  const source = checkoutSource === "GOKWIK" ? "GoKwik" : getSource();

  if (!variantId) {
    variantId = getFirstVariant(product)?.id;
  }

  const { price, listingPrice } = getProductPrice(product, variantId);
  const { thumbImage } = getProductMeta(product);
  const { hasInventory } = getProductInventory(product);
  if (!variantId) {
    contentType = "product";
    variantId = id;
  }

  let currentURL = window.location.href.split("/").slice(0, 3).join("/");
  const basicAttributes = {
    "Product ID": id,
    "Variant ID": variantId,
    "Product Subcategory": subCategory?.name || null,
    "Product Title": product.title,
    SKU: product.sku,
    "Image URL": getPublicImageURL(thumbImage?.imageKey),
    "Product Category": category?.name,
    "Product URL": `${currentURL}/products/${product.slug}`,
    "Vendor name": "Body Cupid",
    "Product Price": price,
    Currency: "INR",
    "Total Quantity": qty,
    "Discount Amount": listingPrice - price,
    MRP: listingPrice,
    Source: source,
    "Product Range": null,
  };

  return {
    value: price * qty,
    mrpValue: listingPrice * qty,
    vercel: {
      content_category: category?.name,
      content_subcategory: subCategory?.name,
      content_ids: sku,
      content_name: title,
      content_type: contentType,
      currency: "INR",
      num_items: 1,
      source: section ? section.name : null,
      value: price,
    },
    moengage: {
      addToCart: {
        ...basicAttributes,
        "ATC Source": section?.name || null,
      },
      productViewed: {
        ...basicAttributes,
        "Total variants": variants?.items?.length,
        "Product Title": title,
        Availability: hasInventory,
        Ratings: product?.rating,
      },
      removedFromCart: {
        ...basicAttributes,
        "Total variants": variants?.items?.length,
        "Product Title": title,
        Availability: hasInventory,
        Ratings: product?.rating,
      },
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
      price: price,
      external_id: user?.id || uuid(),
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

export const orderMapper = (
  products,
  coupon,
  user,
  checkoutSource = "BODYCUPID"
) => {
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
        vercel: vercelNew,
      } = itemMapper(product, coupon, null, checkoutSource);

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
          external_id: user?.id || uuid(),
          coupon_code: coupon?.code || "",
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
  const {
    city,
    state,
    country,
    pinCode = address?.pincode,
    phone: aP,
    firstName: aF = address?.first_name,
    lastName: aL = address?.last_name,
    email: aE,
    userId = address?.userId,
  } = address || {};

  if (userData) {
    const { id, phone, firstName, lastName, email, gender, dob, totalOrders } =
      userData;
    return {
      phone: addPhonePrefix(aP || phone),
      firstName: aF || firstName,
      lastName: aL || lastName,
      email: aE || email,
      gender,
      dob,
      totalOrders,
      city,
      state,
      country,
      pinCode,
      id,
    };
  }

  return {
    phone: addPhonePrefix(aP),
    firstName: aF,
    lastName: aL,
    email: aE,
    city,
    state,
    country,
    pinCode,
    id: userId,
  };
};

export const moEngagedOrderMapper = (
  products,
  coupon,
  paymentMethod,
  order,
  isFirstTimeUser,
  checkoutSource = "BODYCUPID"
) => {
  const { discount: couponTotal } = getCouponDiscount(coupon, products) || {};
  let currentURL = window.location.href.split("/").slice(0, 3).join("/");
  const source = checkoutSource === "GOKWIK" ? "GoKwik" : getSource();
  const basicAttributes = {
    Currency: "INR",
    "Total Items": products?.length,
    Source: source,
    "Cart URL": `${currentURL}/pages/cart`,
    "Coupon Applied": coupon?.code,
    "First Time User": isFirstTimeUser,
  };
  let totalDiscount = couponTotal;
  const mappings = products.reduce(
    (
      {
        "Total Price": Total_Price,
        "Vendor Name": Vendor_Name,
        "Product Title": Product_Title,
        SKU: SKU,
        "Image URL": Image_URL,
        "Product ID": Product_ID,
        "Total Quantity": Total_Quantity,
        "Product Price": Product_Price,
        "Product Quantity": Product_Quantity,
        "Variant ID": Variant_ID,
        "Product URL": Product_URL,
        "Total MRP": Total_MRP,
        "Product Subcategory": Product_Subcategory,
        "Product Category": Product_Category,
      },
      product
    ) => {
      const { value: valueNew, mrpValue } = itemMapper(
        product,
        coupon,
        null,
        checkoutSource
      );
      const { thumbImage } = getProductMeta(product);
      const url = getPublicImageURL(thumbImage?.imageKey);
      totalDiscount = totalDiscount + mrpValue - valueNew;
      return {
        "Total Price": Total_Price + valueNew,
        "Product Title": [...Product_Title, product.title],
        SKU: [...SKU, product.sku],
        "Total Discount": totalDiscount || 0,
        "Image URL": [...Image_URL, url],
        "Total Quantity": Total_Quantity + (product?.qty || 0),
        "Product ID": [...Product_ID, product?.id],
        "Vendor Name": [...Vendor_Name, product?.vendor],
        "Product Price": [...Product_Price, product.price],
        "Product Quantity": [...Product_Quantity, product.qty],
        "Variant ID":
          [
            ...Variant_ID,
            product?.variantId ? product?.variantId : product?.id,
          ] || [],
        "Product URL": [
          ...Product_URL,
          `${currentURL}/products/${product.slug}`,
        ],
        "Total MRP": Total_MRP + mrpValue,
        "Product Subcategory": [
          ...Product_Subcategory,
          product?.subCategory?.name,
        ],
        "Product Category": [...Product_Category, product?.category?.name],
        "Product Range": null,
      };
    },
    {
      "Total Price": 0,
      "Product Title": [],
      "Total Discount": 0,
      SKU: [],
      "Vendor Name": [],
      "Image URL": [],
      "Total Quantity": 0,
      "Product ID": [],
      "Product Price": [],
      "Product Quantity": [],
      "Variant ID": [],
      "Product URL": [],
      "Total MRP": 0,
      "Product Subcategory": [],
      "Product Category": [],
      "Product Range": null,
    }
  );

  return {
    checkoutStarted: {
      ...basicAttributes,
      ...mappings,
      "Cart URL": `${currentURL}/pages/checkout`,
    },
    orderCreated: {
      ...basicAttributes,
      ...mappings,
      "Order ID": order?.code,
      "Order Date": new Date().toISOString(),
      "Payment Mode": paymentMethod,
      "Payment Status": paymentMethod === "COD" ? "Unpaid" : "Paid",
    },
    cartViewed: {
      ...basicAttributes,
      ...mappings,
      "Order ID": order?.code,
      "Order Date": new Date().toISOString(),
      "Payment Mode": paymentMethod,
      "Payment Status": null,
    },
  };
};

export const moEngageItemPurchasedMapper = (
  products,
  coupon,
  paymentMethod,
  order,
  isFirstTimeUser,
  checkoutSource = "BODYCUPID"
) => {
  const { discount: couponTotal } = getCouponDiscount(coupon, products) || {};
  let currentURL = window.location.href.split("/").slice(0, 3).join("/");
  const source = checkoutSource === "GOKWIK" ? "GoKwik" : getSource();

  const basicAttributes = {
    Currency: "INR",
    Source: source,
    "Cart URL": `${currentURL}/pages/cart`,
    "Coupon Applied": coupon?.code,
    "First Time User": isFirstTimeUser,
  };
  const events = products.map((product) => {
    const { value: valueNew, mrpValue } = itemMapper(
      product,
      coupon,
      null,
      checkoutSource
    );
    const { thumbImage } = getProductMeta(product);
    const url = getPublicImageURL(thumbImage?.imageKey);
    const totalDiscount = mrpValue - valueNew;
    const eventAttributes = {
      ...basicAttributes,
      "Total Discount": totalDiscount || 0,
      "Total Price": valueNew,
      "Vendor Name": product.vendor,
      "Product Title": product.title,
      SKU: product.sku,
      "Image URL": url,
      "Total Quantity": product.qty || 0,
      "Product ID": product.id,
      "Product Price": product.price,
      "Product Quantity": product.qty,
      "Variant ID": product.variantId ? product.variantId : product.id,
      "Product URL": `${currentURL}/products/${product.slug}`,
      "Total MRP": mrpValue,
      "Product Subcategory": product.subCategory?.name,
      "Product Category": product.category?.name,
      "Product Range": null,
    };

    return {
      ...eventAttributes,
      "Order ID": order?.code,
      "Order Date": null,
      "Payment Mode": paymentMethod,
      "Payment Status": paymentMethod === "COD" ? "Unpaid" : "Paid",
    };
  });

  return events;
};

export const addressMapper = (
  address,
  totalPrice,
  checkoutSource = "BODYCUPID"
) => {
  if (address) {
    const source = checkoutSource === "GOKWIK" ? "GoKwik" : getSource();
    const { city, country, email, name, state, pinCode, phone } = address;
    const phoneNo = removePhonePrefix(phone);
    const [firstName, lastName] = name.split(" ");

    const basicAttributes = {
      "Cart Total Price": totalPrice,
      City: city,
      Country: country,
      Currency: "INR",
      Email: email,
      "First Name": firstName,
      "Last Name": lastName,
      "Mobile Number": phoneNo,
      Pincode: pinCode,
      State: state,
      Source: source,
    };

    return {
      addressAdded: {
        ...basicAttributes,
      },
      addressSelected: {
        ...basicAttributes,
      },
    };
  }
};

export const moeEvent = (title, payload) => {
  const moe = window?.Moengage;
  if (moe) {
    moe.track_event(title, payload);
  }
};

export const getFormattedDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
