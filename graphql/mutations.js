/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addMoreCodesToBulkCoupon = /* GraphQL */ `
  mutation AddMoreCodesToBulkCoupon($input: AddMoreCodesToBulkCouponInput!) {
    addMoreCodesToBulkCoupon(input: $input) {
      success
      message
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
export const applyCoupon = /* GraphQL */ `
  mutation ApplyCoupon(
    $storeId: ID!
    $code: String
    $deviceType: ApplCouponDeviceType!
  ) {
    applyCoupon(storeId: $storeId, code: $code, deviceType: $deviceType) {
      id
      code
      storeId
      prefix
      userId
      name
      description
      couponType
      deviceType
      expirationDate
      couponCodeCount
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
        createdAt
        updatedAt
        __typename
      }
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
        totalRewards
        __typename
      }
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
        recommended
        recommendPriority
        recommendPrice
        __typename
      }
      buyXQuantity
      getYAmount
      getYPercentage
      getYQuantity
      getYProduct
      minOrderValue
      maxDiscount
      maxAllowedUsage
      applicableCollections
      applicableProducts
      paymentMethod
      isArchive
      isFeatured
      isBulkCoupon
      autoApply
      isAffiliated
      createdBy
      updatedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const bulkCreditLoyaltyPoints = /* GraphQL */ `
  mutation BulkCreditLoyaltyPoints($input: BulkCreditLoyaltyPointsInput!) {
    bulkCreditLoyaltyPoints(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const bulkExportCustomers = /* GraphQL */ `
  mutation BulkExportCustomers($input: BulkExportCustomersInput!) {
    bulkExportCustomers(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const bulkExportOrders = /* GraphQL */ `
  mutation BulkExportOrders($input: BulkExportOrdersInput!) {
    bulkExportOrders(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const bulkExportProducts = /* GraphQL */ `
  mutation BulkExportProducts($input: BulkExportProductsInput!) {
    bulkExportProducts(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const bulkUpdateProducts = /* GraphQL */ `
  mutation BulkUpdateProducts($input: BulkUpdateProductsInput!) {
    bulkUpdateProducts(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const checkInventory = /* GraphQL */ `
  mutation CheckInventory($storeId: ID!, $items: [CheckInventoryInput!]!) {
    checkInventory(storeId: $storeId, items: $items) {
      recordKey
      productId
      variantId
      inventory
      price
      __typename
    }
  }
`;
export const createAdmin = /* GraphQL */ `
  mutation CreateAdmin($input: CreateAdminInput!) {
    createAdmin(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const createBulkAction = /* GraphQL */ `
  mutation CreateBulkAction($input: CreateBulkActionInput!) {
    createBulkAction(input: $input) {
      id
      storeId
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
        totalRewards
        __typename
      }
      action
      status
      arguments
      orignalFilters
      esFilters
      message
      completedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBulkCoupons = /* GraphQL */ `
  mutation CreateBulkCoupons($input: CreateBulkCouponInput!) {
    createBulkCoupons(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const createCollectionType = /* GraphQL */ `
  mutation CreateCollectionType($input: CreateCollectionTypeInput!) {
    createCollectionType(input: $input) {
      id
      slug
      parent
      name
      title
      description
      longDescription
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
        createdAt
        updatedAt
        __typename
      }
      priority
      imageUrl
      bannerUrl
      defaultSorting
      isArchive
      label
      metadata {
        title
        description
        keywords
        image
        canonical
        noIndex
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCoupon = /* GraphQL */ `
  mutation CreateCoupon($input: CreateCouponInput!) {
    createCoupon(input: $input) {
      success
      message
      data {
        id
        code
        storeId
        prefix
        userId
        name
        description
        couponType
        deviceType
        expirationDate
        couponCodeCount
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        minOrderValue
        maxDiscount
        maxAllowedUsage
        applicableCollections
        applicableProducts
        paymentMethod
        isArchive
        isFeatured
        isBulkCoupon
        autoApply
        isAffiliated
        createdBy
        updatedBy
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const createImage = /* GraphQL */ `
  mutation CreateImage($input: CreateImageInput!) {
    createImage(input: $input) {
      id
      productId
      variantId
      storeId
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
export const createLinkedProduct = /* GraphQL */ `
  mutation CreateLinkedProduct($input: CreateLinkedProductInput!) {
    createLinkedProduct(input: $input) {
      id
      productId
      linkedProductId
      variantId
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
        recommended
        recommendPriority
        recommendPrice
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMenu = /* GraphQL */ `
  mutation CreateMenu($input: CreateMenuInput!) {
    createMenu(input: $input) {
      id
      parentId
      storeId
      priority
      menus {
        nextToken
        __typename
      }
      isArchive
      label
      link
      slug
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder($input: CreateNewOrderInput!) {
    createOrder(input: $input) {
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
        trackingUrl
        imageUrl
        darkImageUrl
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
        totalRewards
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
        storeId
        prefix
        userId
        name
        description
        couponType
        deviceType
        expirationDate
        couponCodeCount
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        minOrderValue
        maxDiscount
        maxAllowedUsage
        applicableCollections
        applicableProducts
        paymentMethod
        isArchive
        isFeatured
        isBulkCoupon
        autoApply
        isAffiliated
        createdBy
        updatedBy
        createdAt
        updatedAt
        __typename
      }
      couponDiscount
      prepaidDiscount
      appliedRewardPoints
      totalAmount
      totalRefundAmount
      totalProducts
      totalProductsQuantity
      totalCashbackRefunded
      cashbackEarned
      needAdminVerification
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
      clickId
      isAffiseTrackingValid
      confirmedViaWebhook
      dispatchedAt
      cancelledAt
      timedoutAt
      confirmedAt
      deliveredAt
      returnedAt
      __typename
    }
  }
`;
export const createOrderComment = /* GraphQL */ `
  mutation CreateOrderComment($input: CreateOrderCommentInput!) {
    createOrderComment(input: $input) {
      id
      orderId
      userId
      storeId
      user {
        userId
        name
        email
        phone
        createdBy
        updatedBy
        createdAt
        updatedAt
        __typename
      }
      comment
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      title
      brand
      vendor
      collections
      collectionsList {
        id
        slug
        parent
        name
        title
        description
        longDescription
        storeId
        priority
        imageUrl
        bannerUrl
        defaultSorting
        isArchive
        label
        createdAt
        updatedAt
        __typename
      }
      categoryId
      category {
        id
        categoryID
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
        isArchive
        longDescription
        createdAt
        updatedAt
        __typename
      }
      subCategoryId
      subCategory {
        id
        categoryID
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
        isArchive
        longDescription
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
        trackingUrl
        imageUrl
        darkImageUrl
        createdAt
        updatedAt
        __typename
      }
      variantGroups {
        variantGroupId
        variantGroupOptionIds
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
      pdpCustomAttributes {
        title
        description
        imageKey
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
      ingredients {
        label
        description
        __typename
      }
      metadata {
        title
        description
        keywords
        image
        canonical
        noIndex
        __typename
      }
      recommended
      recommendPriority
      recommendPrice
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
export const createProductCategory = /* GraphQL */ `
  mutation CreateProductCategory($input: CreateProductCategoryInput!) {
    createProductCategory(input: $input) {
      id
      categoryID
      subCategories {
        nextToken
        __typename
      }
      name
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
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
      products {
        nextToken
        __typename
      }
      isArchive
      longDescription
      metadata {
        title
        description
        keywords
        image
        canonical
        noIndex
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProductFaq = /* GraphQL */ `
  mutation CreateProductFaq($input: CreateProductFaqInput!) {
    createProductFaq(input: $input) {
      id
      storeId
      productId
      collectionId
      title
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProductLog = /* GraphQL */ `
  mutation CreateProductLog($input: CreateProductLogInput!) {
    createProductLog(input: $input) {
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
        totalRewards
        __typename
      }
      comment
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRedirects = /* GraphQL */ `
  mutation CreateRedirects($input: CreateRedirectsInput!) {
    createRedirects(input: $input) {
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
        trackingUrl
        imageUrl
        darkImageUrl
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
export const createReview = /* GraphQL */ `
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
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
        totalRewards
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
        recommended
        recommendPriority
        recommendPrice
        __typename
      }
      rating
      comment
      storeId
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
export const createShippingTier = /* GraphQL */ `
  mutation CreateShippingTier($input: CreateShippingTierInput!) {
    createShippingTier(input: $input) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
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
export const createShoppingCart = /* GraphQL */ `
  mutation CreateShoppingCart($input: CreateShoppingCartInput!) {
    createShoppingCart(input: $input) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
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
        totalRewards
        __typename
      }
      couponCodeId
      coupon {
        id
        code
        storeId
        prefix
        userId
        name
        description
        couponType
        deviceType
        expirationDate
        couponCodeCount
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        minOrderValue
        maxDiscount
        maxAllowedUsage
        applicableCollections
        applicableProducts
        paymentMethod
        isArchive
        isFeatured
        isBulkCoupon
        autoApply
        isAffiliated
        createdBy
        updatedBy
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
      expiresAt
      __typename
    }
  }
`;
export const createShoppingCartProduct = /* GraphQL */ `
  mutation CreateShoppingCartProduct($input: CreateShoppingCartProductInput!) {
    createShoppingCartProduct(input: $input) {
      id
      shoppingcartId
      productId
      storeId
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
        recommended
        recommendPriority
        recommendPrice
        __typename
      }
      variantId
      variant {
        id
        productId
        title
        storeId
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
        weight
        weightUnit
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
      }
      quantity
      source
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createStore = /* GraphQL */ `
  mutation CreateStore($input: CreateStoreInput!) {
    createStore(input: $input) {
      id
      name
      title
      description
      isActive
      webUrl
      trackingUrl
      imageUrl
      darkImageUrl
      banners {
        webKey
        mobileKey
        link
        name
        isArchive
        priority
        deviceType
        __typename
      }
      announcements {
        label
        link
        color
        textColor
        deviceType
        isArchive
        __typename
      }
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
export const createStoreSetting = /* GraphQL */ `
  mutation CreateStoreSetting($input: CreateStoreSettingInput!) {
    createStoreSetting(input: $input) {
      id
      clientId
      constants {
        ORDER_CODE_PREFIX
        DOMAIN
        EMAIL_FROM_ADDRESS
        __typename
      }
      email {
        __typename
      }
      sms {
        __typename
      }
      configurations {
        ORDER_COUNT
        COD_CHARGES
        PREPAID_DISCOUNT_PERCENT
        MAX_COD_AMOUNT
        MAX_PREPAID_DISCOUNT
        GUEST_CHECKOUT
        BLOCK_INVENTORY
        COD_ENABLED
        TIMER_TTILE
        TIMER_DESCRIPTION
        TIMER_COLOR
        TIMER_END_TIME
        TIMER_ENABLED
        PREPAID_ENABLED
        __typename
      }
      gupshup {
        id
        accountId
        accountPassword
        __typename
      }
      razorpay {
        encryptionWebhookSecret
        keyId
        keySecret
        __typename
      }
      unicommerce {
        userId
        __typename
      }
      vercel {
        name
        teamId
        projectId
        token
        webUrl
        secret
        __typename
      }
      moengage {
        appId
        baseURL
        secretKey
        __typename
      }
      affise {
        baseURL
        secureCode
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
export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
      totalRewards
      __typename
    }
  }
`;
export const createUserAddress = /* GraphQL */ `
  mutation CreateUserAddress($input: CreateUserAddressInput!) {
    createUserAddress(input: $input) {
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
export const createVariant = /* GraphQL */ `
  mutation CreateVariant($input: CreateVariantInput!) {
    createVariant(input: $input) {
      id
      productId
      title
      storeId
      productVariantOptionIds {
        variantGroupId
        variantGroupOptionId
        __typename
      }
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
      images {
        nextToken
        __typename
      }
      weight
      weightUnit
      minimumOrderQuantity
      inventory
      blockedInventory
      __typename
    }
  }
`;
export const createVariantGroup = /* GraphQL */ `
  mutation CreateVariantGroup($input: CreateVariantGroupInput!) {
    createVariantGroup(input: $input) {
      id
      storeId
      label
      variantOptions {
        id
        storeId
        label
        variantGroupId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createVariantOption = /* GraphQL */ `
  mutation CreateVariantOption($input: CreateVariantOptionInput!) {
    createVariantOption(input: $input) {
      id
      storeId
      label
      variantGroupId
      __typename
    }
  }
`;
export const createZipCode = /* GraphQL */ `
  mutation CreateZipCode($input: CreateZipCodeInput!) {
    createZipCode(input: $input) {
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
export const deleteAdmin = /* GraphQL */ `
  mutation DeleteAdmin($input: DeleteAdminInput!) {
    deleteAdmin(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage($input: DeleteImageInput!) {
    deleteImage(input: $input) {
      id
      productId
      variantId
      storeId
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
export const deleteLinkedProduct = /* GraphQL */ `
  mutation DeleteLinkedProduct($input: DeleteLinkedProductInput!) {
    deleteLinkedProduct(input: $input) {
      id
      productId
      linkedProductId
      variantId
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
        recommended
        recommendPriority
        recommendPrice
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMenu = /* GraphQL */ `
  mutation DeleteMenu($input: DeleteMenuInput!) {
    deleteMenu(input: $input) {
      id
      parentId
      storeId
      priority
      menus {
        nextToken
        __typename
      }
      isArchive
      label
      link
      slug
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct($input: DeleteProductInput!) {
    deleteProduct(input: $input) {
      id
      title
      brand
      vendor
      collections
      collectionsList {
        id
        slug
        parent
        name
        title
        description
        longDescription
        storeId
        priority
        imageUrl
        bannerUrl
        defaultSorting
        isArchive
        label
        createdAt
        updatedAt
        __typename
      }
      categoryId
      category {
        id
        categoryID
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
        isArchive
        longDescription
        createdAt
        updatedAt
        __typename
      }
      subCategoryId
      subCategory {
        id
        categoryID
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
        isArchive
        longDescription
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
        trackingUrl
        imageUrl
        darkImageUrl
        createdAt
        updatedAt
        __typename
      }
      variantGroups {
        variantGroupId
        variantGroupOptionIds
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
      pdpCustomAttributes {
        title
        description
        imageKey
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
      ingredients {
        label
        description
        __typename
      }
      metadata {
        title
        description
        keywords
        image
        canonical
        noIndex
        __typename
      }
      recommended
      recommendPriority
      recommendPrice
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
export const deleteProductCategory = /* GraphQL */ `
  mutation DeleteProductCategory($input: DeleteProductCategoryInput!) {
    deleteProductCategory(input: $input) {
      id
      categoryID
      subCategories {
        nextToken
        __typename
      }
      name
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
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
      products {
        nextToken
        __typename
      }
      isArchive
      longDescription
      metadata {
        title
        description
        keywords
        image
        canonical
        noIndex
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProductFaq = /* GraphQL */ `
  mutation DeleteProductFaq($input: DeleteProductFaqInput!) {
    deleteProductFaq(input: $input) {
      id
      storeId
      productId
      collectionId
      title
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRedirects = /* GraphQL */ `
  mutation DeleteRedirects($input: DeleteRedirectsInput!) {
    deleteRedirects(input: $input) {
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
        trackingUrl
        imageUrl
        darkImageUrl
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
export const deleteShippingTier = /* GraphQL */ `
  mutation DeleteShippingTier($input: DeleteShippingTierInput!) {
    deleteShippingTier(input: $input) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
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
export const deleteShoppingCart = /* GraphQL */ `
  mutation DeleteShoppingCart($input: DeleteShoppingCartInput!) {
    deleteShoppingCart(input: $input) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
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
        totalRewards
        __typename
      }
      couponCodeId
      coupon {
        id
        code
        storeId
        prefix
        userId
        name
        description
        couponType
        deviceType
        expirationDate
        couponCodeCount
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        minOrderValue
        maxDiscount
        maxAllowedUsage
        applicableCollections
        applicableProducts
        paymentMethod
        isArchive
        isFeatured
        isBulkCoupon
        autoApply
        isAffiliated
        createdBy
        updatedBy
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
      expiresAt
      __typename
    }
  }
`;
export const deleteShoppingCartProduct = /* GraphQL */ `
  mutation DeleteShoppingCartProduct($input: DeleteShoppingCartProductInput!) {
    deleteShoppingCartProduct(input: $input) {
      id
      shoppingcartId
      productId
      storeId
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
        recommended
        recommendPriority
        recommendPrice
        __typename
      }
      variantId
      variant {
        id
        productId
        title
        storeId
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
        weight
        weightUnit
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
      }
      quantity
      source
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteStore = /* GraphQL */ `
  mutation DeleteStore($input: DeleteStoreInput!) {
    deleteStore(input: $input) {
      id
      name
      title
      description
      isActive
      webUrl
      trackingUrl
      imageUrl
      darkImageUrl
      banners {
        webKey
        mobileKey
        link
        name
        isArchive
        priority
        deviceType
        __typename
      }
      announcements {
        label
        link
        color
        textColor
        deviceType
        isArchive
        __typename
      }
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
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
      totalRewards
      __typename
    }
  }
`;
export const deleteUserAddress = /* GraphQL */ `
  mutation DeleteUserAddress($input: DeleteUserAddressInput!) {
    deleteUserAddress(input: $input) {
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
export const deleteVariant = /* GraphQL */ `
  mutation DeleteVariant($input: DeleteVariantInput!) {
    deleteVariant(input: $input) {
      id
      productId
      title
      storeId
      productVariantOptionIds {
        variantGroupId
        variantGroupOptionId
        __typename
      }
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
      images {
        nextToken
        __typename
      }
      weight
      weightUnit
      minimumOrderQuantity
      inventory
      blockedInventory
      __typename
    }
  }
`;
export const deleteVariantGroup = /* GraphQL */ `
  mutation DeleteVariantGroup($input: DeleteVariantGroupInput) {
    deleteVariantGroup(input: $input) {
      id
      storeId
      label
      variantOptions {
        id
        storeId
        label
        variantGroupId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteVariantOption = /* GraphQL */ `
  mutation DeleteVariantOption($input: DeleteVariantOptionInput) {
    deleteVariantOption(input: $input) {
      id
      storeId
      label
      variantGroupId
      __typename
    }
  }
`;
export const manageCollectionTypeInProducts = /* GraphQL */ `
  mutation ManageCollectionTypeInProducts(
    $input: ManageCollectionTypeInProductsInput!
  ) {
    manageCollectionTypeInProducts(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const manageShoppingCart = /* GraphQL */ `
  mutation ManageShoppingCart($input: ManageShoppingCartInput!) {
    manageShoppingCart(input: $input) {
      success
      message
      shoppingCartId
      __typename
    }
  }
`;
export const recordUserSurvey = /* GraphQL */ `
  mutation RecordUserSurvey($input: [RecordUserSurveyInput!]!) {
    recordUserSurvey(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const sendAffiseAnalytics = /* GraphQL */ `
  mutation SendAffiseAnalytics($input: SendAffiseAnalyticsInput!) {
    sendAffiseAnalytics(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const updateAdmin = /* GraphQL */ `
  mutation UpdateAdmin($input: UpdateAdminInput!) {
    updateAdmin(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const updateCollectionType = /* GraphQL */ `
  mutation UpdateCollectionType($input: UpdateCollectionTypeInput!) {
    updateCollectionType(input: $input) {
      id
      slug
      parent
      name
      title
      description
      longDescription
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
        createdAt
        updatedAt
        __typename
      }
      priority
      imageUrl
      bannerUrl
      defaultSorting
      isArchive
      label
      metadata {
        title
        description
        keywords
        image
        canonical
        noIndex
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateConfiguration = /* GraphQL */ `
  mutation UpdateConfiguration($input: UpdateConfigurationInput!) {
    updateConfiguration(input: $input) {
      ORDER_COUNT
      COD_CHARGES
      PREPAID_DISCOUNT_PERCENT
      MAX_COD_AMOUNT
      MAX_PREPAID_DISCOUNT
      GUEST_CHECKOUT
      BLOCK_INVENTORY
      COD_ENABLED
      TIMER_TTILE
      TIMER_DESCRIPTION
      TIMER_COLOR
      TIMER_END_TIME
      TIMER_ENABLED
      PREPAID_ENABLED
      __typename
    }
  }
`;
export const updateCouponCode = /* GraphQL */ `
  mutation UpdateCouponCode($input: UpdateCouponCodeInput!) {
    updateCouponCode(input: $input) {
      storeId
      code
      couponRuleId
      usageCount
      createdBy
      updatedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCouponRule = /* GraphQL */ `
  mutation UpdateCouponRule($input: UpdateCouponRuleInput!) {
    updateCouponRule(input: $input) {
      id
      storeId
      prefix
      userId
      name
      description
      couponType
      deviceType
      expirationDate
      couponCodeCount
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
        createdAt
        updatedAt
        __typename
      }
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
        totalRewards
        __typename
      }
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
        recommended
        recommendPriority
        recommendPrice
        __typename
      }
      buyXQuantity
      getYAmount
      getYPercentage
      getYQuantity
      getYProduct
      minOrderValue
      maxDiscount
      maxAllowedUsage
      applicableCollections
      applicableProducts
      paymentMethod
      isFeatured
      isBulkCoupon
      isAffiliated
      isArchive
      autoApply
      createdBy
      updatedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateImage = /* GraphQL */ `
  mutation UpdateImage($input: UpdateImageInput!) {
    updateImage(input: $input) {
      id
      productId
      variantId
      storeId
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
export const updateLoyaltyPoints = /* GraphQL */ `
  mutation UpdateLoyaltyPoints($input: UpdateLoyaltyPointsInput!) {
    updateLoyaltyPoints(input: $input) {
      success
      message
      __typename
    }
  }
`;
export const updateMenu = /* GraphQL */ `
  mutation UpdateMenu($input: UpdateMenuInput!) {
    updateMenu(input: $input) {
      id
      parentId
      storeId
      priority
      menus {
        nextToken
        __typename
      }
      isArchive
      label
      link
      slug
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
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
        trackingUrl
        imageUrl
        darkImageUrl
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
        totalRewards
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
        storeId
        prefix
        userId
        name
        description
        couponType
        deviceType
        expirationDate
        couponCodeCount
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        minOrderValue
        maxDiscount
        maxAllowedUsage
        applicableCollections
        applicableProducts
        paymentMethod
        isArchive
        isFeatured
        isBulkCoupon
        autoApply
        isAffiliated
        createdBy
        updatedBy
        createdAt
        updatedAt
        __typename
      }
      couponDiscount
      prepaidDiscount
      appliedRewardPoints
      totalAmount
      totalRefundAmount
      totalProducts
      totalProductsQuantity
      totalCashbackRefunded
      cashbackEarned
      needAdminVerification
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
      clickId
      isAffiseTrackingValid
      confirmedViaWebhook
      dispatchedAt
      cancelledAt
      timedoutAt
      confirmedAt
      deliveredAt
      returnedAt
      __typename
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      title
      brand
      vendor
      collections
      collectionsList {
        id
        slug
        parent
        name
        title
        description
        longDescription
        storeId
        priority
        imageUrl
        bannerUrl
        defaultSorting
        isArchive
        label
        createdAt
        updatedAt
        __typename
      }
      categoryId
      category {
        id
        categoryID
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
        isArchive
        longDescription
        createdAt
        updatedAt
        __typename
      }
      subCategoryId
      subCategory {
        id
        categoryID
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
        isArchive
        longDescription
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
        trackingUrl
        imageUrl
        darkImageUrl
        createdAt
        updatedAt
        __typename
      }
      variantGroups {
        variantGroupId
        variantGroupOptionIds
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
      pdpCustomAttributes {
        title
        description
        imageKey
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
      ingredients {
        label
        description
        __typename
      }
      metadata {
        title
        description
        keywords
        image
        canonical
        noIndex
        __typename
      }
      recommended
      recommendPriority
      recommendPrice
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
export const updateProductCategory = /* GraphQL */ `
  mutation UpdateProductCategory($input: UpdateProductCategoryInput!) {
    updateProductCategory(input: $input) {
      id
      categoryID
      subCategories {
        nextToken
        __typename
      }
      name
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
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
      products {
        nextToken
        __typename
      }
      isArchive
      longDescription
      metadata {
        title
        description
        keywords
        image
        canonical
        noIndex
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateProductFaq = /* GraphQL */ `
  mutation UpdateProductFaq($input: UpdateProductFaqInput!) {
    updateProductFaq(input: $input) {
      id
      storeId
      productId
      collectionId
      title
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRedirects = /* GraphQL */ `
  mutation UpdateRedirects($input: UpdateRedirectsInput!) {
    updateRedirects(input: $input) {
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
        trackingUrl
        imageUrl
        darkImageUrl
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
export const updateReview = /* GraphQL */ `
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
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
        totalRewards
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
        recommended
        recommendPriority
        recommendPrice
        __typename
      }
      rating
      comment
      storeId
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
export const updateRuleEngine = /* GraphQL */ `
  mutation UpdateRuleEngine($input: UpdateRuleEngineInput!) {
    updateRuleEngine(input: $input) {
      id
      storeId
      name
      description
      event
      enabled
      type
      minOrderValue
      maxCashbackAllowed
      cashbackPercentage
      expirePeriodInDays
      cashbackPoint
      couponName
      maxDebitableCashbackPerMonth
      maxCreditableCashbackPerMonth
      conditions {
        event
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateShippingTier = /* GraphQL */ `
  mutation UpdateShippingTier($input: UpdateShippingTierInput!) {
    updateShippingTier(input: $input) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
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
export const updateShoppingCart = /* GraphQL */ `
  mutation UpdateShoppingCart($input: UpdateShoppingCartInput!) {
    updateShoppingCart(input: $input) {
      id
      storeId
      store {
        id
        name
        title
        description
        isActive
        webUrl
        trackingUrl
        imageUrl
        darkImageUrl
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
        totalRewards
        __typename
      }
      couponCodeId
      coupon {
        id
        code
        storeId
        prefix
        userId
        name
        description
        couponType
        deviceType
        expirationDate
        couponCodeCount
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        minOrderValue
        maxDiscount
        maxAllowedUsage
        applicableCollections
        applicableProducts
        paymentMethod
        isArchive
        isFeatured
        isBulkCoupon
        autoApply
        isAffiliated
        createdBy
        updatedBy
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
      expiresAt
      __typename
    }
  }
`;
export const updateShoppingCartProduct = /* GraphQL */ `
  mutation UpdateShoppingCartProduct($input: UpdateShoppingCartProductInput!) {
    updateShoppingCartProduct(input: $input) {
      id
      shoppingcartId
      productId
      storeId
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
        recommended
        recommendPriority
        recommendPrice
        __typename
      }
      variantId
      variant {
        id
        productId
        title
        storeId
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
        weight
        weightUnit
        minimumOrderQuantity
        inventory
        blockedInventory
        __typename
      }
      quantity
      source
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateStore = /* GraphQL */ `
  mutation UpdateStore($input: UpdateStoreInput!) {
    updateStore(input: $input) {
      id
      name
      title
      description
      isActive
      webUrl
      trackingUrl
      imageUrl
      darkImageUrl
      banners {
        webKey
        mobileKey
        link
        name
        isArchive
        priority
        deviceType
        __typename
      }
      announcements {
        label
        link
        color
        textColor
        deviceType
        isArchive
        __typename
      }
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
export const updateStoreSetting = /* GraphQL */ `
  mutation UpdateStoreSetting($input: UpdateStoreSettingInput!) {
    updateStoreSetting(input: $input) {
      id
      clientId
      constants {
        ORDER_CODE_PREFIX
        DOMAIN
        EMAIL_FROM_ADDRESS
        __typename
      }
      email {
        __typename
      }
      sms {
        __typename
      }
      configurations {
        ORDER_COUNT
        COD_CHARGES
        PREPAID_DISCOUNT_PERCENT
        MAX_COD_AMOUNT
        MAX_PREPAID_DISCOUNT
        GUEST_CHECKOUT
        BLOCK_INVENTORY
        COD_ENABLED
        TIMER_TTILE
        TIMER_DESCRIPTION
        TIMER_COLOR
        TIMER_END_TIME
        TIMER_ENABLED
        PREPAID_ENABLED
        __typename
      }
      gupshup {
        id
        accountId
        accountPassword
        __typename
      }
      razorpay {
        encryptionWebhookSecret
        keyId
        keySecret
        __typename
      }
      unicommerce {
        userId
        __typename
      }
      vercel {
        name
        teamId
        projectId
        token
        webUrl
        secret
        __typename
      }
      moengage {
        appId
        baseURL
        secretKey
        __typename
      }
      affise {
        baseURL
        secureCode
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
      totalRewards
      __typename
    }
  }
`;
export const updateUserAddress = /* GraphQL */ `
  mutation UpdateUserAddress($input: UpdateUserAddressInput!) {
    updateUserAddress(input: $input) {
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
export const updateVariant = /* GraphQL */ `
  mutation UpdateVariant($input: UpdateVariantInput!) {
    updateVariant(input: $input) {
      id
      productId
      title
      storeId
      productVariantOptionIds {
        variantGroupId
        variantGroupOptionId
        __typename
      }
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
      images {
        nextToken
        __typename
      }
      weight
      weightUnit
      minimumOrderQuantity
      inventory
      blockedInventory
      __typename
    }
  }
`;
export const updateVariantGroup = /* GraphQL */ `
  mutation UpdateVariantGroup($input: UpdateVariantGroupInput) {
    updateVariantGroup(input: $input) {
      id
      storeId
      label
      variantOptions {
        id
        storeId
        label
        variantGroupId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateVariantOption = /* GraphQL */ `
  mutation UpdateVariantOption($input: UpdateVariantOptionInput) {
    updateVariantOption(input: $input) {
      id
      storeId
      label
      variantGroupId
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
