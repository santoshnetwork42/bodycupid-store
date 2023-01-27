/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCouponCode = /* GraphQL */ `
  query GetCouponCode($id: ID!) {
    getCouponCode(id: $id) {
      id
      code
      discount
      expiration_date
      created_at
      updated_at
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
        code
        discount
        expiration_date
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
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
      wishlists {
        items {
          id
          user_id
          created_at
          updated_at
          createdAt
          updatedAt
        }
        nextToken
      }
      shopingcarts {
        items {
          id
          user_id
          created_at
          updated_at
          createdAt
          updatedAt
        }
        nextToken
      }
      reviews {
        items {
          id
          user_id
          product_id
          rating
          comment
          created_at
          updated_at
          createdAt
          updatedAt
        }
        nextToken
      }
      orders {
        items {
          id
          user_id
          shipping_address
          total
          orderDate
          status
          created_at
          updated_at
          createdAt
          updatedAt
        }
        nextToken
      }
      payments {
        items {
          id
          user_id
          order_id
          method
          amount
          created_at
          updated_at
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
        wishlists {
          nextToken
        }
        shopingcarts {
          nextToken
        }
        reviews {
          nextToken
        }
        orders {
          nextToken
        }
        payments {
          nextToken
        }
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
        wishlists {
          nextToken
        }
        shopingcarts {
          nextToken
        }
        reviews {
          nextToken
        }
        orders {
          nextToken
        }
        payments {
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
export const getProductCategory = /* GraphQL */ `
  query GetProductCategory($id: ID!) {
    getProductCategory(id: $id) {
      id
      name
      created_at
      updated_at
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
        created_at
        updated_at
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
        created_at
        updated_at
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
      category_id
      category {
        id
        name
        created_at
        updated_at
        createdAt
        updatedAt
      }
      product_type
      created_at
      handle
      updated_at
      published_at
      template_suffix
      status
      published_scope
      tags
      rating
      total_orders
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
      reviews {
        items {
          id
          user_id
          product_id
          rating
          comment
          created_at
          updated_at
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
        category_id
        category {
          id
          name
          created_at
          updated_at
          createdAt
          updatedAt
        }
        product_type
        created_at
        handle
        updated_at
        published_at
        template_suffix
        status
        published_scope
        tags
        rating
        total_orders
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
        reviews {
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
        category_id
        category {
          id
          name
          created_at
          updated_at
          createdAt
          updatedAt
        }
        product_type
        created_at
        handle
        updated_at
        published_at
        template_suffix
        status
        published_scope
        tags
        rating
        total_orders
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
        reviews {
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
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      user_id
      user {
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
        wishlists {
          nextToken
        }
        shopingcarts {
          nextToken
        }
        reviews {
          nextToken
        }
        orders {
          nextToken
        }
        payments {
          nextToken
        }
        createdAt
        updatedAt
      }
      shipping_address
      total
      orderDate
      status
      products {
        items {
          id
          order_id
          product_id
          variant_id
          option_id
          quantity
          price
          created_at
          updated_at
          createdAt
          updatedAt
        }
        nextToken
      }
      payments {
        items {
          id
          user_id
          order_id
          method
          amount
          created_at
          updated_at
          createdAt
          updatedAt
        }
        nextToken
      }
      created_at
      updated_at
      createdAt
      updatedAt
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
        user_id
        user {
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
        shipping_address
        total
        orderDate
        status
        products {
          nextToken
        }
        payments {
          nextToken
        }
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byUseridOrder = /* GraphQL */ `
  query ByUseridOrder(
    $user_id: ID!
    $created_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byUseridOrder(
      user_id: $user_id
      created_at: $created_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        user {
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
        shipping_address
        total
        orderDate
        status
        products {
          nextToken
        }
        payments {
          nextToken
        }
        created_at
        updated_at
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
      order_id
      product_id
      product {
        id
        title
        body_html
        vendor
        category_id
        category {
          id
          name
          created_at
          updated_at
          createdAt
          updatedAt
        }
        product_type
        created_at
        handle
        updated_at
        published_at
        template_suffix
        status
        published_scope
        tags
        rating
        total_orders
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
        reviews {
          nextToken
        }
        createdAt
        updatedAt
      }
      variant_id
      variant {
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
      option_id
      option {
        id
        product_id
        name
        position
        values
        createdAt
        updatedAt
      }
      quantity
      price
      created_at
      updated_at
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
        order_id
        product_id
        product {
          id
          title
          body_html
          vendor
          category_id
          product_type
          created_at
          handle
          updated_at
          published_at
          template_suffix
          status
          published_scope
          tags
          rating
          total_orders
          admin_graphql_api_id
          createdAt
          updatedAt
        }
        variant_id
        variant {
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
        option_id
        option {
          id
          product_id
          name
          position
          values
          createdAt
          updatedAt
        }
        quantity
        price
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byorderIDOrderProduct = /* GraphQL */ `
  query ByorderIDOrderProduct(
    $order_id: ID!
    $created_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byorderIDOrderProduct(
      order_id: $order_id
      created_at: $created_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        order_id
        product_id
        product {
          id
          title
          body_html
          vendor
          category_id
          product_type
          created_at
          handle
          updated_at
          published_at
          template_suffix
          status
          published_scope
          tags
          rating
          total_orders
          admin_graphql_api_id
          createdAt
          updatedAt
        }
        variant_id
        variant {
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
        option_id
        option {
          id
          product_id
          name
          position
          values
          createdAt
          updatedAt
        }
        quantity
        price
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDeliveryStatus = /* GraphQL */ `
  query GetDeliveryStatus($id: ID!) {
    getDeliveryStatus(id: $id) {
      id
      orderId
      status
      created_at
      updated_at
      createdAt
      updatedAt
    }
  }
`;
export const listDeliveryStatuses = /* GraphQL */ `
  query ListDeliveryStatuses(
    $filter: ModelDeliveryStatusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeliveryStatuses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderId
        status
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPayment = /* GraphQL */ `
  query GetPayment($id: ID!) {
    getPayment(id: $id) {
      id
      user_id
      user {
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
        wishlists {
          nextToken
        }
        shopingcarts {
          nextToken
        }
        reviews {
          nextToken
        }
        orders {
          nextToken
        }
        payments {
          nextToken
        }
        createdAt
        updatedAt
      }
      order_id
      method
      amount
      created_at
      updated_at
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
        user_id
        user {
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
        order_id
        method
        amount
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byUseridPayment = /* GraphQL */ `
  query ByUseridPayment(
    $user_id: ID!
    $created_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byUseridPayment(
      user_id: $user_id
      created_at: $created_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        user {
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
        order_id
        method
        amount
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byorderIDPayment = /* GraphQL */ `
  query ByorderIDPayment(
    $order_id: ID!
    $created_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byorderIDPayment(
      order_id: $order_id
      created_at: $created_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        user {
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
        order_id
        method
        amount
        created_at
        updated_at
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
      user_id
      user {
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
        wishlists {
          nextToken
        }
        shopingcarts {
          nextToken
        }
        reviews {
          nextToken
        }
        orders {
          nextToken
        }
        payments {
          nextToken
        }
        createdAt
        updatedAt
      }
      product_id
      product {
        id
        title
        body_html
        vendor
        category_id
        category {
          id
          name
          created_at
          updated_at
          createdAt
          updatedAt
        }
        product_type
        created_at
        handle
        updated_at
        published_at
        template_suffix
        status
        published_scope
        tags
        rating
        total_orders
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
        reviews {
          nextToken
        }
        createdAt
        updatedAt
      }
      rating
      comment
      created_at
      updated_at
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
        user_id
        user {
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
        product_id
        product {
          id
          title
          body_html
          vendor
          category_id
          product_type
          created_at
          handle
          updated_at
          published_at
          template_suffix
          status
          published_scope
          tags
          rating
          total_orders
          admin_graphql_api_id
          createdAt
          updatedAt
        }
        rating
        comment
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byUseridReview = /* GraphQL */ `
  query ByUseridReview(
    $user_id: ID!
    $created_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byUseridReview(
      user_id: $user_id
      created_at: $created_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        user {
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
        product_id
        product {
          id
          title
          body_html
          vendor
          category_id
          product_type
          created_at
          handle
          updated_at
          published_at
          template_suffix
          status
          published_scope
          tags
          rating
          total_orders
          admin_graphql_api_id
          createdAt
          updatedAt
        }
        rating
        comment
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byProductidReview = /* GraphQL */ `
  query ByProductidReview(
    $product_id: ID!
    $created_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductidReview(
      product_id: $product_id
      created_at: $created_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        user {
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
        product_id
        product {
          id
          title
          body_html
          vendor
          category_id
          product_type
          created_at
          handle
          updated_at
          published_at
          template_suffix
          status
          published_scope
          tags
          rating
          total_orders
          admin_graphql_api_id
          createdAt
          updatedAt
        }
        rating
        comment
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWishlist = /* GraphQL */ `
  query GetWishlist($id: ID!) {
    getWishlist(id: $id) {
      id
      user_id
      wishlist_products {
        items {
          id
          wishlist_id
          product_id
          variant_id
          option_id
          created_at
          updated_at
          createdAt
          updatedAt
        }
        nextToken
      }
      created_at
      updated_at
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
        user_id
        wishlist_products {
          nextToken
        }
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byUseridWishlist = /* GraphQL */ `
  query ByUseridWishlist(
    $user_id: ID!
    $created_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWishlistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byUseridWishlist(
      user_id: $user_id
      created_at: $created_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        wishlist_products {
          nextToken
        }
        created_at
        updated_at
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
      wishlist_id
      product_id
      product {
        id
        title
        body_html
        vendor
        category_id
        category {
          id
          name
          created_at
          updated_at
          createdAt
          updatedAt
        }
        product_type
        created_at
        handle
        updated_at
        published_at
        template_suffix
        status
        published_scope
        tags
        rating
        total_orders
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
        reviews {
          nextToken
        }
        createdAt
        updatedAt
      }
      variant_id
      variant {
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
      option_id
      option {
        id
        product_id
        name
        position
        values
        createdAt
        updatedAt
      }
      created_at
      updated_at
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
        wishlist_id
        product_id
        product {
          id
          title
          body_html
          vendor
          category_id
          product_type
          created_at
          handle
          updated_at
          published_at
          template_suffix
          status
          published_scope
          tags
          rating
          total_orders
          admin_graphql_api_id
          createdAt
          updatedAt
        }
        variant_id
        variant {
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
        option_id
        option {
          id
          product_id
          name
          position
          values
          createdAt
          updatedAt
        }
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byWishlistidWishlistProduct = /* GraphQL */ `
  query ByWishlistidWishlistProduct(
    $wishlist_id: ID!
    $created_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWishlistProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byWishlistidWishlistProduct(
      wishlist_id: $wishlist_id
      created_at: $created_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        wishlist_id
        product_id
        product {
          id
          title
          body_html
          vendor
          category_id
          product_type
          created_at
          handle
          updated_at
          published_at
          template_suffix
          status
          published_scope
          tags
          rating
          total_orders
          admin_graphql_api_id
          createdAt
          updatedAt
        }
        variant_id
        variant {
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
        option_id
        option {
          id
          product_id
          name
          position
          values
          createdAt
          updatedAt
        }
        created_at
        updated_at
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
      user_id
      shoppingcart_products {
        items {
          id
          shoppingcart_id
          product_id
          variant_id
          option_id
          quantity
          created_at
          updated_at
          createdAt
          updatedAt
        }
        nextToken
      }
      created_at
      updated_at
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
        user_id
        shoppingcart_products {
          nextToken
        }
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byUseridShoppingCart = /* GraphQL */ `
  query ByUseridShoppingCart(
    $user_id: ID!
    $created_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelShoppingCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byUseridShoppingCart(
      user_id: $user_id
      created_at: $created_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        shoppingcart_products {
          nextToken
        }
        created_at
        updated_at
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
      shoppingcart_id
      product_id
      product {
        id
        title
        body_html
        vendor
        category_id
        category {
          id
          name
          created_at
          updated_at
          createdAt
          updatedAt
        }
        product_type
        created_at
        handle
        updated_at
        published_at
        template_suffix
        status
        published_scope
        tags
        rating
        total_orders
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
        reviews {
          nextToken
        }
        createdAt
        updatedAt
      }
      variant_id
      variant {
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
      option_id
      option {
        id
        product_id
        name
        position
        values
        createdAt
        updatedAt
      }
      quantity
      created_at
      updated_at
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
        shoppingcart_id
        product_id
        product {
          id
          title
          body_html
          vendor
          category_id
          product_type
          created_at
          handle
          updated_at
          published_at
          template_suffix
          status
          published_scope
          tags
          rating
          total_orders
          admin_graphql_api_id
          createdAt
          updatedAt
        }
        variant_id
        variant {
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
        option_id
        option {
          id
          product_id
          name
          position
          values
          createdAt
          updatedAt
        }
        quantity
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byShoppingcartidShoppingCartProduct = /* GraphQL */ `
  query ByShoppingcartidShoppingCartProduct(
    $shoppingcart_id: ID!
    $created_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelShoppingCartProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byShoppingcartidShoppingCartProduct(
      shoppingcart_id: $shoppingcart_id
      created_at: $created_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        shoppingcart_id
        product_id
        product {
          id
          title
          body_html
          vendor
          category_id
          product_type
          created_at
          handle
          updated_at
          published_at
          template_suffix
          status
          published_scope
          tags
          rating
          total_orders
          admin_graphql_api_id
          createdAt
          updatedAt
        }
        variant_id
        variant {
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
        option_id
        option {
          id
          product_id
          name
          position
          values
          createdAt
          updatedAt
        }
        quantity
        created_at
        updated_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
