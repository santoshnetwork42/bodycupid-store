export const getMenuSubCategories = /* GraphQL */ `
  query SearchProductSubCategories(
    $filter: SearchableProductSubCategoryFilterInput
    $sort: [SearchableProductSubCategorySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductSubCategoryAggregationInput]
  ) {
    searchProductSubCategories(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        category {
          id
          name
          slug
        }
        slug
      }
      nextToken
      total
    }
  }
`;

export const getSubCategoriesSlug = /* GraphQL */ `
  query SearchProductSubCategories(
    $filter: SearchableProductSubCategoryFilterInput
    $sort: [SearchableProductSubCategorySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductSubCategoryAggregationInput]
  ) {
    searchProductSubCategories(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        slug
        category {
          slug
        }
      }
    }
  }
`;

export const getSideBarFilterCategories = /* GraphQL */ `
  query SearchProductCategories(
    $filter: SearchableProductCategoryFilterInput
    $sort: [SearchableProductCategorySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductCategoryAggregationInput]
  ) {
    searchProductCategories(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        slug
        subCategory {
          items {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const getCategoriesSlug = /* GraphQL */ `
  query SearchProductCategories(
    $filter: SearchableProductCategoryFilterInput
    $sort: [SearchableProductCategorySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductCategoryAggregationInput]
  ) {
    searchProductCategories(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        slug
        subCategory {
          items {
            slug
          }
        }
      }
    }
  }
`;

export const getHomePageProducts = /* GraphQL */ `
  query SearchProducts(
    $filter: SearchableProductFilterInput
    $sort: [SearchableProductSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductAggregationInput]
  ) {
    searchProducts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        title
        isFeatured
        productType
        slug
        price
        sku
        status
        position
        currency
        listingPrice
        taxable
        tags
        inventory
        continueSellingOutOfStock
        blockedInventory
        rating
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        variants {
          items {
            id
            productId
            title
            price
            sku
            size
            status
            position
            currency
            costPrice
            listingPrice
            createdAt
            updatedAt
            taxable
            barcode
            imageUrl
            weight
            weightUnit
            inventory
            blockedInventory
          }
        }
        reviews {
          items {
            id
          }
        }
        images {
          items {
            id
            position
            alt
            width
            height
            imageKey
            isThumb
          }
        }
      }
    }
  }
`;

export const getHomePageCategories = /* GraphQL */ `
  query SearchProductSubCategories(
    $filter: SearchableProductSubCategoryFilterInput
    $sort: [SearchableProductSubCategorySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductSubCategoryAggregationInput]
  ) {
    searchProductSubCategories(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        slug
        imageUrl
        priority
        category {
          slug
        }
      }
    }
  }
`;

export const getQuickViewProduct = /* GraphQL */ `
  query ByslugProduct(
    $slug: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byslugProduct(
      slug: $slug
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        brand
        vendor
        isFeatured
        productType
        createdAt
        slug
        productDescription
        longDescription
        updatedAt
        isPublished
        publishedAt
        price
        sku
        size
        color
        status
        position
        currency
        costPrice
        listingPrice
        taxable
        barcode
        tags
        weight
        weightUnit
        inventory
        continueSellingOutOfStock
        blockedInventory
        rating
        totalOrders
        additionalInfo
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        hasVarient
        variants {
          items {
            id
            productId
            title
            price
            sku
            size
            color
            status
            position
            currency
            costPrice
            listingPrice
            createdAt
            updatedAt
            taxable
            barcode
            imageUrl
            weight
            weightUnit
            inventory
            blockedInventory
          }
          nextToken
        }
        images {
          items {
            id
            productId
            position
            createdAt
            updatedAt
            alt
            width
            height
            imageKey
            isThumb
          }
          nextToken
        }
        reviews {
          items {
            id
          }
        }
      }
      nextToken
    }
  }
`;

export const getProductBySlug = /* GraphQL */ `
  query ByslugProduct(
    $slug: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byslugProduct(
      slug: $slug
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        brand
        vendor
        isFeatured
        categoryId
        subCategoryId
        category {
          id
          name
          slug
        }
        subCategory {
          id
          name
          slug
        }
        productType
        createdAt
        slug
        productDescription
        longDescription
        updatedAt
        isPublished
        publishedAt
        price
        sku
        size
        color
        status
        position
        currency
        costPrice
        listingPrice
        taxable
        barcode
        tags
        benefits
        weight
        weightUnit
        inventory
        blockedInventory
        rating
        totalRatings
        totalOrders
        additionalInfo
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        continueSellingOutOfStock
        hasVarient
        hasFaq
        variants {
          items {
            id
            productId
            title
            price
            sku
            size
            color
            status
            position
            currency
            costPrice
            listingPrice
            createdAt
            updatedAt
            taxable
            barcode
            imageUrl
            weight
            weightUnit
            inventory
            blockedInventory
          }
          nextToken
        }
        images {
          items {
            id
            productId
            position
            createdAt
            updatedAt
            alt
            width
            height
            imageKey
            isThumb
          }
        }
      }
      nextToken
    }
  }
`;

export const getFeaturedCoupon = /* GraphQL */ `
  query SearchCouponCodes(
    $filter: SearchableCouponCodeFilterInput
    $sort: [SearchableCouponCodeSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCouponCodeAggregationInput]
  ) {
    searchCouponCodes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        code
        discount
        isActive
        isFeatured
        couponType
        minOrderValue
        maxDiscount
        description
        paymentMethod
      }
    }
  }
`;

export const applyCoupon = /* GraphQL */ `
  mutation ApplyCoupon($code: String!) {
    applyCoupon(code: $code) {
      id
      code
      discount
      couponType
      minOrderValue
      maxDiscount
      description
      paymentMethod
    }
  }
`;

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      code
      storeId
      userId
      user {
        id
        owner
        firstName
        lastName
      }
      channelName
      shippingAddress {
        name
        phone
        email
        country
        state
        city
        pinCode
        landmark
        address
        location
        area
      }
      billingAddress {
        name
        phone
        email
        country
        state
        city
        pinCode
        landmark
        address
        location
        area
      }
      totalStoreCredit
      couponCodeId
      totalAmount
      totalCashOnDeliveryCharges
      totalDiscount
      totalGiftCharges
      totalPrepaidAmount
      totalShippingCharges
      taxExempted
      cFormProvided
      thirdPartyShipping
      currency
      paymentType
      sla
      priority
      orderDate
      status
      products {
        items {
          id
          orderId
          productId
          product {
            id
            title
            brand
            vendor
            isFeatured
            productType
            createdAt
            slug
            productDescription
            longDescription
            updatedAt
            isPublished
            publishedAt
            price
            sku
            size
            color
            status
            position
            currency
            costPrice
            listingPrice
            taxable
            barcode
            tags
            weight
            weightUnit
            inventory
            blockedInventory
            rating
            totalOrders
            additionalInfo
            thumbImages
            isTaxEnabled
            isInventoryEnabled
            hasVarient
            images {
              items {
                id
                productId
                position
                createdAt
                updatedAt
                alt
                width
                height
                imageKey
                isThumb
              }
              nextToken
            }
          }
          variantId
          variant {
            id
            productId
            title
            price
            sku
            size
            color
            status
            position
            currency
            costPrice
            listingPrice
            createdAt
            updatedAt
            taxable
            barcode
            imageUrl
            weight
            weightUnit
            inventory
            blockedInventory
          }
          sku
          returnReason
          returnDate
          returnAWB
          returnShippingProvider
          title
          shippingMethodCode
          cashOnDeliveryCharges
          sellingPrice
          shippingCharges
          discount
          totalPrice
          currency
          onHold
          facilityCode
          gstin
          additionalInfo
          centralGstPercentage
          compensationCessPercentage
          integratedGstPercentage
          stateGstPercentage
          taxRate
          unionTerritoryGstPercentage
          deliveryPartner
          dispatchDate
          invoiceDate
          invoiceNumber
          tentativeDeliveryDate
          trackingId
          cancelledQuantity
          quantity
          price
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      payments {
        items {
          id
          orderId
          method
          status
          amount
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const searchProductSubCategories = /* GraphQL */ `
  query SearchProductSubCategories(
    $filter: SearchableProductSubCategoryFilterInput
    $sort: [SearchableProductSubCategorySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductSubCategoryAggregationInput]
  ) {
    searchProductSubCategories(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name

        categoryID
        category {
          id
          name
          description
          slug
          subCategory {
            items {
              id
              name
              categoryID
              category {
                id
                name
                slug
              }
              slug
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        slug
      }
      nextToken
      total
    }
  }
`;

export const getBasicSubCategory = /* GraphQL */ `
  query ByslugProductSubCategory(
    $slug: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductSubCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byslugProductSubCategory(
      slug: $slug
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        slug
        bannerUrl
      }
    }
  }
`;

export const getBasicCategory = /* GraphQL */ `
  query ByslugProductCategory(
    $slug: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byslugProductCategory(
      slug: $slug
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        slug
        bannerUrl
      }
    }
  }
`;

export const findProducts = /* GraphQL */ `
  query SearchProducts(
    $filter: SearchableProductFilterInput
    $sort: [SearchableProductSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductAggregationInput]
  ) {
    searchProducts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        subCategory {
          id
          name
          slug
        }
        isFeatured
        category {
          id
          name
          slug
        }
        productType
        createdAt
        slug
        productDescription
        longDescription
        updatedAt
        isPublished
        publishedAt
        price
        sku
        size
        color
        status
        position
        currency
        costPrice
        listingPrice
        taxable
        barcode
        tags
        weight
        weightUnit
        inventory
        blockedInventory
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        additionalInfo
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        hasVarient
        variants {
          items {
            id
            productId
            title
            price
            sku
            size
            color
            status
            position
            currency
            costPrice
            listingPrice
            createdAt
            updatedAt
            taxable
            barcode
            imageUrl
            weight
            weightUnit
            inventory
            blockedInventory
          }
          nextToken
        }
        images {
          items {
            id
            productId
            position
            createdAt
            updatedAt
            alt
            width
            height
            imageKey
            isThumb
          }
          nextToken
        }
        reviews {
          items {
            id
            rating
          }
        }
      }
      nextToken
      total
    }
  }
`;

export const searchProductsBasic = /* GraphQL */ `
  query SearchProducts(
    $filter: SearchableProductFilterInput
    $sort: [SearchableProductSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductAggregationInput]
  ) {
    searchProducts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        title
        slug
        price
        sku
        listingPrice
        thumbImages
        images {
          items {
            id
            position
            alt
            width
            height
            imageKey
            isThumb
          }
        }
      }
    }
  }
`;

export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createPayment = /* GraphQL */ `
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createOrderProduct = /* GraphQL */ `
  mutation CreateOrderProduct(
    $input: CreateOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    createOrderProduct(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createShoppingCartProduct = /* GraphQL */ `
  mutation CreateShoppingCartProduct(
    $input: CreateShoppingCartProductInput!
    $condition: ModelShoppingCartProductConditionInput
  ) {
    createShoppingCartProduct(input: $input, condition: $condition) {
      id
      shoppingcartId
      productId
      variantId
      quantity
    }
  }
`;
export const updateShoppingCartProduct = /* GraphQL */ `
  mutation UpdateShoppingCartProduct(
    $input: UpdateShoppingCartProductInput!
    $condition: ModelShoppingCartProductConditionInput
  ) {
    updateShoppingCartProduct(input: $input, condition: $condition) {
      id
      shoppingcartId
      productId
      variantId
      quantity
    }
  }
`;
export const deleteShoppingCartProduct = /* GraphQL */ `
  mutation DeleteShoppingCartProduct(
    $input: DeleteShoppingCartProductInput!
    $condition: ModelShoppingCartProductConditionInput
  ) {
    deleteShoppingCartProduct(input: $input, condition: $condition) {
      id
      shoppingcartId
      productId
      variantId
      quantity
      updatedAt
    }
  }
`;

export const createShoppingCart = /* GraphQL */ `
  mutation CreateStoreShoppingCart($storeId: ID!) {
    createStoreShoppingCart(storeId: $storeId) {
      id
      storeId
      userId
      couponCodeId
      createdAt
      updatedAt
    }
  }
`;
export const updateShoppingCart = /* GraphQL */ `
  mutation UpdateShoppingCart(
    $input: UpdateShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    updateShoppingCart(input: $input, condition: $condition) {
      id
      storeId
      userId
      couponCodeId
    }
  }
`;

export const deleteShoppingCart = /* GraphQL */ `
  mutation DeleteShoppingCart(
    $input: DeleteShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    deleteShoppingCart(input: $input, condition: $condition) {
      id
    }
  }
`;

export const findUserAddresses = /* GraphQL */ `
  query SearchUserAddresses(
    $filter: SearchableUserAddressFilterInput
    $sort: [SearchableUserAddressSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAddressAggregationInput]
  ) {
    searchUserAddresses(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        userID
        name
        phone
        email
        country
        state
        city
        pinCode
        landmark
        address
        location
        area
        createdAt
        updatedAt
      }
      total
    }
  }
`;

export const searchOrders = /* GraphQL */ `
  query SearchOrders(
    $filter: SearchableOrderFilterInput
    $sort: [SearchableOrderSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableOrderAggregationInput]
  ) {
    searchOrders(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        code
        totalAmount
        orderDate
        status
        createdAt
      }
      nextToken
      total
    }
  }
`;

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      owner
      firstName
      lastName
      email
      phone
      gender
      dob
      country
      state
      city
      pinCode
      landmark
      address
      location
      area
      isActive
      totalOrders
      totalSpent
      walletBalance
      walletSpent
      totalStoreCredit
      isCognitoConfirmed
      profilePhotoUrl
      createdAt
      updatedAt
    }
  }
`;

export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      owner
      firstName
      lastName
      email
      phone
      gender
      dob
      country
      state
      city
      pinCode
      landmark
      address
      location
      area
      isActive
      totalOrders
      totalSpent
      walletBalance
      walletSpent
      totalStoreCredit
      isCognitoConfirmed
      profilePhotoUrl
      createdAt
      updatedAt
    }
  }
`;

export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction($orderId: ID!) {
    createTransaction(orderId: $orderId) {
      orderId
      amount
    }
  }
`;

export const getStore = /* GraphQL */ `
  query GetStore($id: ID!) {
    getStore(id: $id) {
      id
      name
      description
      isActive
      webUrl
      appId
      host
      priority
      imageUrl
    }
  }
`;

export const validateTransaction = /* GraphQL */ `
  mutation ValidateTransaction($orderId: ID!, $razorpayPaymentId: String!) {
    validateTransaction(
      orderId: $orderId
      razorpayPaymentId: $razorpayPaymentId
    ) {
      success
    }
  }
`;

export const getZipCode = /* GraphQL */ `
  query GetZipCode($id: ID!) {
    getZipCode(id: $id) {
      id
      codMaxAmount
      cod
      prepaid
      createdAt
      updatedAt
    }
  }
`;

export const getReviews = /* GraphQL */ `
  query SearchReviews(
    $filter: SearchableReviewFilterInput
    $sort: [SearchableReviewSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableReviewAggregationInput]
  ) {
    searchReviews(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        userId
        reviewer {
          name
          email
        }
        productId
        rating
        comment
        title
        images
      }
      nextToken
      total
    }
  }
`;

export const searchProductFaqs = /* GraphQL */ `
  query SearchProductFaqs(
    $filter: SearchableProductFaqFilterInput
    $sort: [SearchableProductFaqSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductFaqAggregationInput]
  ) {
    searchProductFaqs(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        storeId
        productId
        title
        description
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;

export const getLinkedProducts = /* GraphQL */ `
  query ByProductIdLinkedProduct(
    $productId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLinkedProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductIdLinkedProduct(
      productId: $productId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        productId
        linkedProductId
        linkedProduct {
          id
          title
          brand
          slug
          productDescription
          price
          sku
          size
          position
          currency
          costPrice
          listingPrice
          taxable
          barcode
          tags
          benefits
          rating
          totalRatings
          totalOrders
          thumbImages
          isTaxEnabled
          isInventoryEnabled
          hasVarient
          variants {
            items {
              id
              title
              price
              sku
              position
              currency
              costPrice
              listingPrice
              imageUrl
            }
          }
          images {
            items {
              id
              productId
              position
              createdAt
              updatedAt
              alt
              width
              height
              imageKey
              isThumb
            }
          }
        }
      }
    }
  }
`;

export const addProductNotification = /* GraphQL */ `
  mutation AddProductNotification(
    $productId: ID!
    $variantId: ID
    $userId: ID
    $email: AWSEmail
  ) {
    addProductNotification(
      productId: $productId
      variantId: $variantId
      userId: $userId
      email: $email
    ) {
      success
      message
    }
  }
`;
