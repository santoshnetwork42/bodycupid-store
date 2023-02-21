export const getMenuCategories = /* GraphQL */ `
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
        status
        position
        currency
        listingPrice
        taxable
        tags
        inventory
        blockedInventory
        rating
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        variants {
          items {
            id
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
        reviews {
          items {
            id
            userId
            user {
              id
              owner
              firstName
              lastName
            }
            productId
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
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
      BillingAddress {
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
      CouponCodeId
      totalCashOnDeliveryCharges
      totalDiscount
      totalGiftCharges
      totalPrepaidAmount
      totalShippingCharges
      taxExempted
      cFormProvided
      thirdPartyShipping
      currency
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