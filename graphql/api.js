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