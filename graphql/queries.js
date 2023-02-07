/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCouponCode = /* GraphQL */ `
  query GetCouponCode($id: ID!) {
    getCouponCode(id: $id) {
      id
      code
      discount
      expirationSate
      isActive
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
        expirationSate
        isActive
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
      profilePhotoUrl
      wishlists {
        items {
          id
          userId
          wishlistProducts {
            items {
              id
              wishlistId
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              variantId
              variant {
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
              quantity
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      shopingcarts {
        items {
          id
          userId
          shoppingcartProducts {
            items {
              id
              shoppingcartId
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              variantId
              variant {
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
              quantity
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      reviews {
        items {
          id
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
            profilePhotoUrl
            wishlists {
              items {
                id
                userId
                wishlistProducts {
                  nextToken
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            shopingcarts {
              items {
                id
                userId
                shoppingcartProducts {
                  nextToken
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            reviews {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
            orders {
              items {
                id
                code
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
                BillingAddress {
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
                CouponCodeId
                totalCashOnDeliveryCharges
                totalDiscount
                totalGiftCharges
                totalPrepaidAmount
                totalShippingCharges
                taxExempted
                cFormProvided
                thirdPartyShipping
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
                createdAt
                updatedAt
              }
              nextToken
            }
            payments {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                orderId
                method
                amount
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          productId
          product {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          rating
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      orders {
        items {
          id
          code
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
            profilePhotoUrl
            wishlists {
              items {
                id
                userId
                wishlistProducts {
                  nextToken
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            shopingcarts {
              items {
                id
                userId
                shoppingcartProducts {
                  nextToken
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            reviews {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
            orders {
              items {
                id
                code
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
                BillingAddress {
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
                CouponCodeId
                totalCashOnDeliveryCharges
                totalDiscount
                totalGiftCharges
                totalPrepaidAmount
                totalShippingCharges
                taxExempted
                cFormProvided
                thirdPartyShipping
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
                createdAt
                updatedAt
              }
              nextToken
            }
            payments {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                orderId
                method
                amount
                createdAt
                updatedAt
              }
              nextToken
            }
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
          BillingAddress {
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
          CouponCodeId
          totalCashOnDeliveryCharges
          totalDiscount
          totalGiftCharges
          totalPrepaidAmount
          totalShippingCharges
          taxExempted
          cFormProvided
          thirdPartyShipping
          sla
          priority
          orderDate
          status
          products {
            items {
              id
              orderId
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              variantId
              variant {
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
              quantity
              price
              status
              createdAt
              updatedAt
            }
            nextToken
          }
          payments {
            items {
              id
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
              orderId
              method
              amount
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      payments {
        items {
          id
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
            profilePhotoUrl
            wishlists {
              items {
                id
                userId
                wishlistProducts {
                  nextToken
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            shopingcarts {
              items {
                id
                userId
                shoppingcartProducts {
                  nextToken
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            reviews {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
            orders {
              items {
                id
                code
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
                BillingAddress {
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
                CouponCodeId
                totalCashOnDeliveryCharges
                totalDiscount
                totalGiftCharges
                totalPrepaidAmount
                totalShippingCharges
                taxExempted
                cFormProvided
                thirdPartyShipping
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
                createdAt
                updatedAt
              }
              nextToken
            }
            payments {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                orderId
                method
                amount
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          orderId
          method
          amount
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
        profilePhotoUrl
        wishlists {
          items {
            id
            userId
            wishlistProducts {
              items {
                id
                wishlistId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        shopingcarts {
          items {
            id
            userId
            shoppingcartProducts {
              items {
                id
                shoppingcartId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        reviews {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
        orders {
          items {
            id
            code
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
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
            BillingAddress {
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
            CouponCodeId
            totalCashOnDeliveryCharges
            totalDiscount
            totalGiftCharges
            totalPrepaidAmount
            totalShippingCharges
            taxExempted
            cFormProvided
            thirdPartyShipping
            sla
            priority
            orderDate
            status
            products {
              items {
                id
                orderId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                price
                status
                createdAt
                updatedAt
              }
              nextToken
            }
            payments {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                orderId
                method
                amount
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        payments {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            orderId
            method
            amount
            createdAt
            updatedAt
          }
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
        profilePhotoUrl
        wishlists {
          items {
            id
            userId
            wishlistProducts {
              items {
                id
                wishlistId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        shopingcarts {
          items {
            id
            userId
            shoppingcartProducts {
              items {
                id
                shoppingcartId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        reviews {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
        orders {
          items {
            id
            code
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
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
            BillingAddress {
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
            CouponCodeId
            totalCashOnDeliveryCharges
            totalDiscount
            totalGiftCharges
            totalPrepaidAmount
            totalShippingCharges
            taxExempted
            cFormProvided
            thirdPartyShipping
            sla
            priority
            orderDate
            status
            products {
              items {
                id
                orderId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                price
                status
                createdAt
                updatedAt
              }
              nextToken
            }
            payments {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                orderId
                method
                amount
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        payments {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            orderId
            method
            amount
            createdAt
            updatedAt
          }
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
      description
      isFeatured
      totalProducts
      priority
      imageUrl
      products {
        items {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
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
        description
        isFeatured
        totalProducts
        priority
        imageUrl
        products {
          items {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bynameProductCategory = /* GraphQL */ `
  query BynameProductCategory(
    $name: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bynameProductCategory(
      name: $name
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        isFeatured
        totalProducts
        priority
        imageUrl
        products {
          items {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          nextToken
        }
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
        description
        isFeatured
        totalProducts
        priority
        imageUrl
        products {
          items {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
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
export const getStore = /* GraphQL */ `
  query GetStore($id: ID!) {
    getStore(id: $id) {
      id
      name
      description
      address
      totalProducts
      priority
      imageUrl
      products {
        items {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        nextToken
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
        description
        address
        totalProducts
        priority
        imageUrl
        products {
          items {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          nextToken
        }
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
        description
        address
        totalProducts
        priority
        imageUrl
        products {
          items {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
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
export const getWarehouse = /* GraphQL */ `
  query GetWarehouse($id: ID!) {
    getWarehouse(id: $id) {
      id
      facilityCode
      name
      description
      address
      totalProducts
      totalQuantity
      priority
      imageUrl
      productInventory {
        items {
          id
          warehouseId
          productId
          product {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          currentQuantity
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
export const listWarehouses = /* GraphQL */ `
  query ListWarehouses(
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWarehouses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        facilityCode
        name
        description
        address
        totalProducts
        totalQuantity
        priority
        imageUrl
        productInventory {
          items {
            id
            warehouseId
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            currentQuantity
            createdAt
            updatedAt
          }
          nextToken
        }
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
        facilityCode
        name
        description
        address
        totalProducts
        totalQuantity
        priority
        imageUrl
        productInventory {
          items {
            id
            warehouseId
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            currentQuantity
            createdAt
            updatedAt
          }
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
        categoryId
        storeId
        store {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        isFeatured
        category {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
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
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
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
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
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
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
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
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
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
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      title
      brand
      vendor
      categoryId
      storeId
      store {
        id
        name
        description
        isFeatured
        totalProducts
        priority
        imageUrl
        products {
          items {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      isFeatured
      category {
        id
        name
        description
        isFeatured
        totalProducts
        priority
        imageUrl
        products {
          items {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          nextToken
        }
        createdAt
        updatedAt
      }
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
            profilePhotoUrl
            wishlists {
              items {
                id
                userId
                wishlistProducts {
                  nextToken
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            shopingcarts {
              items {
                id
                userId
                shoppingcartProducts {
                  nextToken
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            reviews {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
            orders {
              items {
                id
                code
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
                BillingAddress {
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
                CouponCodeId
                totalCashOnDeliveryCharges
                totalDiscount
                totalGiftCharges
                totalPrepaidAmount
                totalShippingCharges
                taxExempted
                cFormProvided
                thirdPartyShipping
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
                createdAt
                updatedAt
              }
              nextToken
            }
            payments {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                orderId
                method
                amount
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          productId
          product {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          rating
          comment
          createdAt
          updatedAt
        }
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
        categoryId
        storeId
        store {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        isFeatured
        category {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const bytitleProduct = /* GraphQL */ `
  query BytitleProduct(
    $title: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bytitleProduct(
      title: $title
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
        categoryId
        storeId
        store {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        isFeatured
        category {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
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
        categoryId
        storeId
        store {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        isFeatured
        category {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
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
        categoryId
        storeId
        store {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        isFeatured
        category {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
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
        categoryId
        storeId
        store {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        isFeatured
        category {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
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
export const byProductIdCreatedAtVariant = /* GraphQL */ `
  query ByProductIdCreatedAtVariant(
    $productId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVariantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductIdCreatedAtVariant(
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
export const byProductIdCreatedAtProductImage = /* GraphQL */ `
  query ByProductIdCreatedAtProductImage(
    $productId: ID!
    $position: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProductIdCreatedAtProductImage(
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
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      code
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
        profilePhotoUrl
        wishlists {
          items {
            id
            userId
            wishlistProducts {
              items {
                id
                wishlistId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        shopingcarts {
          items {
            id
            userId
            shoppingcartProducts {
              items {
                id
                shoppingcartId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        reviews {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
        orders {
          items {
            id
            code
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
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
            BillingAddress {
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
            CouponCodeId
            totalCashOnDeliveryCharges
            totalDiscount
            totalGiftCharges
            totalPrepaidAmount
            totalShippingCharges
            taxExempted
            cFormProvided
            thirdPartyShipping
            sla
            priority
            orderDate
            status
            products {
              items {
                id
                orderId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                price
                status
                createdAt
                updatedAt
              }
              nextToken
            }
            payments {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                orderId
                method
                amount
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        payments {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            orderId
            method
            amount
            createdAt
            updatedAt
          }
          nextToken
        }
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
      BillingAddress {
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
      CouponCodeId
      totalCashOnDeliveryCharges
      totalDiscount
      totalGiftCharges
      totalPrepaidAmount
      totalShippingCharges
      taxExempted
      cFormProvided
      thirdPartyShipping
      sla
      priority
      orderDate
      status
      products {
        items {
          id
          orderId
          productId
          product {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          variantId
          variant {
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
          quantity
          price
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      payments {
        items {
          id
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
            profilePhotoUrl
            wishlists {
              items {
                id
                userId
                wishlistProducts {
                  nextToken
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            shopingcarts {
              items {
                id
                userId
                shoppingcartProducts {
                  nextToken
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            reviews {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
            orders {
              items {
                id
                code
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
                BillingAddress {
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
                CouponCodeId
                totalCashOnDeliveryCharges
                totalDiscount
                totalGiftCharges
                totalPrepaidAmount
                totalShippingCharges
                taxExempted
                cFormProvided
                thirdPartyShipping
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
                createdAt
                updatedAt
              }
              nextToken
            }
            payments {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                orderId
                method
                amount
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          orderId
          method
          amount
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
          profilePhotoUrl
          wishlists {
            items {
              id
              userId
              wishlistProducts {
                items {
                  id
                  wishlistId
                  productId
                  variantId
                  quantity
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          shopingcarts {
            items {
              id
              userId
              shoppingcartProducts {
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
              createdAt
              updatedAt
            }
            nextToken
          }
          reviews {
            items {
              id
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
          orders {
            items {
              id
              code
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
              BillingAddress {
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
              CouponCodeId
              totalCashOnDeliveryCharges
              totalDiscount
              totalGiftCharges
              totalPrepaidAmount
              totalShippingCharges
              taxExempted
              cFormProvided
              thirdPartyShipping
              sla
              priority
              orderDate
              status
              products {
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
                  quantity
                  price
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          payments {
            items {
              id
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
              orderId
              method
              amount
              createdAt
              updatedAt
            }
            nextToken
          }
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
        BillingAddress {
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
        CouponCodeId
        totalCashOnDeliveryCharges
        totalDiscount
        totalGiftCharges
        totalPrepaidAmount
        totalShippingCharges
        taxExempted
        cFormProvided
        thirdPartyShipping
        sla
        priority
        orderDate
        status
        products {
          items {
            id
            orderId
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            variantId
            variant {
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
            quantity
            price
            status
            createdAt
            updatedAt
          }
          nextToken
        }
        payments {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            orderId
            method
            amount
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
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
          profilePhotoUrl
          wishlists {
            items {
              id
              userId
              wishlistProducts {
                items {
                  id
                  wishlistId
                  productId
                  variantId
                  quantity
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          shopingcarts {
            items {
              id
              userId
              shoppingcartProducts {
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
              createdAt
              updatedAt
            }
            nextToken
          }
          reviews {
            items {
              id
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
          orders {
            items {
              id
              code
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
              BillingAddress {
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
              CouponCodeId
              totalCashOnDeliveryCharges
              totalDiscount
              totalGiftCharges
              totalPrepaidAmount
              totalShippingCharges
              taxExempted
              cFormProvided
              thirdPartyShipping
              sla
              priority
              orderDate
              status
              products {
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
                  quantity
                  price
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          payments {
            items {
              id
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
              orderId
              method
              amount
              createdAt
              updatedAt
            }
            nextToken
          }
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
        BillingAddress {
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
        CouponCodeId
        totalCashOnDeliveryCharges
        totalDiscount
        totalGiftCharges
        totalPrepaidAmount
        totalShippingCharges
        taxExempted
        cFormProvided
        thirdPartyShipping
        sla
        priority
        orderDate
        status
        products {
          items {
            id
            orderId
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            variantId
            variant {
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
            quantity
            price
            status
            createdAt
            updatedAt
          }
          nextToken
        }
        payments {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            orderId
            method
            amount
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
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
          profilePhotoUrl
          wishlists {
            items {
              id
              userId
              wishlistProducts {
                items {
                  id
                  wishlistId
                  productId
                  variantId
                  quantity
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          shopingcarts {
            items {
              id
              userId
              shoppingcartProducts {
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
              createdAt
              updatedAt
            }
            nextToken
          }
          reviews {
            items {
              id
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
          orders {
            items {
              id
              code
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
              BillingAddress {
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
              CouponCodeId
              totalCashOnDeliveryCharges
              totalDiscount
              totalGiftCharges
              totalPrepaidAmount
              totalShippingCharges
              taxExempted
              cFormProvided
              thirdPartyShipping
              sla
              priority
              orderDate
              status
              products {
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
                  quantity
                  price
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          payments {
            items {
              id
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
              orderId
              method
              amount
              createdAt
              updatedAt
            }
            nextToken
          }
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
        BillingAddress {
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
        CouponCodeId
        totalCashOnDeliveryCharges
        totalDiscount
        totalGiftCharges
        totalPrepaidAmount
        totalShippingCharges
        taxExempted
        cFormProvided
        thirdPartyShipping
        sla
        priority
        orderDate
        status
        products {
          items {
            id
            orderId
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            variantId
            variant {
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
            quantity
            price
            status
            createdAt
            updatedAt
          }
          nextToken
        }
        payments {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            orderId
            method
            amount
            createdAt
            updatedAt
          }
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
        categoryId
        storeId
        store {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        isFeatured
        category {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      variantId
      variant {
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
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        variantId
        variant {
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
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        variantId
        variant {
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
export const getPayment = /* GraphQL */ `
  query GetPayment($id: ID!) {
    getPayment(id: $id) {
      id
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
        profilePhotoUrl
        wishlists {
          items {
            id
            userId
            wishlistProducts {
              items {
                id
                wishlistId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        shopingcarts {
          items {
            id
            userId
            shoppingcartProducts {
              items {
                id
                shoppingcartId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        reviews {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
        orders {
          items {
            id
            code
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
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
            BillingAddress {
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
            CouponCodeId
            totalCashOnDeliveryCharges
            totalDiscount
            totalGiftCharges
            totalPrepaidAmount
            totalShippingCharges
            taxExempted
            cFormProvided
            thirdPartyShipping
            sla
            priority
            orderDate
            status
            products {
              items {
                id
                orderId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                price
                status
                createdAt
                updatedAt
              }
              nextToken
            }
            payments {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                orderId
                method
                amount
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        payments {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            orderId
            method
            amount
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      orderId
      method
      amount
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
          profilePhotoUrl
          wishlists {
            items {
              id
              userId
              wishlistProducts {
                items {
                  id
                  wishlistId
                  productId
                  variantId
                  quantity
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          shopingcarts {
            items {
              id
              userId
              shoppingcartProducts {
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
              createdAt
              updatedAt
            }
            nextToken
          }
          reviews {
            items {
              id
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
          orders {
            items {
              id
              code
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
              BillingAddress {
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
              CouponCodeId
              totalCashOnDeliveryCharges
              totalDiscount
              totalGiftCharges
              totalPrepaidAmount
              totalShippingCharges
              taxExempted
              cFormProvided
              thirdPartyShipping
              sla
              priority
              orderDate
              status
              products {
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
                  quantity
                  price
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          payments {
            items {
              id
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
              orderId
              method
              amount
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        orderId
        method
        amount
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
          profilePhotoUrl
          wishlists {
            items {
              id
              userId
              wishlistProducts {
                items {
                  id
                  wishlistId
                  productId
                  variantId
                  quantity
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          shopingcarts {
            items {
              id
              userId
              shoppingcartProducts {
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
              createdAt
              updatedAt
            }
            nextToken
          }
          reviews {
            items {
              id
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
          orders {
            items {
              id
              code
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
              BillingAddress {
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
              CouponCodeId
              totalCashOnDeliveryCharges
              totalDiscount
              totalGiftCharges
              totalPrepaidAmount
              totalShippingCharges
              taxExempted
              cFormProvided
              thirdPartyShipping
              sla
              priority
              orderDate
              status
              products {
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
                  quantity
                  price
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          payments {
            items {
              id
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
              orderId
              method
              amount
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        orderId
        method
        amount
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
          profilePhotoUrl
          wishlists {
            items {
              id
              userId
              wishlistProducts {
                items {
                  id
                  wishlistId
                  productId
                  variantId
                  quantity
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          shopingcarts {
            items {
              id
              userId
              shoppingcartProducts {
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
              createdAt
              updatedAt
            }
            nextToken
          }
          reviews {
            items {
              id
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
          orders {
            items {
              id
              code
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
              BillingAddress {
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
              CouponCodeId
              totalCashOnDeliveryCharges
              totalDiscount
              totalGiftCharges
              totalPrepaidAmount
              totalShippingCharges
              taxExempted
              cFormProvided
              thirdPartyShipping
              sla
              priority
              orderDate
              status
              products {
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
                  quantity
                  price
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          payments {
            items {
              id
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
              orderId
              method
              amount
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        orderId
        method
        amount
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
        profilePhotoUrl
        wishlists {
          items {
            id
            userId
            wishlistProducts {
              items {
                id
                wishlistId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        shopingcarts {
          items {
            id
            userId
            shoppingcartProducts {
              items {
                id
                shoppingcartId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        reviews {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
        orders {
          items {
            id
            code
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
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
            BillingAddress {
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
            CouponCodeId
            totalCashOnDeliveryCharges
            totalDiscount
            totalGiftCharges
            totalPrepaidAmount
            totalShippingCharges
            taxExempted
            cFormProvided
            thirdPartyShipping
            sla
            priority
            orderDate
            status
            products {
              items {
                id
                orderId
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                variantId
                variant {
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
                quantity
                price
                status
                createdAt
                updatedAt
              }
              nextToken
            }
            payments {
              items {
                id
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                orderId
                method
                amount
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        payments {
          items {
            id
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            orderId
            method
            amount
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      productId
      product {
        id
        title
        brand
        vendor
        categoryId
        storeId
        store {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        isFeatured
        category {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      rating
      comment
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
          profilePhotoUrl
          wishlists {
            items {
              id
              userId
              wishlistProducts {
                items {
                  id
                  wishlistId
                  productId
                  variantId
                  quantity
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          shopingcarts {
            items {
              id
              userId
              shoppingcartProducts {
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
              createdAt
              updatedAt
            }
            nextToken
          }
          reviews {
            items {
              id
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
          orders {
            items {
              id
              code
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
              BillingAddress {
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
              CouponCodeId
              totalCashOnDeliveryCharges
              totalDiscount
              totalGiftCharges
              totalPrepaidAmount
              totalShippingCharges
              taxExempted
              cFormProvided
              thirdPartyShipping
              sla
              priority
              orderDate
              status
              products {
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
                  quantity
                  price
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          payments {
            items {
              id
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
              orderId
              method
              amount
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        productId
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        rating
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byUseridcreatedAtReview = /* GraphQL */ `
  query ByUseridcreatedAtReview(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byUseridcreatedAtReview(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
          profilePhotoUrl
          wishlists {
            items {
              id
              userId
              wishlistProducts {
                items {
                  id
                  wishlistId
                  productId
                  variantId
                  quantity
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          shopingcarts {
            items {
              id
              userId
              shoppingcartProducts {
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
              createdAt
              updatedAt
            }
            nextToken
          }
          reviews {
            items {
              id
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
          orders {
            items {
              id
              code
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
              BillingAddress {
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
              CouponCodeId
              totalCashOnDeliveryCharges
              totalDiscount
              totalGiftCharges
              totalPrepaidAmount
              totalShippingCharges
              taxExempted
              cFormProvided
              thirdPartyShipping
              sla
              priority
              orderDate
              status
              products {
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
                  quantity
                  price
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          payments {
            items {
              id
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
              orderId
              method
              amount
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        productId
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        rating
        comment
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
          profilePhotoUrl
          wishlists {
            items {
              id
              userId
              wishlistProducts {
                items {
                  id
                  wishlistId
                  productId
                  variantId
                  quantity
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          shopingcarts {
            items {
              id
              userId
              shoppingcartProducts {
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
              createdAt
              updatedAt
            }
            nextToken
          }
          reviews {
            items {
              id
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
          orders {
            items {
              id
              code
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
              BillingAddress {
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
              CouponCodeId
              totalCashOnDeliveryCharges
              totalDiscount
              totalGiftCharges
              totalPrepaidAmount
              totalShippingCharges
              taxExempted
              cFormProvided
              thirdPartyShipping
              sla
              priority
              orderDate
              status
              products {
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
                  quantity
                  price
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          payments {
            items {
              id
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
              orderId
              method
              amount
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        productId
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        rating
        comment
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
      userId
      wishlistProducts {
        items {
          id
          wishlistId
          productId
          product {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          variantId
          variant {
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
          quantity
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
export const listWishlists = /* GraphQL */ `
  query ListWishlists(
    $filter: ModelWishlistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWishlists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        wishlistProducts {
          items {
            id
            wishlistId
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            variantId
            variant {
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
            quantity
            createdAt
            updatedAt
          }
          nextToken
        }
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
        userId
        wishlistProducts {
          items {
            id
            wishlistId
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            variantId
            variant {
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
            quantity
            createdAt
            updatedAt
          }
          nextToken
        }
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
        categoryId
        storeId
        store {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        isFeatured
        category {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      variantId
      variant {
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
      quantity
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
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        variantId
        variant {
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
        quantity
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
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        variantId
        variant {
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
        quantity
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
      userId
      shoppingcartProducts {
        items {
          id
          shoppingcartId
          productId
          product {
            id
            title
            brand
            vendor
            categoryId
            storeId
            store {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            isFeatured
            category {
              id
              name
              description
              isFeatured
              totalProducts
              priority
              imageUrl
              products {
                items {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
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
                  profilePhotoUrl
                  createdAt
                  updatedAt
                }
                productId
                product {
                  id
                  title
                  brand
                  vendor
                  categoryId
                  storeId
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
                }
                rating
                comment
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          variantId
          variant {
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
          quantity
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
export const listShoppingCarts = /* GraphQL */ `
  query ListShoppingCarts(
    $filter: ModelShoppingCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShoppingCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        shoppingcartProducts {
          items {
            id
            shoppingcartId
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            variantId
            variant {
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
            quantity
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byuserIdcreatedAtShoppingCart = /* GraphQL */ `
  query ByuserIdcreatedAtShoppingCart(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelShoppingCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byuserIdcreatedAtShoppingCart(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        shoppingcartProducts {
          items {
            id
            shoppingcartId
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            variantId
            variant {
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
            quantity
            createdAt
            updatedAt
          }
          nextToken
        }
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
        categoryId
        storeId
        store {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        isFeatured
        category {
          id
          name
          description
          isFeatured
          totalProducts
          priority
          imageUrl
          products {
            items {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
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
              profilePhotoUrl
              wishlists {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              shopingcarts {
                items {
                  id
                  userId
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviews {
                items {
                  id
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
              orders {
                items {
                  id
                  code
                  userId
                  channelName
                  totalStoreCredit
                  CouponCodeId
                  totalCashOnDeliveryCharges
                  totalDiscount
                  totalGiftCharges
                  totalPrepaidAmount
                  totalShippingCharges
                  taxExempted
                  cFormProvided
                  thirdPartyShipping
                  sla
                  priority
                  orderDate
                  status
                  createdAt
                  updatedAt
                }
                nextToken
              }
              payments {
                items {
                  id
                  userId
                  orderId
                  method
                  amount
                  createdAt
                  updatedAt
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            productId
            product {
              id
              title
              brand
              vendor
              categoryId
              storeId
              store {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
              isFeatured
              category {
                id
                name
                description
                isFeatured
                totalProducts
                priority
                imageUrl
                products {
                  nextToken
                }
                createdAt
                updatedAt
              }
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
                  userId
                  productId
                  rating
                  comment
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            rating
            comment
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      variantId
      variant {
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
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        variantId
        variant {
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
        product {
          id
          title
          brand
          vendor
          categoryId
          storeId
          store {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          isFeatured
          category {
            id
            name
            description
            isFeatured
            totalProducts
            priority
            imageUrl
            products {
              items {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
              productId
              product {
                id
                title
                brand
                vendor
                categoryId
                storeId
                store {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
                isFeatured
                category {
                  id
                  name
                  description
                  isFeatured
                  totalProducts
                  priority
                  imageUrl
                  createdAt
                  updatedAt
                }
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
                  nextToken
                }
                images {
                  nextToken
                }
                reviews {
                  nextToken
                }
              }
              rating
              comment
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        variantId
        variant {
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
        quantity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
