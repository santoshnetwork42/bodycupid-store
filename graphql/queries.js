/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      owner
      firstName
      lastName
      middleName
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
      authProvider
      isAdmin
      profilePhotoUrl
      createdAt
      updatedAt
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
        middleName
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
        authProvider
        isAdmin
        profilePhotoUrl
        createdAt
        updatedAt
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
        middleName
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
        authProvider
        isAdmin
        profilePhotoUrl
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
      body_html
      vendor
      product_type
      created_at
      handle
      updated_at
      published_at
      template_suffix
      status
      published_scope
      tags
      admin_graphql_api_id
      variants {
        items {
          id
          product_id
          title
          price
          sku
          position
          inventory_policy
          compare_at_price
          fulfillment_service
          inventory_management
          option1
          option2
          option3
          created_at
          updated_at
          taxable
          barcode
          grams
          image_id
          weight
          weight_unit
          inventory_item_id
          inventory_quantity
          old_inventory_quantity
          requires_shipping
          admin_graphql_api_id
          createdAt
          updatedAt
        }
        nextToken
      }
      options {
        items {
          id
          product_id
          name
          position
          values
          createdAt
          updatedAt
        }
        nextToken
      }
      images {
        items {
          id
          product_id
          position
          created_at
          updated_at
          alt
          width
          height
          src
          variant_ids
          is_thumb
          admin_graphql_api_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        body_html
        vendor
        product_type
        created_at
        handle
        updated_at
        published_at
        template_suffix
        status
        published_scope
        tags
        admin_graphql_api_id
        variants {
          nextToken
        }
        options {
          nextToken
        }
        images {
          nextToken
        }
        createdAt
        updatedAt
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
        body_html
        vendor
        product_type
        created_at
        handle
        updated_at
        published_at
        template_suffix
        status
        published_scope
        tags
        admin_graphql_api_id
        variants {
          nextToken
        }
        options {
          nextToken
        }
        images {
          nextToken
        }
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
export const getVariant = /* GraphQL */ `
  query GetVariant($id: ID!) {
    getVariant(id: $id) {
      id
      product_id
      title
      price
      sku
      position
      inventory_policy
      compare_at_price
      fulfillment_service
      inventory_management
      option1
      option2
      option3
      created_at
      updated_at
      taxable
      barcode
      grams
      image_id
      weight
      weight_unit
      inventory_item_id
      inventory_quantity
      old_inventory_quantity
      requires_shipping
      admin_graphql_api_id
      createdAt
      updatedAt
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
        product_id
        title
        price
        sku
        position
        inventory_policy
        compare_at_price
        fulfillment_service
        inventory_management
        option1
        option2
        option3
        created_at
        updated_at
        taxable
        barcode
        grams
        image_id
        weight
        weight_unit
        inventory_item_id
        inventory_quantity
        old_inventory_quantity
        requires_shipping
        admin_graphql_api_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byProductIDVariant = /* GraphQL */ `
  query ByProductIDVariant(
    $product_id: ID!
    $created_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVariantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductIDVariant(
      product_id: $product_id
      created_at: $created_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        product_id
        title
        price
        sku
        position
        inventory_policy
        compare_at_price
        fulfillment_service
        inventory_management
        option1
        option2
        option3
        created_at
        updated_at
        taxable
        barcode
        grams
        image_id
        weight
        weight_unit
        inventory_item_id
        inventory_quantity
        old_inventory_quantity
        requires_shipping
        admin_graphql_api_id
        createdAt
        updatedAt
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
        product_id
        title
        price
        sku
        position
        inventory_policy
        compare_at_price
        fulfillment_service
        inventory_management
        option1
        option2
        option3
        created_at
        updated_at
        taxable
        barcode
        grams
        image_id
        weight
        weight_unit
        inventory_item_id
        inventory_quantity
        old_inventory_quantity
        requires_shipping
        admin_graphql_api_id
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
export const getProductOption = /* GraphQL */ `
  query GetProductOption($id: ID!) {
    getProductOption(id: $id) {
      id
      product_id
      name
      position
      values
      createdAt
      updatedAt
    }
  }
`;
export const listProductOptions = /* GraphQL */ `
  query ListProductOptions(
    $filter: ModelProductOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductOptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        product_id
        name
        position
        values
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byProductIDProductOption = /* GraphQL */ `
  query ByProductIDProductOption(
    $product_id: ID!
    $position: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductIDProductOption(
      product_id: $product_id
      position: $position
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        product_id
        name
        position
        values
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchProductOptions = /* GraphQL */ `
  query SearchProductOptions(
    $filter: SearchableProductOptionFilterInput
    $sort: [SearchableProductOptionSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductOptionAggregationInput]
  ) {
    searchProductOptions(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        product_id
        name
        position
        values
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
export const getProductImage = /* GraphQL */ `
  query GetProductImage($id: ID!) {
    getProductImage(id: $id) {
      id
      product_id
      position
      created_at
      updated_at
      alt
      width
      height
      src
      variant_ids
      is_thumb
      admin_graphql_api_id
      createdAt
      updatedAt
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
        product_id
        position
        created_at
        updated_at
        alt
        width
        height
        src
        variant_ids
        is_thumb
        admin_graphql_api_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byProductIDProductImage = /* GraphQL */ `
  query ByProductIDProductImage(
    $product_id: ID!
    $position: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductIDProductImage(
      product_id: $product_id
      position: $position
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        product_id
        position
        created_at
        updated_at
        alt
        width
        height
        src
        variant_ids
        is_thumb
        admin_graphql_api_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
