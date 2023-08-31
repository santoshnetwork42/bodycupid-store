export const getMenuCategories = /* GraphQL */ `
  query SearchProductCategories(
    $filter: SearchableProductCategoryFilterInput
    $sort: [SearchableProductCategorySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductCategoryAggregationInput]
    $subCategoryFilter: ModelProductSubCategoryFilterInput
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
        priority
        isArchive
        subCategory(filter: $subCategoryFilter) {
          items {
            id
            name
            slug
            priority
            isArchive
          }
        }
      }
    }
  }
`;

export const getSubCategoriesByCategoryID = /* GraphQL */ `
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
      }
      nextToken
      total
    }
  }
`;

export const getAllSubcategoriesPath = /* GraphQL */ `
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
        isArchive
        subCategory {
          items {
            id
            name
            slug
            isArchive
          }
        }
      }
    }
  }
`;

export const getAllCategoriesPath = /* GraphQL */ `
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
      }
    }
  }
`;

export const getAllCollectionPath = /* GraphQL */ `
  query SearchCollectionTypes(
    $filter: SearchableCollectionTypeFilterInput
    $sort: [SearchableCollectionTypeSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCollectionTypeAggregationInput]
  ) {
    searchCollectionTypes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        slug
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
    $variantFilter: ModelVariantFilterInput
    $variantLimit: Int
    $imageLimit: Int
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
        variants(filter: $variantFilter, limit: $variantLimit) {
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
        images(limit: $imageLimit) {
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
        isArchive
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
    $variantFilter: ModelVariantFilterInput
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
        slug
        productDescription
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
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        hasVarient
        variants(filter: $variantFilter) {
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
    $variantFilter: ModelVariantFilterInput
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
        collections
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
        pageTitle
        productDescription
        longDescription
        manufacturer
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
        additionalInfo {
          label
          value
        }
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        continueSellingOutOfStock
        hasVarient
        hasFaq
        variants(filter: $variantFilter) {
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
  query SearchCoupons(
    $filter: SearchableCouponFilterInput
    $sort: [SearchableCouponSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCouponAggregationInput]
  ) {
    searchCoupons(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        description
        code
        couponType
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        getYStoreProduct {
          id
          title
          price
        }
        minOrderValue
        maxDiscount
        expirationDate
        autoApply
        applicableCollections
        applicableProducts
        paymentMethod
      }
    }
  }
`;

export const applyCoupon = /* GraphQL */ `
  mutation ApplyCoupon(
    $code: String!
    $variantFilter: ModelVariantFilterInput
    $variantLimit: Int
    $imageLimit: Int
  ) {
    applyCoupon(code: $code) {
      id
      code
      couponType
      buyXQuantity
      getYAmount
      getYPercentage
      getYQuantity
      getYProduct
      getYStoreProduct {
        id
        title
        collections
        vendor
        subCategory {
          name
          slug
        }
        isFeatured
        category {
          name
          slug
        }
        slug
        price
        sku
        position
        listingPrice
        tags
        inventory
        blockedInventory
        continueSellingOutOfStock
        rating
        totalRatings
        thumbImages
        isInventoryEnabled
        totalOrders
        variants(filter: $variantFilter, limit: $variantLimit) {
          items {
            id
            title
            price
            position
            listingPrice
            imageUrl
            inventory
            blockedInventory
          }
        }
        images(limit: $imageLimit) {
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
      minOrderValue
      maxDiscount
      applicableCollections
      applicableProducts
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
      channelName
      shippingAddress {
        name
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
          productId
          product {
            id
            title
            slug
            productDescription
            price
            sku
            status
            costPrice
            listingPrice
            totalOrders
            images {
              items {
                id
                alt
                width
                height
                imageKey
                isThumb
              }
            }
          }
          variantId
          variant {
            id
            productId
            title
            price
            status
            costPrice
            listingPrice
            imageUrl
          }
          sku
          cancelledQuantity
          quantity
          price
          status
          deliveryPartner
          shippingCourier
          trackingId
        }
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

export const getOrderSuccess = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      code
      totalAmount
      totalDiscount
      totalShippingCharges
      totalCashOnDeliveryCharges
    }
  }
`;

export const getOrderStatus = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      code
      status
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
        isArchive
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
        title
        description
        slug
        bannerUrl
        categoryID
        imageUrl
        isArchive
        category {
          slug
        }
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
        title
        description
        slug
        imageUrl
        isArchive
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
    $variantFilter: ModelVariantFilterInput
    $variantLimit: Int
    $imageLimit: Int
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
        collections
        vendor
        subCategory {
          name
          slug
        }
        isFeatured
        category {
          name
          slug
        }
        slug
        price
        sku
        position
        listingPrice
        tags
        inventory
        blockedInventory
        continueSellingOutOfStock
        rating
        totalRatings
        thumbImages
        isInventoryEnabled
        totalOrders
        recommended
        recommendPriority
        recommendPrice
        variants(filter: $variantFilter, limit: $variantLimit) {
          items {
            id
            title
            price
            position
            listingPrice
            imageUrl
            inventory
            blockedInventory
          }
        }
        images(limit: $imageLimit) {
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
      nextToken
      total
    }
  }
`;

export const getProductById = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      title
      collections
      vendor
      subCategory {
        name
        slug
      }
      isFeatured
      category {
        name
        slug
      }
      slug
      price
      sku
      position
      listingPrice
      tags
      inventory
      blockedInventory
      continueSellingOutOfStock
      rating
      totalRatings
      thumbImages
      isInventoryEnabled
      totalOrders
      variants {
        items {
          id
          title
          price
          position
          listingPrice
          imageUrl
          inventory
          blockedInventory
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
`;

export const getRecommendedProductById = /* GraphQL */ `
  query GetProduct(
    $id: ID!
    $variantFilter: ModelVariantFilterInput
    $variantLimit: Int
    $imageLimit: Int
  ) {
    getProduct(id: $id) {
      id
      title
      collections
      vendor
      subCategory {
        name
        slug
      }
      isFeatured
      category {
        name
        slug
      }
      slug
      price
      sku
      status
      position
      listingPrice
      tags
      inventory
      blockedInventory
      continueSellingOutOfStock
      rating
      totalRatings
      thumbImages
      isInventoryEnabled
      totalOrders
      variants(filter: $variantFilter, limit: $variantLimit) {
        items {
          id
          title
          price
          position
          listingPrice
          imageUrl
          inventory
          blockedInventory
        }
      }
      images(limit: $imageLimit) {
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
`;

export const getProductSlug = /* GraphQL */ `
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
        slug
      }
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
    $imageLimit: Int
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
        collections
        slug
        price
        sku
        listingPrice
        thumbImages
        images(limit: $imageLimit) {
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
      userId
      verified
      reviewer {
        name
        email
      }
      productId
      rating
      comment
      title
      images
      createdAt
    }
  }
`;

export const updateReview = /* GraphQL */ `
  mutation UpdateReview(
    $input: UpdateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    updateReview(input: $input, condition: $condition) {
      id
      userId
      verified
      reviewer {
        name
        email
      }
      productId
      rating
      comment
      title
      images
      createdAt
    }
  }
`;

export const byorderIdcreatedAtPayment = /* GraphQL */ `
  query ByorderIdcreatedAtPayment(
    $orderId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byorderIdcreatedAtPayment(
      orderId: $orderId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        storeId
        userId
        orderId
        method
        status
        amount
        paymentDate
        createdAt
        updatedAt
      }
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
  mutation CreateShoppingCart(
    $input: CreateShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    createShoppingCart(input: $input, condition: $condition) {
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

export const createUserAddress = /* GraphQL */ `
  mutation CreateUserAddress(
    $input: CreateUserAddressInput!
    $condition: ModelUserAddressConditionInput
  ) {
    createUserAddress(input: $input, condition: $condition) {
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
  }
`;

export const updateUserAddress = /* GraphQL */ `
  mutation UpdateUserAddress(
    $input: UpdateUserAddressInput!
    $condition: ModelUserAddressConditionInput
  ) {
    updateUserAddress(input: $input, condition: $condition) {
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
      totalOrders
      isActive
      authProvider
      isAdmin
      profilePhotoUrl
      emailVerified
      phoneVerified
      isCognitoConfirmed
      createdAt
      updatedAt
      totalOrders
      totalSpent
      walletBalance
      walletSpent
      totalStoreCredit
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
      isActive
      authProvider
      isAdmin
      profilePhotoUrl
      emailVerified
      phoneVerified
      isCognitoConfirmed
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
      title
      description
      isActive
      webUrl
      imageUrl
      darkImageUrl
      banners {
        webKey
        mobileKey
        link
        name
      }
      announcements {
        label
        link
      }
      socialLinks {
        instagram
        facebook
        twitter
        youtube
        pinterest
      }
      createdAt
      updatedAt
    }
  }
`;

export const getStoreBanners = /* GraphQL */ `
  query GetStore($id: ID!) {
    getStore(id: $id) {
      title
      name
      description
      webUrl
      imageUrl
      banners {
        webKey
        mobileKey
        link
        name
      }
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
        verified
        reviewer {
          name
          email
        }
        productId
        rating
        comment
        title
        images
        createdAt
      }
      nextToken
      total
    }
  }
`;

export const getReviewsAnalytics = /* GraphQL */ `
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
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
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
    $variantFilter: ModelVariantFilterInput
    $variantLimit: Int
    $imageLimit: Int
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
          variants(filter: $variantFilter, limit: $variantLimit) {
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
          images(limit: $imageLimit) {
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

export const getHomePageBlogs = /* GraphQL */ `
  query SearchBlogs(
    $filter: SearchableBlogFilterInput
    $sort: [SearchableBlogSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableBlogAggregationInput]
  ) {
    searchBlogs(
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
        content
        excerpt
        featuredImage
        tags
        isVisible
        seo {
          pageURL
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const searchCollectionTypes = /* GraphQL */ `
  query SearchCollectionTypes(
    $filter: SearchableCollectionTypeFilterInput
    $sort: [SearchableCollectionTypeSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCollectionTypeAggregationInput]
  ) {
    searchCollectionTypes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        slug
        name
        title
        description
        showInMenu
        priority
        imageUrl
        defaultSorting
        isArchive
      }
    }
  }
`;

export const searchShippingTiers = /* GraphQL */ `
  query SearchShippingTiers(
    $filter: SearchableShippingTierFilterInput
    $sort: [SearchableShippingTierSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableShippingTierAggregationInput]
  ) {
    searchShippingTiers(
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
        paymentType
        amount
        minOrderValue
        maxOrderValue
        createdAt
        updatedAt
      }
    }
  }
`;

export const checkInventory = /* GraphQL */ `
  mutation CheckInventory($input: [CheckInventoryInput!]!) {
    checkInventory(input: $input) {
      recordKey
      productId
      variantId
      price
      inventory
    }
  }
`;

export const getRedirects = /* GraphQL */ `
  query GetRedirects($slug: String!, $storeId: ID!) {
    getRedirects(slug: $slug, storeId: $storeId) {
      slug
      redirect
    }
  }
`;

export const createRedirects = /* GraphQL */ `
  mutation CreateRedirects(
    $input: CreateRedirectsInput!
    $condition: ModelRedirectsConditionInput
  ) {
    createRedirects(input: $input, condition: $condition) {
      id
    }
  }
`;

export const searchConfigurations = /* GraphQL */ `
  query SearchConfigurations(
    $filter: SearchableConfigurationFilterInput
    $sort: [SearchableConfigurationSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableConfigurationAggregationInput]
  ) {
    searchConfigurations(
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
        key
        value
        createdAt
        updatedAt
      }
    }
  }
`;

export const getCoupon = /* GraphQL */ `
  query GetCoupon($code: ID!) {
    getCoupon(code: $code) {
      id
      description
      code
      couponType
      buyXQuantity
      getYAmount
      getYPercentage
      getYQuantity
      getYProduct
      getYStoreProduct {
        id
        title
        price
      }
      minOrderValue
      maxDiscount
      expirationDate
      autoApply
      applicableCollections
      applicableProducts
      paymentMethod
    }
  }
`;

export const createNewOrder = /* GraphQL */ `
  mutation CreateNewOrder($input: CreateNewOrderInput!) {
    createNewOrder(input: $input) {
      id
      code
      storeId
      userId
      channelName
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
    }
  }
`;
export const getProductRecommendation = /* GraphQL */ `
  query GetProductRecommendation($input: ProductRecommendationInput!) {
    getProductRecommendation(input: $input) {
      productId
      variantId
    }
  }
`;

export const getCollectionType = /* GraphQL */ `
  query SearchCollectionTypes(
    $filter: SearchableCollectionTypeFilterInput
    $sort: [SearchableCollectionTypeSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCollectionTypeAggregationInput]
  ) {
    searchCollectionTypes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        slug
        defaultSorting
        isArchive
      }
    }
  }
`;

export const searchDashboardData = /* GraphQL */ `
  query searchDashboardData(
    $menuCategoryFilter: SearchableProductCategoryFilterInput
    $menuCategorySort: [SearchableProductCategorySortInput]
    $menuCategoryLimit: Int
    $menuCategoryNextToken: String
    $menuCategoryFrom: Int
    $menuCategoryAggregates: [SearchableProductCategoryAggregationInput]
    $menuCategorySubCategoryFilter: ModelProductSubCategoryFilterInput
    $collectionFilter: SearchableCollectionTypeFilterInput
    $collectionSort: [SearchableCollectionTypeSortInput]
    $collectionLimit: Int
    $collectionNextToken: String
    $collectionFrom: Int
    $collectionAggregates: [SearchableCollectionTypeAggregationInput]
    $configurationFilter: SearchableConfigurationFilterInput
    $configurationSort: [SearchableConfigurationSortInput]
    $configurationLimit: Int
    $configurationNextToken: String
    $configurationFrom: Int
    $configurationAggregates: [SearchableConfigurationAggregationInput]
    $couponFilter: SearchableCouponFilterInput
    $couponSort: [SearchableCouponSortInput]
    $couponLimit: Int
    $couponNextToken: String
    $couponFrom: Int
    $couponAggregates: [SearchableCouponAggregationInput]
    $ltoProductFilter: SearchableProductFilterInput
    $ltoProductSort: [SearchableProductSortInput]
    $ltoProductLimit: Int
    $ltoProductNextToken: String
    $ltoProductFrom: Int
    $ltoProductAggregates: [SearchableProductAggregationInput]
    $ltoProductVariantFilter: ModelVariantFilterInput
    $ltoProductVariantLimit: Int
    $ltoProductImageLimit: Int
    $shippingFilter: SearchableShippingTierFilterInput
    $shippingSort: [SearchableShippingTierSortInput]
    $shippingLimit: Int
    $shippingNextToken: String
    $shippingFrom: Int
    $shippingAggregates: [SearchableShippingTierAggregationInput]
  ) {
    searchProductCategories(
      filter: $menuCategoryFilter
      sort: $menuCategorySort
      limit: $menuCategoryLimit
      nextToken: $menuCategoryNextToken
      from: $menuCategoryFrom
      aggregates: $menuCategoryAggregates
    ) {
      items {
        id
        name
        slug
        priority
        isArchive
        subCategory(filter: $menuCategorySubCategoryFilter) {
          items {
            id
            name
            slug
            priority
            isArchive
          }
        }
      }
    }

    searchCollectionTypes(
      filter: $collectionFilter
      sort: $collectionSort
      limit: $collectionLimit
      nextToken: $collectionNextToken
      from: $collectionFrom
      aggregates: $collectionAggregates
    ) {
      items {
        id
        slug
        name
        title
        description
        showInMenu
        priority
        imageUrl
        defaultSorting
        isArchive
      }
    }

    searchConfigurations(
      filter: $configurationFilter
      sort: $configurationSort
      limit: $configurationLimit
      nextToken: $configurationNextToken
      from: $configurationFrom
      aggregates: $configurationAggregates
    ) {
      items {
        id
        storeId
        key
        value
        createdAt
        updatedAt
      }
    }

    searchCoupons(
      filter: $couponFilter
      sort: $couponSort
      limit: $couponLimit
      nextToken: $couponNextToken
      from: $couponFrom
      aggregates: $couponAggregates
    ) {
      items {
        id
        description
        code
        couponType
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        getYStoreProduct {
          id
          title
          price
        }
        minOrderValue
        maxDiscount
        expirationDate
        autoApply
        applicableCollections
        applicableProducts
        paymentMethod
      }
    }

    searchProducts(
      filter: $ltoProductFilter
      sort: $ltoProductSort
      limit: $ltoProductLimit
      nextToken: $ltoProductNextToken
      from: $ltoProductFrom
      aggregates: $ltoProductAggregates
    ) {
      items {
        id
        title
        collections
        vendor
        status
        subCategory {
          name
          slug
        }
        isFeatured
        category {
          name
          slug
        }
        slug
        price
        sku
        position
        listingPrice
        tags
        inventory
        blockedInventory
        continueSellingOutOfStock
        rating
        totalRatings
        thumbImages
        isInventoryEnabled
        totalOrders
        recommended
        recommendPriority
        recommendPrice
        variants(
          filter: $ltoProductVariantFilter
          limit: $ltoProductVariantLimit
        ) {
          items {
            id
            title
            price
            position
            listingPrice
            imageUrl
            inventory
            blockedInventory
            status
          }
        }
        images(limit: $ltoProductImageLimit) {
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
      nextToken
      total
    }

    searchShippingTiers(
      filter: $shippingFilter
      sort: $shippingSort
      limit: $shippingLimit
      nextToken: $shippingNextToken
      from: $shippingFrom
      aggregates: $shippingAggregates
    ) {
      items {
        id
        storeId
        paymentType
        amount
        minOrderValue
        maxOrderValue
        createdAt
        updatedAt
      }
    }
  }
`;
