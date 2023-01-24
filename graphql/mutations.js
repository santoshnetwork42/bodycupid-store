/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
