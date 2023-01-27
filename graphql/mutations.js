/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCouponCode = /* GraphQL */ `
  mutation CreateCouponCode(
    $input: CreateCouponCodeInput!
    $condition: ModelCouponCodeConditionInput
  ) {
    createCouponCode(input: $input, condition: $condition) {
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
export const updateCouponCode = /* GraphQL */ `
  mutation UpdateCouponCode(
    $input: UpdateCouponCodeInput!
    $condition: ModelCouponCodeConditionInput
  ) {
    updateCouponCode(input: $input, condition: $condition) {
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
export const deleteCouponCode = /* GraphQL */ `
  mutation DeleteCouponCode(
    $input: DeleteCouponCodeInput!
    $condition: ModelCouponCodeConditionInput
  ) {
    deleteCouponCode(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createProductCategory = /* GraphQL */ `
  mutation CreateProductCategory(
    $input: CreateProductCategoryInput!
    $condition: ModelProductCategoryConditionInput
  ) {
    createProductCategory(input: $input, condition: $condition) {
      id
      name
      created_at
      updated_at
      createdAt
      updatedAt
    }
  }
`;
export const updateProductCategory = /* GraphQL */ `
  mutation UpdateProductCategory(
    $input: UpdateProductCategoryInput!
    $condition: ModelProductCategoryConditionInput
  ) {
    updateProductCategory(input: $input, condition: $condition) {
      id
      name
      created_at
      updated_at
      createdAt
      updatedAt
    }
  }
`;
export const deleteProductCategory = /* GraphQL */ `
  mutation DeleteProductCategory(
    $input: DeleteProductCategoryInput!
    $condition: ModelProductCategoryConditionInput
  ) {
    deleteProductCategory(input: $input, condition: $condition) {
      id
      name
      created_at
      updated_at
      createdAt
      updatedAt
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createVariant = /* GraphQL */ `
  mutation CreateVariant(
    $input: CreateVariantInput!
    $condition: ModelVariantConditionInput
  ) {
    createVariant(input: $input, condition: $condition) {
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
export const updateVariant = /* GraphQL */ `
  mutation UpdateVariant(
    $input: UpdateVariantInput!
    $condition: ModelVariantConditionInput
  ) {
    updateVariant(input: $input, condition: $condition) {
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
export const deleteVariant = /* GraphQL */ `
  mutation DeleteVariant(
    $input: DeleteVariantInput!
    $condition: ModelVariantConditionInput
  ) {
    deleteVariant(input: $input, condition: $condition) {
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
export const createProductOption = /* GraphQL */ `
  mutation CreateProductOption(
    $input: CreateProductOptionInput!
    $condition: ModelProductOptionConditionInput
  ) {
    createProductOption(input: $input, condition: $condition) {
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
export const updateProductOption = /* GraphQL */ `
  mutation UpdateProductOption(
    $input: UpdateProductOptionInput!
    $condition: ModelProductOptionConditionInput
  ) {
    updateProductOption(input: $input, condition: $condition) {
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
export const deleteProductOption = /* GraphQL */ `
  mutation DeleteProductOption(
    $input: DeleteProductOptionInput!
    $condition: ModelProductOptionConditionInput
  ) {
    deleteProductOption(input: $input, condition: $condition) {
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
export const createProductImage = /* GraphQL */ `
  mutation CreateProductImage(
    $input: CreateProductImageInput!
    $condition: ModelProductImageConditionInput
  ) {
    createProductImage(input: $input, condition: $condition) {
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
export const updateProductImage = /* GraphQL */ `
  mutation UpdateProductImage(
    $input: UpdateProductImageInput!
    $condition: ModelProductImageConditionInput
  ) {
    updateProductImage(input: $input, condition: $condition) {
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
export const deleteProductImage = /* GraphQL */ `
  mutation DeleteProductImage(
    $input: DeleteProductImageInput!
    $condition: ModelProductImageConditionInput
  ) {
    deleteProductImage(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createOrderProduct = /* GraphQL */ `
  mutation CreateOrderProduct(
    $input: CreateOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    createOrderProduct(input: $input, condition: $condition) {
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
export const updateOrderProduct = /* GraphQL */ `
  mutation UpdateOrderProduct(
    $input: UpdateOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    updateOrderProduct(input: $input, condition: $condition) {
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
export const deleteOrderProduct = /* GraphQL */ `
  mutation DeleteOrderProduct(
    $input: DeleteOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    deleteOrderProduct(input: $input, condition: $condition) {
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
export const createDeliveryStatus = /* GraphQL */ `
  mutation CreateDeliveryStatus(
    $input: CreateDeliveryStatusInput!
    $condition: ModelDeliveryStatusConditionInput
  ) {
    createDeliveryStatus(input: $input, condition: $condition) {
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
export const updateDeliveryStatus = /* GraphQL */ `
  mutation UpdateDeliveryStatus(
    $input: UpdateDeliveryStatusInput!
    $condition: ModelDeliveryStatusConditionInput
  ) {
    updateDeliveryStatus(input: $input, condition: $condition) {
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
export const deleteDeliveryStatus = /* GraphQL */ `
  mutation DeleteDeliveryStatus(
    $input: DeleteDeliveryStatusInput!
    $condition: ModelDeliveryStatusConditionInput
  ) {
    deleteDeliveryStatus(input: $input, condition: $condition) {
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
export const createPayment = /* GraphQL */ `
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
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
export const updatePayment = /* GraphQL */ `
  mutation UpdatePayment(
    $input: UpdatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    updatePayment(input: $input, condition: $condition) {
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
export const deletePayment = /* GraphQL */ `
  mutation DeletePayment(
    $input: DeletePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    deletePayment(input: $input, condition: $condition) {
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
export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
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
export const updateReview = /* GraphQL */ `
  mutation UpdateReview(
    $input: UpdateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    updateReview(input: $input, condition: $condition) {
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
export const deleteReview = /* GraphQL */ `
  mutation DeleteReview(
    $input: DeleteReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    deleteReview(input: $input, condition: $condition) {
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
export const createWishlist = /* GraphQL */ `
  mutation CreateWishlist(
    $input: CreateWishlistInput!
    $condition: ModelWishlistConditionInput
  ) {
    createWishlist(input: $input, condition: $condition) {
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
export const updateWishlist = /* GraphQL */ `
  mutation UpdateWishlist(
    $input: UpdateWishlistInput!
    $condition: ModelWishlistConditionInput
  ) {
    updateWishlist(input: $input, condition: $condition) {
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
export const deleteWishlist = /* GraphQL */ `
  mutation DeleteWishlist(
    $input: DeleteWishlistInput!
    $condition: ModelWishlistConditionInput
  ) {
    deleteWishlist(input: $input, condition: $condition) {
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
export const createWishlistProduct = /* GraphQL */ `
  mutation CreateWishlistProduct(
    $input: CreateWishlistProductInput!
    $condition: ModelWishlistProductConditionInput
  ) {
    createWishlistProduct(input: $input, condition: $condition) {
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
export const updateWishlistProduct = /* GraphQL */ `
  mutation UpdateWishlistProduct(
    $input: UpdateWishlistProductInput!
    $condition: ModelWishlistProductConditionInput
  ) {
    updateWishlistProduct(input: $input, condition: $condition) {
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
export const deleteWishlistProduct = /* GraphQL */ `
  mutation DeleteWishlistProduct(
    $input: DeleteWishlistProductInput!
    $condition: ModelWishlistProductConditionInput
  ) {
    deleteWishlistProduct(input: $input, condition: $condition) {
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
export const createShoppingCart = /* GraphQL */ `
  mutation CreateShoppingCart(
    $input: CreateShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    createShoppingCart(input: $input, condition: $condition) {
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
export const updateShoppingCart = /* GraphQL */ `
  mutation UpdateShoppingCart(
    $input: UpdateShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    updateShoppingCart(input: $input, condition: $condition) {
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
export const deleteShoppingCart = /* GraphQL */ `
  mutation DeleteShoppingCart(
    $input: DeleteShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    deleteShoppingCart(input: $input, condition: $condition) {
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
export const createShoppingCartProduct = /* GraphQL */ `
  mutation CreateShoppingCartProduct(
    $input: CreateShoppingCartProductInput!
    $condition: ModelShoppingCartProductConditionInput
  ) {
    createShoppingCartProduct(input: $input, condition: $condition) {
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
export const updateShoppingCartProduct = /* GraphQL */ `
  mutation UpdateShoppingCartProduct(
    $input: UpdateShoppingCartProductInput!
    $condition: ModelShoppingCartProductConditionInput
  ) {
    updateShoppingCartProduct(input: $input, condition: $condition) {
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
export const deleteShoppingCartProduct = /* GraphQL */ `
  mutation DeleteShoppingCartProduct(
    $input: DeleteShoppingCartProductInput!
    $condition: ModelShoppingCartProductConditionInput
  ) {
    deleteShoppingCartProduct(input: $input, condition: $condition) {
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
