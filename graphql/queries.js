/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const byClientIdStoreSetting = /* GraphQL */ `
  query ByClientIdStoreSetting(
    $clientId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelStoreSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byClientIdStoreSetting(
      clientId: $clientId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clientId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const byOrderIdOrderComments = /* GraphQL */ `
  query ByOrderIdOrderComments(
    $orderId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byOrderIdOrderComments(
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
        storeId
        comment
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
        variantId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const byStoreIdListBulkActions = /* GraphQL */ `
  query ByStoreIdListBulkActions(
    $storeId: ID!
    $filter: ModelBulkActionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byStoreIdListBulkActions(
      storeId: $storeId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        storeId
        userId
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
      nextToken
      __typename
    }
  }
`;
export const byStoreIdRuleEngine = /* GraphQL */ `
  query ByStoreIdRuleEngine($storeId: ID!, $limit: Int, $nextToken: String) {
    byStoreIdRuleEngine(
      storeId: $storeId
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const byUserIdAddress = /* GraphQL */ `
  query ByUserIdAddress(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byUserIdAddress(
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
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      nextToken
      __typename
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
      nextToken
      __typename
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
      nextToken
      __typename
    }
  }
`;
export const getAdminDashboardData = /* GraphQL */ `
  query GetAdminDashboardData(
    $storeId: ID!
    $startDate: String!
    $endDate: String!
  ) {
    getAdminDashboardData(
      storeId: $storeId
      startDate: $startDate
      endDate: $endDate
    ) {
      todaysAgg {
        count
        amount
        __typename
      }
      yesterdayAgg {
        count
        amount
        __typename
      }
      monthlyAgg {
        count
        amount
        __typename
      }
      lastMonthAgg {
        count
        amount
        __typename
      }
      totalOrders
      totalOrderAmount
      confimedOrders
      confimedOrderAmount
      unConfirmedOrders
      unConfirmedOrderAmount
      totalPrepaidOrders
      totalCodOrders
      confirmedPrepaidOrders
      confirmedCodOrders
      averageOrderValue
      ordersByStatus
      orderByDate {
        date
        count
        __typename
      }
      __typename
    }
  }
`;
export const getCollectionType = /* GraphQL */ `
  query GetCollectionType($id: ID!) {
    getCollectionType(id: $id) {
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
export const getCouponRule = /* GraphQL */ `
  query GetCouponRule($code: ID!, $storeId: ID!) {
    getCouponRule(code: $code, storeId: $storeId) {
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
export const getCustomer = /* GraphQL */ `
  query GetCustomer($userId: ID!) {
    getCustomer(userId: $userId) {
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
export const getLoyalty = /* GraphQL */ `
  query GetLoyalty($input: GetLoyaltyInput!) {
    getLoyalty(input: $input) {
      totalAllotted
      totalUsable
      totalUsed
      totalExpired
      totalExpirable
      totalExpirableInNext30Days
      transactions {
        storeId
        userId
        id
        amount
        balance
        expiresAt
        expirePeriodInDays
        event
        ruleId
        status
        reason
        updatedBy
        transactionState
        metadata
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const getMenu = /* GraphQL */ `
  query GetMenu($id: ID!) {
    getMenu(id: $id) {
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
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
export const getProductCategory = /* GraphQL */ `
  query GetProductCategory($id: ID!) {
    getProductCategory(id: $id) {
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
export const getProductFaq = /* GraphQL */ `
  query GetProductFaq($id: ID!) {
    getProductFaq(id: $id) {
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
export const getProductMeta = /* GraphQL */ `
  query GetProductMeta($id: ID!) {
    getProductMeta(id: $id) {
      id
      steppers {
        imageUrl
        title
        description
        priority
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const getRedirects = /* GraphQL */ `
  query GetRedirects($slug: String!, $storeId: ID!) {
    getRedirects(slug: $slug, storeId: $storeId) {
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
export const getStore = /* GraphQL */ `
  query GetStore($id: ID!, $deviceType: DeviceType) {
    getStore(id: $id, deviceType: $deviceType) {
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
export const getStoreSetting = /* GraphQL */ `
  query GetStoreSetting($input: GetStoreSettingInput!) {
    getStoreSetting(input: $input) {
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
        TIMER_START_TIME
        IS_DAILY_TIMER
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
export const getTopCoupons = /* GraphQL */ `
  query GetTopCoupons(
    $storeId: ID!
    $deviceType: DeviceType!
    $nextToken: String
  ) {
    getTopCoupons(
      storeId: $storeId
      deviceType: $deviceType
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($storeId: ID) {
    getUser(storeId: $storeId) {
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
      __typename
    }
  }
`;
export const getUserShoppingCart = /* GraphQL */ `
  query GetUserShoppingCart($storeId: ID!) {
    getUserShoppingCart(storeId: $storeId) {
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
export const getVariant = /* GraphQL */ `
  query GetVariant($id: ID!) {
    getVariant(id: $id) {
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
export const getZipCode = /* GraphQL */ `
  query GetZipCode($id: ID!) {
    getZipCode(id: $id) {
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
export const listAdminRoles = /* GraphQL */ `
  query ListAdminRoles($storeId: ID!, $limit: Int, $nextToken: String) {
    listAdminRoles(storeId: $storeId, limit: $limit, nextToken: $nextToken) {
      items {
        userId
        storeId
        role
        createdBy
        updatedBy
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listAdminStores = /* GraphQL */ `
  query ListAdminStores($limit: Int, $nextToken: String) {
    listAdminStores(limit: $limit, nextToken: $nextToken) {
      items {
        userId
        storeId
        role
        createdBy
        updatedBy
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
      nextToken
      __typename
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
        storeId
        comment
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listRuleEngines = /* GraphQL */ `
  query ListRuleEngines(
    $filter: ModelRuleEngineFilterInput!
    $limit: Int
    $nextToken: String
  ) {
    listRuleEngines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listSurveys = /* GraphQL */ `
  query ListSurveys(
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        type
        name
        options
        status
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listVariantGroups = /* GraphQL */ `
  query ListVariantGroups($storeId: ID!) {
    listVariantGroups(storeId: $storeId) {
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
export const listVariantOptions = /* GraphQL */ `
  query ListVariantOptions($input: ListVariantOptionsInput!) {
    listVariantOptions(input: $input) {
      id
      storeId
      label
      variantGroupId
      __typename
    }
  }
`;
export const reDeploySite = /* GraphQL */ `
  query ReDeploySite($storeId: ID!) {
    reDeploySite(storeId: $storeId) {
      success
      message
      __typename
    }
  }
`;
export const searchCollectionTypes = /* GraphQL */ `
  query SearchCollectionTypes(
    $filter: SearchableCollectionTypeFilterInput
    $sort: [SearchableCollectionTypeSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCollectionTypeAggregationInput]
  ) {
    searchCollectionTypes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const searchCouponRules = /* GraphQL */ `
  query SearchCouponRules(
    $filter: SearchableCouponRuleFilterInput
    $sort: [SearchableCouponRuleSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCouponRuleAggregationInput]
  ) {
    searchCouponRules(
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const searchMenus = /* GraphQL */ `
  query SearchMenus(
    $filter: SearchableMenuFilterInput
    $sort: [SearchableMenuSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableMenuAggregationInput]
  ) {
    searchMenus(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        parentId
        storeId
        priority
        isArchive
        label
        link
        slug
        createdAt
        updatedAt
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
        storeId
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
        rewardPoints
        totalPrice
        refundAmount
        cashbackRefundAmount
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
        freeQuantity
        cancelledQuantity
        quantity
        price
        status
        createdAt
        updatedAt
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
        collectionId
        title
        description
        createdAt
        updatedAt
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const searchRedirects = /* GraphQL */ `
  query SearchRedirects(
    $filter: SearchableRedirectsFilterInput
    $sort: [SearchableRedirectsSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableRedirectsAggregationInput]
  ) {
    searchRedirects(
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
        slug
        redirect
        createdAt
        updatedAt
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
        storeId
        title
        source
        images
        verified
        createdAt
        updatedAt
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const searchShoppingCarts = /* GraphQL */ `
  query SearchShoppingCarts(
    $filter: SearchableShoppingCartFilterInput
    $sort: [SearchableShoppingCartSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableShoppingCartAggregationInput]
  ) {
    searchShoppingCarts(
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
        userId
        couponCodeId
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
        expiresAt
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
        trackingUrl
        imageUrl
        darkImageUrl
        createdAt
        updatedAt
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
        lastOrderDate
        totalRewards
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
