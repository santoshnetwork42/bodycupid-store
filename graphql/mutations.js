/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
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
      authProvider
      totalOrders
      totalSpent
      walletBalance
      walletSpent
      totalStoreCredit
      isAdmin
      isCognitoConfirmed
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
      userAddress {
        nextToken
      }
      couponCodes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateOrderComment = /* GraphQL */ `
  mutation UpdateOrderComment(
    $input: UpdateOrderCommentInput!
    $condition: ModelOrderCommentConditionInput
  ) {
    updateOrderComment(input: $input, condition: $condition) {
      id
      orderId
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
      }
      comment
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
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
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
export const createShoppingCart = /* GraphQL */ `
  mutation CreateShoppingCart(
    $input: CreateShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    createShoppingCart(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
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
export const deleteShoppingCart = /* GraphQL */ `
  mutation DeleteShoppingCart(
    $input: DeleteShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    deleteShoppingCart(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
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
export const updateBulkAction = /* GraphQL */ `
  mutation UpdateBulkAction(
    $input: UpdateBulkActionInput!
    $condition: ModelBulkActionConditionInput
  ) {
    updateBulkAction(input: $input, condition: $condition) {
      id
      storeId
      userId
      action
      csvKey
      status
      message
      completedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteBulkAction = /* GraphQL */ `
  mutation DeleteBulkAction(
    $input: DeleteBulkActionInput!
    $condition: ModelBulkActionConditionInput
  ) {
    deleteBulkAction(input: $input, condition: $condition) {
      id
      storeId
      userId
      action
      csvKey
      status
      message
      completedAt
      createdAt
      updatedAt
    }
  }
`;
export const createOrderNotifications = /* GraphQL */ `
  mutation CreateOrderNotifications(
    $input: CreateOrderNotificationsInput!
    $condition: ModelOrderNotificationsConditionInput
  ) {
    createOrderNotifications(input: $input, condition: $condition) {
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
export const updateOrderNotifications = /* GraphQL */ `
  mutation UpdateOrderNotifications(
    $input: UpdateOrderNotificationsInput!
    $condition: ModelOrderNotificationsConditionInput
  ) {
    updateOrderNotifications(input: $input, condition: $condition) {
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
export const deleteOrderNotifications = /* GraphQL */ `
  mutation DeleteOrderNotifications(
    $input: DeleteOrderNotificationsInput!
    $condition: ModelOrderNotificationsConditionInput
  ) {
    deleteOrderNotifications(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
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
      authProvider
      totalOrders
      totalSpent
      walletBalance
      walletSpent
      totalStoreCredit
      isAdmin
      isCognitoConfirmed
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
      userAddress {
        nextToken
      }
      couponCodes {
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
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
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
      authProvider
      totalOrders
      totalSpent
      walletBalance
      walletSpent
      totalStoreCredit
      isAdmin
      isCognitoConfirmed
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
      userAddress {
        nextToken
      }
      couponCodes {
        nextToken
      }
      createdAt
      updatedAt
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
export const deleteUserAddress = /* GraphQL */ `
  mutation DeleteUserAddress(
    $input: DeleteUserAddressInput!
    $condition: ModelUserAddressConditionInput
  ) {
    deleteUserAddress(input: $input, condition: $condition) {
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
export const createProductCategory = /* GraphQL */ `
  mutation CreateProductCategory(
    $input: CreateProductCategoryInput!
    $condition: ModelProductCategoryConditionInput
  ) {
    createProductCategory(input: $input, condition: $condition) {
      id
      name
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
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
export const updateProductCategory = /* GraphQL */ `
  mutation UpdateProductCategory(
    $input: UpdateProductCategoryInput!
    $condition: ModelProductCategoryConditionInput
  ) {
    updateProductCategory(input: $input, condition: $condition) {
      id
      name
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
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
export const deleteProductCategory = /* GraphQL */ `
  mutation DeleteProductCategory(
    $input: DeleteProductCategoryInput!
    $condition: ModelProductCategoryConditionInput
  ) {
    deleteProductCategory(input: $input, condition: $condition) {
      id
      name
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
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
export const createProductSubCategory = /* GraphQL */ `
  mutation CreateProductSubCategory(
    $input: CreateProductSubCategoryInput!
    $condition: ModelProductSubCategoryConditionInput
  ) {
    createProductSubCategory(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      name
      description
      categoryID
      category {
        id
        name
        storeId
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
export const updateProductSubCategory = /* GraphQL */ `
  mutation UpdateProductSubCategory(
    $input: UpdateProductSubCategoryInput!
    $condition: ModelProductSubCategoryConditionInput
  ) {
    updateProductSubCategory(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      name
      description
      categoryID
      category {
        id
        name
        storeId
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
export const deleteProductSubCategory = /* GraphQL */ `
  mutation DeleteProductSubCategory(
    $input: DeleteProductSubCategoryInput!
    $condition: ModelProductSubCategoryConditionInput
  ) {
    deleteProductSubCategory(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      name
      description
      categoryID
      category {
        id
        name
        storeId
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
export const createStore = /* GraphQL */ `
  mutation CreateStore(
    $input: CreateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    createStore(input: $input, condition: $condition) {
      id
      name
      description
      isActive
      webUrl
      appId
      host
      priority
      imageUrl
      banners {
        webKey
        mobileKey
      }
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateStore = /* GraphQL */ `
  mutation UpdateStore(
    $input: UpdateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    updateStore(input: $input, condition: $condition) {
      id
      name
      description
      isActive
      webUrl
      appId
      host
      priority
      imageUrl
      banners {
        webKey
        mobileKey
      }
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteStore = /* GraphQL */ `
  mutation DeleteStore(
    $input: DeleteStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    deleteStore(input: $input, condition: $condition) {
      id
      name
      description
      isActive
      webUrl
      appId
      host
      priority
      imageUrl
      banners {
        webKey
        mobileKey
      }
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createWarehouse = /* GraphQL */ `
  mutation CreateWarehouse(
    $input: CreateWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    createWarehouse(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
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
export const updateWarehouse = /* GraphQL */ `
  mutation UpdateWarehouse(
    $input: UpdateWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    updateWarehouse(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
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
export const deleteWarehouse = /* GraphQL */ `
  mutation DeleteWarehouse(
    $input: DeleteWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    deleteWarehouse(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
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
export const createProductInventory = /* GraphQL */ `
  mutation CreateProductInventory(
    $input: CreateProductInventoryInput!
    $condition: ModelProductInventoryConditionInput
  ) {
    createProductInventory(input: $input, condition: $condition) {
      id
      warehouseId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
        hasFaq
      }
      currentQuantity
      createdAt
      updatedAt
    }
  }
`;
export const updateProductInventory = /* GraphQL */ `
  mutation UpdateProductInventory(
    $input: UpdateProductInventoryInput!
    $condition: ModelProductInventoryConditionInput
  ) {
    updateProductInventory(input: $input, condition: $condition) {
      id
      warehouseId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
        hasFaq
      }
      currentQuantity
      createdAt
      updatedAt
    }
  }
`;
export const deleteProductInventory = /* GraphQL */ `
  mutation DeleteProductInventory(
    $input: DeleteProductInventoryInput!
    $condition: ModelProductInventoryConditionInput
  ) {
    deleteProductInventory(input: $input, condition: $condition) {
      id
      warehouseId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
        hasFaq
      }
      currentQuantity
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
      brand
      vendor
      categoryId
      category {
        id
        name
        storeId
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
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      bulkActionId
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
      benefits
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      title
      brand
      vendor
      categoryId
      category {
        id
        name
        storeId
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
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      bulkActionId
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
      benefits
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      title
      brand
      vendor
      categoryId
      category {
        id
        name
        storeId
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
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      bulkActionId
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
      benefits
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
export const createLinkedProduct = /* GraphQL */ `
  mutation CreateLinkedProduct(
    $input: CreateLinkedProductInput!
    $condition: ModelLinkedProductConditionInput
  ) {
    createLinkedProduct(input: $input, condition: $condition) {
      id
      productId
      linkedProductId
      linkedProduct {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
        hasFaq
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateLinkedProduct = /* GraphQL */ `
  mutation UpdateLinkedProduct(
    $input: UpdateLinkedProductInput!
    $condition: ModelLinkedProductConditionInput
  ) {
    updateLinkedProduct(input: $input, condition: $condition) {
      id
      productId
      linkedProductId
      linkedProduct {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
        hasFaq
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteLinkedProduct = /* GraphQL */ `
  mutation DeleteLinkedProduct(
    $input: DeleteLinkedProductInput!
    $condition: ModelLinkedProductConditionInput
  ) {
    deleteLinkedProduct(input: $input, condition: $condition) {
      id
      productId
      linkedProductId
      linkedProduct {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
        hasFaq
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
export const updateVariant = /* GraphQL */ `
  mutation UpdateVariant(
    $input: UpdateVariantInput!
    $condition: ModelVariantConditionInput
  ) {
    updateVariant(input: $input, condition: $condition) {
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
export const deleteVariant = /* GraphQL */ `
  mutation DeleteVariant(
    $input: DeleteVariantInput!
    $condition: ModelVariantConditionInput
  ) {
    deleteVariant(input: $input, condition: $condition) {
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
export const createProductImage = /* GraphQL */ `
  mutation CreateProductImage(
    $input: CreateProductImageInput!
    $condition: ModelProductImageConditionInput
  ) {
    createProductImage(input: $input, condition: $condition) {
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
export const updateProductImage = /* GraphQL */ `
  mutation UpdateProductImage(
    $input: UpdateProductImageInput!
    $condition: ModelProductImageConditionInput
  ) {
    updateProductImage(input: $input, condition: $condition) {
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
export const deleteProductImage = /* GraphQL */ `
  mutation DeleteProductImage(
    $input: DeleteProductImageInput!
    $condition: ModelProductImageConditionInput
  ) {
    deleteProductImage(input: $input, condition: $condition) {
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
export const createProductLog = /* GraphQL */ `
  mutation CreateProductLog(
    $input: CreateProductLogInput!
    $condition: ModelProductLogConditionInput
  ) {
    createProductLog(input: $input, condition: $condition) {
      id
      productId
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
      }
      comment
      createdAt
      updatedAt
    }
  }
`;
export const updateProductLog = /* GraphQL */ `
  mutation UpdateProductLog(
    $input: UpdateProductLogInput!
    $condition: ModelProductLogConditionInput
  ) {
    updateProductLog(input: $input, condition: $condition) {
      id
      productId
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
      }
      comment
      createdAt
      updatedAt
    }
  }
`;
export const deleteProductLog = /* GraphQL */ `
  mutation DeleteProductLog(
    $input: DeleteProductLogInput!
    $condition: ModelProductLogConditionInput
  ) {
    deleteProductLog(input: $input, condition: $condition) {
      id
      productId
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
      }
      comment
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
      code
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
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
        code
        storeId
        userId
        discount
        expirationDate
        maxUse
        totalUsed
        isActive
        isFeatured
        couponType
        minOrderValue
        maxDiscount
        description
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
      code
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
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
        code
        storeId
        userId
        discount
        expirationDate
        maxUse
        totalUsed
        isActive
        isFeatured
        couponType
        minOrderValue
        maxDiscount
        description
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
      code
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
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
        code
        storeId
        userId
        discount
        expirationDate
        maxUse
        totalUsed
        isActive
        isFeatured
        couponType
        minOrderValue
        maxDiscount
        description
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
    }
  }
`;
export const createOrderComment = /* GraphQL */ `
  mutation CreateOrderComment(
    $input: CreateOrderCommentInput!
    $condition: ModelOrderCommentConditionInput
  ) {
    createOrderComment(input: $input, condition: $condition) {
      id
      orderId
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
      }
      comment
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrderComment = /* GraphQL */ `
  mutation DeleteOrderComment(
    $input: DeleteOrderCommentInput!
    $condition: ModelOrderCommentConditionInput
  ) {
    deleteOrderComment(input: $input, condition: $condition) {
      id
      orderId
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
      }
      comment
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
      orderId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
export const updateOrderProduct = /* GraphQL */ `
  mutation UpdateOrderProduct(
    $input: UpdateOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    updateOrderProduct(input: $input, condition: $condition) {
      id
      orderId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
export const deleteOrderProduct = /* GraphQL */ `
  mutation DeleteOrderProduct(
    $input: DeleteOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    deleteOrderProduct(input: $input, condition: $condition) {
      id
      orderId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
export const createPayment = /* GraphQL */ `
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
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
export const updatePayment = /* GraphQL */ `
  mutation UpdatePayment(
    $input: UpdatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    updatePayment(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
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
export const deletePayment = /* GraphQL */ `
  mutation DeletePayment(
    $input: DeletePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    deletePayment(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
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
export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
      id
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
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
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
        hasFaq
      }
      rating
      comment
      title
      images
      verified
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
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
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
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
        hasFaq
      }
      rating
      comment
      title
      images
      verified
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
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
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
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
        hasFaq
      }
      rating
      comment
      title
      images
      verified
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
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
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
export const updateWishlist = /* GraphQL */ `
  mutation UpdateWishlist(
    $input: UpdateWishlistInput!
    $condition: ModelWishlistConditionInput
  ) {
    updateWishlist(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
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
export const createWishlistProduct = /* GraphQL */ `
  mutation CreateWishlistProduct(
    $input: CreateWishlistProductInput!
    $condition: ModelWishlistProductConditionInput
  ) {
    createWishlistProduct(input: $input, condition: $condition) {
      id
      wishlistId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
export const updateWishlistProduct = /* GraphQL */ `
  mutation UpdateWishlistProduct(
    $input: UpdateWishlistProductInput!
    $condition: ModelWishlistProductConditionInput
  ) {
    updateWishlistProduct(input: $input, condition: $condition) {
      id
      wishlistId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
export const deleteWishlistProduct = /* GraphQL */ `
  mutation DeleteWishlistProduct(
    $input: DeleteWishlistProductInput!
    $condition: ModelWishlistProductConditionInput
  ) {
    deleteWishlistProduct(input: $input, condition: $condition) {
      id
      wishlistId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
export const updateShoppingCart = /* GraphQL */ `
  mutation UpdateShoppingCart(
    $input: UpdateShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    updateShoppingCart(input: $input, condition: $condition) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
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
export const createShoppingCartProduct = /* GraphQL */ `
  mutation CreateShoppingCartProduct(
    $input: CreateShoppingCartProductInput!
    $condition: ModelShoppingCartProductConditionInput
  ) {
    createShoppingCartProduct(input: $input, condition: $condition) {
      id
      shoppingcartId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
export const updateShoppingCartProduct = /* GraphQL */ `
  mutation UpdateShoppingCartProduct(
    $input: UpdateShoppingCartProductInput!
    $condition: ModelShoppingCartProductConditionInput
  ) {
    updateShoppingCartProduct(input: $input, condition: $condition) {
      id
      shoppingcartId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
export const deleteShoppingCartProduct = /* GraphQL */ `
  mutation DeleteShoppingCartProduct(
    $input: DeleteShoppingCartProductInput!
    $condition: ModelShoppingCartProductConditionInput
  ) {
    deleteShoppingCartProduct(input: $input, condition: $condition) {
      id
      shoppingcartId
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        subCategoryId
        storeId
        bulkActionId
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
        benefits
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
export const createCouponCode = /* GraphQL */ `
  mutation CreateCouponCode(
    $input: CreateCouponCodeInput!
    $condition: ModelCouponCodeConditionInput
  ) {
    createCouponCode(input: $input, condition: $condition) {
      id
      code
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
      }
      discount
      expirationDate
      maxUse
      totalUsed
      isActive
      isFeatured
      couponType
      minOrderValue
      maxDiscount
      description
      paymentMethod
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
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
      }
      discount
      expirationDate
      maxUse
      totalUsed
      isActive
      isFeatured
      couponType
      minOrderValue
      maxDiscount
      description
      paymentMethod
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
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
      }
      discount
      expirationDate
      maxUse
      totalUsed
      isActive
      isFeatured
      couponType
      minOrderValue
      maxDiscount
      description
      paymentMethod
      createdAt
      updatedAt
    }
  }
`;
export const createConfiguration = /* GraphQL */ `
  mutation CreateConfiguration(
    $input: CreateConfigurationInput!
    $condition: ModelConfigurationConditionInput
  ) {
    createConfiguration(input: $input, condition: $condition) {
      id
      storeId
      key
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateConfiguration = /* GraphQL */ `
  mutation UpdateConfiguration(
    $input: UpdateConfigurationInput!
    $condition: ModelConfigurationConditionInput
  ) {
    updateConfiguration(input: $input, condition: $condition) {
      id
      storeId
      key
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteConfiguration = /* GraphQL */ `
  mutation DeleteConfiguration(
    $input: DeleteConfigurationInput!
    $condition: ModelConfigurationConditionInput
  ) {
    deleteConfiguration(input: $input, condition: $condition) {
      id
      storeId
      key
      value
      createdAt
      updatedAt
    }
  }
`;
export const createProductFaq = /* GraphQL */ `
  mutation CreateProductFaq(
    $input: CreateProductFaqInput!
    $condition: ModelProductFaqConditionInput
  ) {
    createProductFaq(input: $input, condition: $condition) {
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
export const updateProductFaq = /* GraphQL */ `
  mutation UpdateProductFaq(
    $input: UpdateProductFaqInput!
    $condition: ModelProductFaqConditionInput
  ) {
    updateProductFaq(input: $input, condition: $condition) {
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
export const deleteProductFaq = /* GraphQL */ `
  mutation DeleteProductFaq(
    $input: DeleteProductFaqInput!
    $condition: ModelProductFaqConditionInput
  ) {
    deleteProductFaq(input: $input, condition: $condition) {
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
export const createZipCode = /* GraphQL */ `
  mutation CreateZipCode(
    $input: CreateZipCodeInput!
    $condition: ModelZipCodeConditionInput
  ) {
    createZipCode(input: $input, condition: $condition) {
      id
      codMaxAmount
      cod
      prepaid
      createdAt
      updatedAt
    }
  }
`;
export const updateZipCode = /* GraphQL */ `
  mutation UpdateZipCode(
    $input: UpdateZipCodeInput!
    $condition: ModelZipCodeConditionInput
  ) {
    updateZipCode(input: $input, condition: $condition) {
      id
      codMaxAmount
      cod
      prepaid
      createdAt
      updatedAt
    }
  }
`;
export const deleteZipCode = /* GraphQL */ `
  mutation DeleteZipCode(
    $input: DeleteZipCodeInput!
    $condition: ModelZipCodeConditionInput
  ) {
    deleteZipCode(input: $input, condition: $condition) {
      id
      codMaxAmount
      cod
      prepaid
      createdAt
      updatedAt
    }
  }
`;
export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
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
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
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
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
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
export const createBulkAction = /* GraphQL */ `
  mutation CreateBulkAction(
    $input: CreateBulkActionInput!
    $condition: ModelBulkActionConditionInput
  ) {
    createBulkAction(input: $input, condition: $condition) {
      id
      storeId
      userId
      action
      csvKey
      status
      message
      completedAt
      createdAt
      updatedAt
    }
  }
`;
export const applyCoupon = /* GraphQL */ `
  mutation ApplyCoupon($code: String!) {
    applyCoupon(code: $code) {
      id
      code
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
        createdAt
        updatedAt
      }
      userId
      user {
        id
        storeId
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
        authProvider
        totalOrders
        totalSpent
        walletBalance
        walletSpent
        totalStoreCredit
        isAdmin
        isCognitoConfirmed
        profilePhotoUrl
        createdAt
        updatedAt
      }
      discount
      expirationDate
      maxUse
      totalUsed
      isActive
      isFeatured
      couponType
      minOrderValue
      maxDiscount
      description
      paymentMethod
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
export const validateTransaction = /* GraphQL */ `
  mutation ValidateTransaction($orderId: ID!, $razorpayPaymentId: String!) {
    validateTransaction(
      orderId: $orderId
      razorpayPaymentId: $razorpayPaymentId
    ) {
      success
      message
    }
  }
`;
export const createStoreShoppingCart = /* GraphQL */ `
  mutation CreateStoreShoppingCart($storeId: ID!) {
    createStoreShoppingCart(storeId: $storeId) {
      id
      storeId
      store {
        id
        name
        description
        isActive
        webUrl
        appId
        host
        priority
        imageUrl
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
