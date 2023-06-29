import { gql } from "@apollo/client";

export const SELLER_UNPAID_ORDERS = gql`
  query SELLER_UNPAID_ORDERS(
    $pageNo: Int
    $perPage: Int
    $startDate: String
    $endDate: String
  ) {
    mySellerUnPaidOrdersPaginated(
      pageNo: $pageNo
      perPage: $perPage
      startDate: $startDate
      endDate: $endDate
    ) {
      pageNo
      hasNext
      hasPrev
      objects {
        orderId
        orderName
        products
        isPaid
        totalPrice
        status
        buyerPhone
        buyerName
        buyerId
        buyerEmail
        deliveryDetail
        seller {
          id
          name
          address
          locationLat
          locationLon
          shopPicture
          shopVideo
          description
          tinNo
          domain
          isActive
          phoneNumber {
            id
            number
          }
        }
        deliverer {
          id
          name
          description
          address
          image
          maximumDeliveryMass
          maximumDeliveryVolume
          isActive
          isFree
          deliveryMethode
        }
      }
    }
  }
`;
export const SELLER_PAID_ORDERS = gql`
  query SELLER_PAID_ORDERS(
    $pageNo: Int
    $perPage: Int
    $startDate: String
    $endDate: String
  ) {
    mySellerPaidOrdersPaginated(
      pageNo: $pageNo
      perPage: $perPage
      startDate: $startDate
      endDate: $endDate
    ) {
      pageNo
      hasNext
      hasPrev
      objects {
        orderId
        orderName
        products
        isPaid
        totalPrice
        status
        buyerPhone
        buyerName
        buyerId
        buyerEmail
        deliveryDetail
        seller {
          id
          name
          address
          locationLat
          locationLon
          shopPicture
          shopVideo
          description
          tinNo
          domain
          isActive
          phoneNumber {
            id
            number
          }
        }
        deliverer {
          id
          name
          description
          address
          image
          maximumDeliveryMass
          maximumDeliveryVolume
          isActive
          isFree
          deliveryMethode
        }
      }
    }
  }
`;

export const SHOP_PRODUCTS = gql`
  query SHOP_PRODUCTS(
    $perPage: Int
    $pageNo: Int
    $endDate: String
    $startDate: String
    $filterBy: String
  ) {
    PaginatedMyShopProducts(
      perPage: $perPage
      pageNo: $pageNo
      endDate: $endDate
      startDate: $startDate
      filterBy: $filterBy
    ) {
      pageNo
      hasNext
      hasPrev
      total
      objects {
        id
        name
        image
        price
        description
        tax
        rating
        tags
        totalSell
        date
        totalQuantity
        sellRate
        productreviewSet {
          totalReviewer
          averageReview
          review
        }
        productmodelSet {
          id
          name
          price
          discount
          massKg
          volume
          productId
          productName
          productcolorSet {
            id
            name
            quantity
            imagesSet {
              id
              image
            }
          }
        }
      }
    }
  }
`;

export const SHOP_HIDDEN_PRODUCTS_LIST = gql`
  query SHOP_HIDDEN_PRODUCTS_LIST(
    $pageNo: Int
    $perPage: Int
    $startDate: String
    $endDate: String
    $filterBy: String
  ) {
    PaginatedMyShopHiddenProducts(
      pageNo: $pageNo
      perPage: $perPage
      startDate: $startDate
      endDate: $endDate
      filterBy: $filterBy
    ) {
      pageNo
      hasNext
      hasPrev
      total
      objects {
        id
        name
        image
        price
        description
        tax
        rating
        tags
        totalSell
        date
        totalQuantity
        sellRate
      }
    }
  }
`;
