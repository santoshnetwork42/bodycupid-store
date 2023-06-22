/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      lastOrderDate
      walletBalance
      walletSpent
      totalStoreCredit
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
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
        __typename
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
        __typename
      }
      totalStoreCredit
      couponCodeId
      coupon {
        id
        code
        description
        groupId
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
        abandonCart
        createdAt
        updatedAt
        __typename
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
        __typename
      }
      payments {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
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
      confirmedViaWebhook
      __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      comment
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
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
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
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
      shippingCourier
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
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      orderId
      method
      status
      amount
      paymentDate
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
      }
      userId
      wishlistProducts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCoupon = /* GraphQL */ `
  mutation DeleteCoupon(
    $input: DeleteCouponInput!
    $condition: ModelCouponConditionInput
  ) {
    deleteCoupon(input: $input, condition: $condition) {
      id
      code
      description
      groupId
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
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
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
        minimumOrderQuantity
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
        __typename
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
      abandonCart
      abandonCartTemplate {
        sms
        whatsapp
        __typename
      }
      createdAt
      updatedAt
      __typename
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
      csv
      status
      message
      completedAt
      createdAt
      updatedAt
      __typename
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
      csv
      status
      message
      completedAt
      createdAt
      updatedAt
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      lastOrderDate
      walletBalance
      walletSpent
      totalStoreCredit
      __typename
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
      totalOrders
      totalSpent
      lastOrderDate
      walletBalance
      walletSpent
      totalStoreCredit
      __typename
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
      __typename
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
      __typename
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
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
      }
      title
      description
      slug
      isFeatured
      totalProducts
      priority
      imageUrl
      bannerUrl
      showInMenu
      products {
        nextToken
        __typename
      }
      subCategory {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
      }
      title
      description
      slug
      isFeatured
      totalProducts
      priority
      imageUrl
      bannerUrl
      showInMenu
      products {
        nextToken
        __typename
      }
      subCategory {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
      }
      title
      description
      slug
      isFeatured
      totalProducts
      priority
      imageUrl
      bannerUrl
      showInMenu
      products {
        nextToken
        __typename
      }
      subCategory {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        showInMenu
        createdAt
        updatedAt
        __typename
      }
      slug
      isFeatured
      totalProducts
      priority
      imageUrl
      bannerUrl
      showInMenu
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        showInMenu
        createdAt
        updatedAt
        __typename
      }
      slug
      isFeatured
      totalProducts
      priority
      imageUrl
      bannerUrl
      showInMenu
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        showInMenu
        createdAt
        updatedAt
        __typename
      }
      slug
      isFeatured
      totalProducts
      priority
      imageUrl
      bannerUrl
      showInMenu
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      announcements
      socialLinks {
        instagram
        facebook
        twitter
        youtube
        pinterest
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      announcements
      socialLinks {
        instagram
        facebook
        twitter
        youtube
        pinterest
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      announcements
      socialLinks {
        instagram
        facebook
        twitter
        youtube
        pinterest
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
      }
      currentQuantity
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
      }
      currentQuantity
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
      }
      currentQuantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createShippingTier = /* GraphQL */ `
  mutation CreateShippingTier(
    $input: CreateShippingTierInput!
    $condition: ModelShippingTierConditionInput
  ) {
    createShippingTier(input: $input, condition: $condition) {
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
        __typename
      }
      paymentType
      amount
      minOrderValue
      maxOrderValue
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateShippingTier = /* GraphQL */ `
  mutation UpdateShippingTier(
    $input: UpdateShippingTierInput!
    $condition: ModelShippingTierConditionInput
  ) {
    updateShippingTier(input: $input, condition: $condition) {
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
        __typename
      }
      paymentType
      amount
      minOrderValue
      maxOrderValue
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteShippingTier = /* GraphQL */ `
  mutation DeleteShippingTier(
    $input: DeleteShippingTierInput!
    $condition: ModelShippingTierConditionInput
  ) {
    deleteShippingTier(input: $input, condition: $condition) {
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
        __typename
      }
      paymentType
      amount
      minOrderValue
      maxOrderValue
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCollection = /* GraphQL */ `
  mutation CreateCollection(
    $input: CreateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    createCollection(input: $input, condition: $condition) {
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
        __typename
      }
      showInMenu
      priority
      imageUrl
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection(
    $input: UpdateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    updateCollection(input: $input, condition: $condition) {
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
        __typename
      }
      showInMenu
      priority
      imageUrl
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection(
    $input: DeleteCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    deleteCollection(input: $input, condition: $condition) {
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
        __typename
      }
      showInMenu
      priority
      imageUrl
      createdAt
      updatedAt
      __typename
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
        showInMenu
        createdAt
        updatedAt
        __typename
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
        showInMenu
        createdAt
        updatedAt
        __typename
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
        __typename
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
      minimumOrderQuantity
      inventory
      blockedInventory
      continueSellingOutOfStock
      rating
      totalRatings
      totalOrders
      additionalInfo {
        label
        value
        __typename
      }
      thumbImages
      isTaxEnabled
      isInventoryEnabled
      googleCategory
      hasVarient
      hasFaq
      variants {
        nextToken
        __typename
      }
      images {
        nextToken
        __typename
      }
      reviews {
        nextToken
        __typename
      }
      linkedProducts {
        nextToken
        __typename
      }
      __typename
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
        showInMenu
        createdAt
        updatedAt
        __typename
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
        showInMenu
        createdAt
        updatedAt
        __typename
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
        __typename
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
      minimumOrderQuantity
      inventory
      blockedInventory
      continueSellingOutOfStock
      rating
      totalRatings
      totalOrders
      additionalInfo {
        label
        value
        __typename
      }
      thumbImages
      isTaxEnabled
      isInventoryEnabled
      googleCategory
      hasVarient
      hasFaq
      variants {
        nextToken
        __typename
      }
      images {
        nextToken
        __typename
      }
      reviews {
        nextToken
        __typename
      }
      linkedProducts {
        nextToken
        __typename
      }
      __typename
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
        showInMenu
        createdAt
        updatedAt
        __typename
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
        showInMenu
        createdAt
        updatedAt
        __typename
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
        __typename
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
      minimumOrderQuantity
      inventory
      blockedInventory
      continueSellingOutOfStock
      rating
      totalRatings
      totalOrders
      additionalInfo {
        label
        value
        __typename
      }
      thumbImages
      isTaxEnabled
      isInventoryEnabled
      googleCategory
      hasVarient
      hasFaq
      variants {
        nextToken
        __typename
      }
      images {
        nextToken
        __typename
      }
      reviews {
        nextToken
        __typename
      }
      linkedProducts {
        nextToken
        __typename
      }
      __typename
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
        minimumOrderQuantity
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
      minimumOrderQuantity
      inventory
      blockedInventory
      __typename
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
      minimumOrderQuantity
      inventory
      blockedInventory
      __typename
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
      minimumOrderQuantity
      inventory
      blockedInventory
      __typename
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
      __typename
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
      __typename
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
      __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      comment
      createdAt
      updatedAt
      __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      comment
      createdAt
      updatedAt
      __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      comment
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
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
        __typename
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
        __typename
      }
      totalStoreCredit
      couponCodeId
      coupon {
        id
        code
        description
        groupId
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
        abandonCart
        createdAt
        updatedAt
        __typename
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
        __typename
      }
      payments {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
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
      confirmedViaWebhook
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
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
        __typename
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
        __typename
      }
      totalStoreCredit
      couponCodeId
      coupon {
        id
        code
        description
        groupId
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
        abandonCart
        createdAt
        updatedAt
        __typename
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
        __typename
      }
      payments {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
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
      confirmedViaWebhook
      __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      comment
      createdAt
      updatedAt
      __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      comment
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
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
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
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
      shippingCourier
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
      __typename
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
        minimumOrderQuantity
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
        __typename
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
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
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
      shippingCourier
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
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      orderId
      method
      status
      amount
      paymentDate
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      orderId
      method
      status
      amount
      paymentDate
      createdAt
      updatedAt
      __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      reviewer {
        name
        email
        __typename
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
        minimumOrderQuantity
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
        __typename
      }
      rating
      comment
      title
      source
      images
      verified
      createdAt
      updatedAt
      __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      reviewer {
        name
        email
        __typename
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
        minimumOrderQuantity
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
        __typename
      }
      rating
      comment
      title
      source
      images
      verified
      createdAt
      updatedAt
      __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      reviewer {
        name
        email
        __typename
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
        minimumOrderQuantity
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
        __typename
      }
      rating
      comment
      title
      source
      images
      verified
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
      }
      userId
      wishlistProducts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
      }
      userId
      wishlistProducts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
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
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
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
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
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
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      couponCodeId
      coupon {
        id
        code
        description
        groupId
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
        abandonCart
        createdAt
        updatedAt
        __typename
      }
      utmSource
      utmContent
      utmMedium
      utmCampaign
      utmTerm
      source
      referrer
      landingPage
      createdAt
      updatedAt
      shoppingcartProducts {
        nextToken
        __typename
      }
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      couponCodeId
      coupon {
        id
        code
        description
        groupId
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
        abandonCart
        createdAt
        updatedAt
        __typename
      }
      utmSource
      utmContent
      utmMedium
      utmCampaign
      utmTerm
      source
      referrer
      landingPage
      createdAt
      updatedAt
      shoppingcartProducts {
        nextToken
        __typename
      }
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      couponCodeId
      coupon {
        id
        code
        description
        groupId
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
        abandonCart
        createdAt
        updatedAt
        __typename
      }
      utmSource
      utmContent
      utmMedium
      utmCampaign
      utmTerm
      source
      referrer
      landingPage
      createdAt
      updatedAt
      shoppingcartProducts {
        nextToken
        __typename
      }
      __typename
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
        minimumOrderQuantity
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
        __typename
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
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
      }
      quantity
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
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
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
      }
      quantity
      createdAt
      updatedAt
      __typename
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
        minimumOrderQuantity
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
        __typename
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
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
      }
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCoupon = /* GraphQL */ `
  mutation CreateCoupon(
    $input: CreateCouponInput!
    $condition: ModelCouponConditionInput
  ) {
    createCoupon(input: $input, condition: $condition) {
      id
      code
      description
      groupId
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
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
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
        minimumOrderQuantity
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
        __typename
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
      abandonCart
      abandonCartTemplate {
        sms
        whatsapp
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCoupon = /* GraphQL */ `
  mutation UpdateCoupon(
    $input: UpdateCouponInput!
    $condition: ModelCouponConditionInput
  ) {
    updateCoupon(input: $input, condition: $condition) {
      id
      code
      description
      groupId
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
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
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
        minimumOrderQuantity
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
        __typename
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
      abandonCart
      abandonCartTemplate {
        sms
        whatsapp
        __typename
      }
      createdAt
      updatedAt
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
      csv
      status
      message
      completedAt
      createdAt
      updatedAt
      __typename
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
      storeId
      slug
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
        __typename
      }
      redirect
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRedirects = /* GraphQL */ `
  mutation UpdateRedirects(
    $input: UpdateRedirectsInput!
    $condition: ModelRedirectsConditionInput
  ) {
    updateRedirects(input: $input, condition: $condition) {
      id
      storeId
      slug
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
        __typename
      }
      redirect
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRedirects = /* GraphQL */ `
  mutation DeleteRedirects(
    $input: DeleteRedirectsInput!
    $condition: ModelRedirectsConditionInput
  ) {
    deleteRedirects(input: $input, condition: $condition) {
      id
      storeId
      slug
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
        __typename
      }
      redirect
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const checkInventory = /* GraphQL */ `
  mutation CheckInventory($input: [CheckInventoryInput!]!) {
    checkInventory(input: $input) {
      recordKey
      productId
      variantId
      inventory
      price
      __typename
    }
  }
`;
export const applyCoupon = /* GraphQL */ `
  mutation ApplyCoupon($code: String!) {
    applyCoupon(code: $code) {
      id
      code
      description
      groupId
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
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
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
        minimumOrderQuantity
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
        __typename
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
      abandonCart
      abandonCartTemplate {
        sms
        whatsapp
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction($orderId: ID!) {
    createTransaction(orderId: $orderId) {
      orderId
      amount
      __typename
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
      __typename
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
        title
        description
        isActive
        webUrl
        imageUrl
        darkImageUrl
        announcements
        createdAt
        updatedAt
        __typename
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
        lastOrderDate
        walletBalance
        walletSpent
        totalStoreCredit
        __typename
      }
      couponCodeId
      coupon {
        id
        code
        description
        groupId
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
        abandonCart
        createdAt
        updatedAt
        __typename
      }
      utmSource
      utmContent
      utmMedium
      utmCampaign
      utmTerm
      source
      referrer
      landingPage
      createdAt
      updatedAt
      shoppingcartProducts {
        nextToken
        __typename
      }
      __typename
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
      __typename
    }
  }
`;
export const exportProducts = /* GraphQL */ `
  mutation ExportProducts($input: ExportProductInput!) {
    exportProducts(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const exportOrders = /* GraphQL */ `
  mutation ExportOrders($input: ExportOrderInput!) {
    exportOrders(input: $input) {
      success
      message
      __typename
    }
  }
`;
