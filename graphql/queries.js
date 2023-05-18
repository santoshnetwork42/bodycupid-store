/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
      }
      nextToken
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: [SearchableUserSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAggregationInput]
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
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
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
      }
      nextToken
      total
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
export const getUserAddress = /* GraphQL */ `
  query GetUserAddress($id: ID!) {
    getUserAddress(id: $id) {
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
export const listUserAddresses = /* GraphQL */ `
  query ListUserAddresses(
    $filter: ModelUserAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const byuserIDUserAddress = /* GraphQL */ `
  query ByuserIDUserAddress(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byuserIDUserAddress(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
      nextToken
    }
  }
`;
export const searchUserAddresses = /* GraphQL */ `
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
      nextToken
      total
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
export const getProductCategory = /* GraphQL */ `
  query GetProductCategory($id: ID!) {
    getProductCategory(id: $id) {
      id
      name
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      title
      description
      slug
      isFeatured
      totalProducts
      priority
      imageUrl
      bannerUrl
      products {
        nextToken
      }
      subCategory {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listProductCategories = /* GraphQL */ `
  query ListProductCategories(
    $filter: ModelProductCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        storeId
        title
        description
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bystoreIdProductCategory = /* GraphQL */ `
  query BystoreIdProductCategory(
    $storeId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bystoreIdProductCategory(
      storeId: $storeId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        storeId
        title
        description
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byslugProductCategory = /* GraphQL */ `
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
        storeId
        title
        description
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchProductCategories = /* GraphQL */ `
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
        storeId
        title
        description
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      nextToken
      total
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
export const getProductSubCategory = /* GraphQL */ `
  query GetProductSubCategory($id: ID!) {
    getProductSubCategory(id: $id) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      name
      title
      description
      categoryID
      category {
        id
        name
        storeId
        title
        description
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      slug
      isFeatured
      totalProducts
      priority
      imageUrl
      bannerUrl
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listProductSubCategories = /* GraphQL */ `
  query ListProductSubCategories(
    $filter: ModelProductSubCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductSubCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        storeId
        name
        title
        description
        categoryID
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bystoreIdProductSubCategory = /* GraphQL */ `
  query BystoreIdProductSubCategory(
    $storeId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductSubCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bystoreIdProductSubCategory(
      storeId: $storeId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        storeId
        name
        title
        description
        categoryID
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bycategoryIDProductSubCategory = /* GraphQL */ `
  query BycategoryIDProductSubCategory(
    $categoryID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductSubCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bycategoryIDProductSubCategory(
      categoryID: $categoryID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        storeId
        name
        title
        description
        categoryID
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byslugProductSubCategory = /* GraphQL */ `
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
        storeId
        name
        title
        description
        categoryID
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      nextToken
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
        storeId
        name
        title
        description
        categoryID
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      nextToken
      total
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
      }
      announcements
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
export const listStores = /* GraphQL */ `
  query ListStores(
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchStores = /* GraphQL */ `
  query SearchStores(
    $filter: SearchableStoreFilterInput
    $sort: [SearchableStoreSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableStoreAggregationInput]
  ) {
    searchStores(
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      nextToken
      total
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
export const getWarehouse = /* GraphQL */ `
  query GetWarehouse($id: ID!) {
    getWarehouse(id: $id) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      facilityCode
      name
      description
      address
      totalProducts
      totalQuantity
      priority
      imageUrl
      productInventory {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listWarehouses = /* GraphQL */ `
  query ListWarehouses(
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWarehouses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storeId
        facilityCode
        name
        description
        address
        totalProducts
        totalQuantity
        priority
        imageUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bystoreIdwarehouse = /* GraphQL */ `
  query BystoreIdwarehouse(
    $storeId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelwarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bystoreIdwarehouse(
      storeId: $storeId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        storeId
        facilityCode
        name
        description
        address
        totalProducts
        totalQuantity
        priority
        imageUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchWarehouses = /* GraphQL */ `
  query SearchWarehouses(
    $filter: SearchablewarehouseFilterInput
    $sort: [SearchablewarehouseSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchablewarehouseAggregationInput]
  ) {
    searchWarehouses(
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
        facilityCode
        name
        description
        address
        totalProducts
        totalQuantity
        priority
        imageUrl
        createdAt
        updatedAt
      }
      nextToken
      total
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
export const getProductInventory = /* GraphQL */ `
  query GetProductInventory($id: ID!) {
    getProductInventory(id: $id) {
      id
      warehouseId
      productId
      product {
        id
        title
        brand
        vendor
        collections
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      currentQuantity
      createdAt
      updatedAt
    }
  }
`;
export const listProductInventories = /* GraphQL */ `
  query ListProductInventories(
    $filter: ModelProductInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductInventories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        warehouseId
        productId
        currentQuantity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bywarehouseIdProductInventory = /* GraphQL */ `
  query BywarehouseIdProductInventory(
    $warehouseId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bywarehouseIdProductInventory(
      warehouseId: $warehouseId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        warehouseId
        productId
        currentQuantity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byproductIdProductInventory = /* GraphQL */ `
  query ByproductIdProductInventory(
    $productId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byproductIdProductInventory(
      productId: $productId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        warehouseId
        productId
        currentQuantity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchProductInventories = /* GraphQL */ `
  query SearchProductInventories(
    $filter: SearchableProductInventoryFilterInput
    $sort: [SearchableProductInventorySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductInventoryAggregationInput]
  ) {
    searchProductInventories(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        warehouseId
        productId
        currentQuantity
        createdAt
        updatedAt
      }
      nextToken
      total
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
export const getShippingTier = /* GraphQL */ `
  query GetShippingTier($id: ID!) {
    getShippingTier(id: $id) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      paymentType
      amount
      minOrderValue
      maxOrderValue
      createdAt
      updatedAt
    }
  }
`;
export const listShippingTiers = /* GraphQL */ `
  query ListShippingTiers(
    $filter: ModelShippingTierFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShippingTiers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
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
      nextToken
      total
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
export const getCollection = /* GraphQL */ `
  query GetCollection($slug: ID!) {
    getCollection(slug: $slug) {
      slug
      parent
      name
      title
      description
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      showInMenu
      priority
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $slug: ID
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCollections(
      slug: $slug
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        slug
        parent
        name
        title
        description
        storeId
        showInMenu
        priority
        imageUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bystoreIdCollections = /* GraphQL */ `
  query BystoreIdCollections(
    $storeId: ID!
    $priority: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bystoreIdCollections(
      storeId: $storeId
      priority: $priority
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        slug
        parent
        name
        title
        description
        storeId
        showInMenu
        priority
        imageUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchCollections = /* GraphQL */ `
  query SearchCollections(
    $filter: SearchableCollectionFilterInput
    $sort: [SearchableCollectionSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCollectionAggregationInput]
  ) {
    searchCollections(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        slug
        parent
        name
        title
        description
        storeId
        showInMenu
        priority
        imageUrl
        createdAt
        updatedAt
      }
      nextToken
      total
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
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      title
      brand
      vendor
      collections
      categoryId
      category {
        id
        name
        storeId
        title
        description
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      subCategoryId
      subCategory {
        id
        storeId
        name
        title
        description
        categoryID
        slug
        isFeatured
        totalProducts
        priority
        imageUrl
        bannerUrl
        createdAt
        updatedAt
      }
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      bulkActionId
      isFeatured
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
      continueSellingOutOfStock
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
      googleCategory
      hasVarient
      hasFaq
      variants {
        nextToken
      }
      images {
        nextToken
      }
      reviews {
        nextToken
      }
      linkedProducts {
        nextToken
      }
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        brand
        vendor
        collections
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      nextToken
    }
  }
`;
export const bycategoryIdProduct = /* GraphQL */ `
  query BycategoryIdProduct(
    $categoryId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bycategoryIdProduct(
      categoryId: $categoryId
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
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      nextToken
    }
  }
`;
export const bysubCategoryIdProduct = /* GraphQL */ `
  query BysubCategoryIdProduct(
    $subCategoryId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bysubCategoryIdProduct(
      subCategoryId: $subCategoryId
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
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      nextToken
    }
  }
`;
export const bystoreIdProduct = /* GraphQL */ `
  query BystoreIdProduct(
    $storeId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bystoreIdProduct(
      storeId: $storeId
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
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      nextToken
    }
  }
`;
export const byslugProduct = /* GraphQL */ `
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
        collections
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      nextToken
    }
  }
`;
export const searchProducts = /* GraphQL */ `
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
        collections
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      nextToken
      total
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
export const getLinkedProduct = /* GraphQL */ `
  query GetLinkedProduct($id: ID!) {
    getLinkedProduct(id: $id) {
      id
      productId
      linkedProductId
      linkedProduct {
        id
        title
        brand
        vendor
        collections
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      createdAt
      updatedAt
    }
  }
`;
export const listLinkedProducts = /* GraphQL */ `
  query ListLinkedProducts(
    $filter: ModelLinkedProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLinkedProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        productId
        linkedProductId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byProductIdLinkedProduct = /* GraphQL */ `
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVariant = /* GraphQL */ `
  query GetVariant($id: ID!) {
    getVariant(id: $id) {
      id
      productId
      title
      description
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
  }
`;
export const listVariants = /* GraphQL */ `
  query ListVariants(
    $filter: ModelVariantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVariants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        productId
        title
        description
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
  }
`;
export const byProductIdVariant = /* GraphQL */ `
  query ByProductIdVariant(
    $productId: ID!
    $position: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVariantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductIdVariant(
      productId: $productId
      position: $position
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        productId
        title
        description
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
  }
`;
export const searchVariants = /* GraphQL */ `
  query SearchVariants(
    $filter: SearchableVariantFilterInput
    $sort: [SearchableVariantSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableVariantAggregationInput]
  ) {
    searchVariants(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        productId
        title
        description
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
      total
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
export const getProductImage = /* GraphQL */ `
  query GetProductImage($id: ID!) {
    getProductImage(id: $id) {
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
`;
export const listProductImages = /* GraphQL */ `
  query ListProductImages(
    $filter: ModelProductImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const byProductIdImage = /* GraphQL */ `
  query ByProductIdImage(
    $productId: ID!
    $position: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductIdImage(
      productId: $productId
      position: $position
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
`;
export const getProductLog = /* GraphQL */ `
  query GetProductLog($id: ID!) {
    getProductLog(id: $id) {
      id
      productId
      userId
      user {
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
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
      }
      comment
      createdAt
      updatedAt
    }
  }
`;
export const listProductLogs = /* GraphQL */ `
  query ListProductLogs(
    $filter: ModelProductLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        productId
        userId
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byProductIdProductLogs = /* GraphQL */ `
  query ByProductIdProductLogs(
    $productId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductIdProductLogs(
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
        userId
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      code
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      userId
      user {
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
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
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
      coupon {
        id
        groupId
        description
        code
        storeId
        userId
        couponType
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        minOrderValue
        maxDiscount
        expirationDate
        isActive
        isFeatured
        autoApply
        applicableCollections
        applicableProducts
        paymentMethod
        createdAt
        updatedAt
      }
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
        nextToken
      }
      payments {
        nextToken
      }
      comments {
        nextToken
      }
      createdAt
      updatedAt
      utmSource
      utmContent
      utmMedium
      utmCampaign
      utmTerm
      source
      referrer
      landingPage
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        utmSource
        utmContent
        utmMedium
        utmCampaign
        utmTerm
        source
        referrer
        landingPage
      }
      nextToken
    }
  }
`;
export const bystoreIdOrder = /* GraphQL */ `
  query BystoreIdOrder(
    $storeId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bystoreIdOrder(
      storeId: $storeId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
        utmSource
        utmContent
        utmMedium
        utmCampaign
        utmTerm
        source
        referrer
        landingPage
      }
      nextToken
    }
  }
`;
export const byuserIdcreatedAtOrder = /* GraphQL */ `
  query ByuserIdcreatedAtOrder(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byuserIdcreatedAtOrder(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
        utmSource
        utmContent
        utmMedium
        utmCampaign
        utmTerm
        source
        referrer
        landingPage
      }
      nextToken
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
        createdAt
        updatedAt
        utmSource
        utmContent
        utmMedium
        utmCampaign
        utmTerm
        source
        referrer
        landingPage
      }
      nextToken
      total
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
export const getOrderComment = /* GraphQL */ `
  query GetOrderComment($id: ID!) {
    getOrderComment(id: $id) {
      id
      orderId
      userId
      user {
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
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
      }
      comment
      createdAt
      updatedAt
    }
  }
`;
export const listOrderComments = /* GraphQL */ `
  query ListOrderComments(
    $filter: ModelOrderCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        orderId
        userId
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byOrderIdOrderComment = /* GraphQL */ `
  query ByOrderIdOrderComment(
    $orderId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byOrderIdOrderComment(
      orderId: $orderId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderId
        userId
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrderProduct = /* GraphQL */ `
  query GetOrderProduct($id: ID!) {
    getOrderProduct(id: $id) {
      id
      orderId
      productId
      product {
        id
        title
        brand
        vendor
        collections
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      variantId
      variant {
        id
        productId
        title
        description
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
  }
`;
export const listOrderProducts = /* GraphQL */ `
  query ListOrderProducts(
    $filter: ModelOrderProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        orderId
        productId
        variantId
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
  }
`;
export const byorderIdcreatedAtOrderProduct = /* GraphQL */ `
  query ByorderIdcreatedAtOrderProduct(
    $orderId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byorderIdcreatedAtOrderProduct(
      orderId: $orderId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderId
        productId
        variantId
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
  }
`;
export const searchOrderProducts = /* GraphQL */ `
  query SearchOrderProducts(
    $filter: SearchableOrderProductFilterInput
    $sort: [SearchableOrderProductSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableOrderProductAggregationInput]
  ) {
    searchOrderProducts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        orderId
        productId
        variantId
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
      total
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
export const getPayment = /* GraphQL */ `
  query GetPayment($id: ID!) {
    getPayment(id: $id) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      userId
      user {
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
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
      }
      orderId
      method
      status
      amount
      paymentDate
      createdAt
      updatedAt
    }
  }
`;
export const listPayments = /* GraphQL */ `
  query ListPayments(
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const bystoreIdPayment = /* GraphQL */ `
  query BystoreIdPayment(
    $storeId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bystoreIdPayment(
      storeId: $storeId
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
      nextToken
    }
  }
`;
export const byuserIdcreatedAtPayment = /* GraphQL */ `
  query ByuserIdcreatedAtPayment(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byuserIdcreatedAtPayment(
      userId: $userId
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
      nextToken
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
      nextToken
    }
  }
`;
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      bulkActionId
      userId
      user {
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
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
      }
      reviewer {
        name
        email
      }
      flagged
      productId
      product {
        id
        title
        brand
        vendor
        collections
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      rating
      comment
      title
      source
      images
      verified
      createdAt
      updatedAt
    }
  }
`;
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        bulkActionId
        userId
        flagged
        productId
        rating
        comment
        title
        source
        images
        verified
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byProductidcreatedAtReview = /* GraphQL */ `
  query ByProductidcreatedAtReview(
    $productId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductidcreatedAtReview(
      productId: $productId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bulkActionId
        userId
        flagged
        productId
        rating
        comment
        title
        source
        images
        verified
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchReviews = /* GraphQL */ `
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
        bulkActionId
        userId
        flagged
        productId
        rating
        comment
        title
        source
        images
        verified
        createdAt
        updatedAt
      }
      nextToken
      total
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
export const getWishlist = /* GraphQL */ `
  query GetWishlist($id: ID!) {
    getWishlist(id: $id) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      userId
      wishlistProducts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listWishlists = /* GraphQL */ `
  query ListWishlists(
    $filter: ModelWishlistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWishlists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storeId
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bystoreIdWishlist = /* GraphQL */ `
  query BystoreIdWishlist(
    $storeId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWishlistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bystoreIdWishlist(
      storeId: $storeId
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byuserIdcreatedAtWishlist = /* GraphQL */ `
  query ByuserIdcreatedAtWishlist(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWishlistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byuserIdcreatedAtWishlist(
      userId: $userId
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWishlistProduct = /* GraphQL */ `
  query GetWishlistProduct($id: ID!) {
    getWishlistProduct(id: $id) {
      id
      wishlistId
      productId
      product {
        id
        title
        brand
        vendor
        collections
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      variantId
      variant {
        id
        productId
        title
        description
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
      createdAt
      updatedAt
    }
  }
`;
export const listWishlistProducts = /* GraphQL */ `
  query ListWishlistProducts(
    $filter: ModelWishlistProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWishlistProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        wishlistId
        productId
        variantId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bywishlistIdcreatedAtWishlistProduct = /* GraphQL */ `
  query BywishlistIdcreatedAtWishlistProduct(
    $wishlistId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWishlistProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bywishlistIdcreatedAtWishlistProduct(
      wishlistId: $wishlistId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        wishlistId
        productId
        variantId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getShoppingCart = /* GraphQL */ `
  query GetShoppingCart($id: ID!) {
    getShoppingCart(id: $id) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      userId
      shoppingcartProducts {
        nextToken
      }
      couponCodeId
      createdAt
      updatedAt
    }
  }
`;
export const listShoppingCarts = /* GraphQL */ `
  query ListShoppingCarts(
    $filter: ModelShoppingCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShoppingCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storeId
        userId
        couponCodeId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bystoreIdShoppingCart = /* GraphQL */ `
  query BystoreIdShoppingCart(
    $storeId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelShoppingCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bystoreIdShoppingCart(
      storeId: $storeId
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
        couponCodeId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byuserIdSoreIdShoppingCart = /* GraphQL */ `
  query ByuserIdSoreIdShoppingCart(
    $userId: ID!
    $storeId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelShoppingCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byuserIdSoreIdShoppingCart(
      userId: $userId
      storeId: $storeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        storeId
        userId
        couponCodeId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getShoppingCartProduct = /* GraphQL */ `
  query GetShoppingCartProduct($id: ID!) {
    getShoppingCartProduct(id: $id) {
      id
      shoppingcartId
      productId
      product {
        id
        title
        brand
        vendor
        collections
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      variantId
      variant {
        id
        productId
        title
        description
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
      quantity
      createdAt
      updatedAt
    }
  }
`;
export const listShoppingCartProducts = /* GraphQL */ `
  query ListShoppingCartProducts(
    $filter: ModelShoppingCartProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShoppingCartProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        shoppingcartId
        productId
        variantId
        quantity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byshoppingcartIdcreatedAtShoppingCartProduct = /* GraphQL */ `
  query ByshoppingcartIdcreatedAtShoppingCartProduct(
    $shoppingcartId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelShoppingCartProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byshoppingcartIdcreatedAtShoppingCartProduct(
      shoppingcartId: $shoppingcartId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        shoppingcartId
        productId
        variantId
        quantity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCouponCode = /* GraphQL */ `
  query GetCouponCode($id: ID!) {
    getCouponCode(id: $id) {
      id
      groupId
      description
      code
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
      }
      userId
      user {
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
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
      }
      couponType
      buyXQuantity
      getYAmount
      getYPercentage
      getYQuantity
      getYProduct
      getYStoreProduct {
        id
        title
        brand
        vendor
        collections
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
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
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
      }
      minOrderValue
      maxDiscount
      expirationDate
      isActive
      isFeatured
      autoApply
      applicableCollections
      applicableProducts
      paymentMethod
      createdAt
      updatedAt
    }
  }
`;
export const listCouponCodes = /* GraphQL */ `
  query ListCouponCodes(
    $filter: ModelCouponCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCouponCodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        groupId
        description
        code
        storeId
        userId
        couponType
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        minOrderValue
        maxDiscount
        expirationDate
        isActive
        isFeatured
        autoApply
        applicableCollections
        applicableProducts
        paymentMethod
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bycodeCouponCode = /* GraphQL */ `
  query BycodeCouponCode(
    $code: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCouponCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bycodeCouponCode(
      code: $code
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupId
        description
        code
        storeId
        userId
        couponType
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        minOrderValue
        maxDiscount
        expirationDate
        isActive
        isFeatured
        autoApply
        applicableCollections
        applicableProducts
        paymentMethod
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byuserIdCouponCode = /* GraphQL */ `
  query ByuserIdCouponCode(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCouponCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byuserIdCouponCode(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupId
        description
        code
        storeId
        userId
        couponType
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        minOrderValue
        maxDiscount
        expirationDate
        isActive
        isFeatured
        autoApply
        applicableCollections
        applicableProducts
        paymentMethod
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchCouponCodes = /* GraphQL */ `
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
        groupId
        description
        code
        storeId
        userId
        couponType
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        minOrderValue
        maxDiscount
        expirationDate
        isActive
        isFeatured
        autoApply
        applicableCollections
        applicableProducts
        paymentMethod
        createdAt
        updatedAt
      }
      nextToken
      total
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
export const getConfiguration = /* GraphQL */ `
  query GetConfiguration($id: ID!) {
    getConfiguration(id: $id) {
      id
      storeId
      key
      value
      createdAt
      updatedAt
    }
  }
`;
export const listConfigurations = /* GraphQL */ `
  query ListConfigurations(
    $filter: ModelConfigurationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConfigurations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storeId
        key
        value
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const configurationByKey = /* GraphQL */ `
  query ConfigurationByKey(
    $key: String!
    $sortDirection: ModelSortDirection
    $filter: ModelConfigurationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    configurationByKey(
      key: $key
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        storeId
        key
        value
        createdAt
        updatedAt
      }
      nextToken
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
      nextToken
      total
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
export const getProductFaq = /* GraphQL */ `
  query GetProductFaq($id: ID!) {
    getProductFaq(id: $id) {
      id
      storeId
      productId
      title
      description
      createdAt
      updatedAt
    }
  }
`;
export const listProductFaqs = /* GraphQL */ `
  query ListProductFaqs(
    $filter: ModelProductFaqFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductFaqs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const listZipCodes = /* GraphQL */ `
  query ListZipCodes(
    $filter: ModelZipCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listZipCodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        codMaxAmount
        cod
        prepaid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchZipCodes = /* GraphQL */ `
  query SearchZipCodes(
    $filter: SearchableZipCodeFilterInput
    $sort: [SearchableZipCodeSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableZipCodeAggregationInput]
  ) {
    searchZipCodes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        codMaxAmount
        cod
        prepaid
        createdAt
        updatedAt
      }
      nextToken
      total
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
export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      storeId
      title
      content
      excerpt
      featuredImage
      tags
      isVisible
      seo {
        pageTitle
        pageDescrption
        pageURL
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storeId
        title
        content
        excerpt
        featuredImage
        tags
        isVisible
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchBlogs = /* GraphQL */ `
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
        storeId
        title
        content
        excerpt
        featuredImage
        tags
        isVisible
        createdAt
        updatedAt
      }
      nextToken
      total
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
export const getProductNotify = /* GraphQL */ `
  query GetProductNotify($id: ID!) {
    getProductNotify(id: $id) {
      id
      userId
      productId
      variantId
      email
      createdAt
      updatedAt
    }
  }
`;
export const listProductNotifies = /* GraphQL */ `
  query ListProductNotifies(
    $filter: ModelProductNotifyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductNotifies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        productId
        variantId
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byProductIdUserIdProductNotify = /* GraphQL */ `
  query ByProductIdUserIdProductNotify(
    $productId: ID!
    $userId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductNotifyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductIdUserIdProductNotify(
      productId: $productId
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        productId
        variantId
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byProductIdEmailProductNotify = /* GraphQL */ `
  query ByProductIdEmailProductNotify(
    $productId: ID!
    $email: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductNotifyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductIdEmailProductNotify(
      productId: $productId
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        productId
        variantId
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBulkAction = /* GraphQL */ `
  query GetBulkAction($id: ID!) {
    getBulkAction(id: $id) {
      id
      storeId
      userId
      action
      csvKey
      csv
      status
      message
      completedAt
      createdAt
      updatedAt
    }
  }
`;
export const listBulkActions = /* GraphQL */ `
  query ListBulkActions(
    $filter: ModelBulkActionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBulkActions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storeId
        userId
        action
        csvKey
        csv
        status
        message
        completedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrderNotifications = /* GraphQL */ `
  query GetOrderNotifications($id: ID!) {
    getOrderNotifications(id: $id) {
      id
      orderId
      orderProductId
      status
      isReverse
      courierStatus
      reversePickupCourierName
      reversePickupCourierCode
      returnAwb
      updated
      createdAt
      updatedAt
    }
  }
`;
export const listOrderNotifications = /* GraphQL */ `
  query ListOrderNotifications(
    $filter: ModelOrderNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderId
        orderProductId
        status
        isReverse
        courierStatus
        reversePickupCourierName
        reversePickupCourierCode
        returnAwb
        updated
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchOrderNotifications = /* GraphQL */ `
  query SearchOrderNotifications(
    $filter: SearchableOrderNotificationsFilterInput
    $sort: [SearchableOrderNotificationsSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableOrderNotificationsAggregationInput]
  ) {
    searchOrderNotifications(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        orderId
        orderProductId
        status
        isReverse
        courierStatus
        reversePickupCourierName
        reversePickupCourierCode
        returnAwb
        updated
        createdAt
        updatedAt
      }
      nextToken
      total
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
