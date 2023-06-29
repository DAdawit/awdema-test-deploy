import { gql } from "@apollo/client";

export const ADDTO_CART = gql`
  mutation ADDTO_CART(
    $productColorId: String
    $productId: String
    $productModelId: String
  ) {
    addToCart(
      productColorId: $productColorId
      productId: $productId
      productModelId: $productModelId
    ) {
      cart {
        id
        products
      }
    }
  }
`;

export const CHANGE_CART_QUANTITY = gql`
  mutation CHANGE_CART_QUANTITY($newQuantity: Int!, $productIndex: Int!) {
    changeQuantityOfCartProducts(
      newQuantity: $newQuantity
      productIndex: $productIndex
    ) {
      cart {
        id
        products
      }
    }
  }
`;
export const REMOVE_FROM_CART = gql`
  mutation REMOVE_FROM_CART($productIndex: Int!) {
    removeFromCart(productIndex: $productIndex) {
      cart {
        id
        products
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation REMOVE_FROM_WISHLIST($productIndex: Int!) {
    removeFromWishList(productIndex: $productIndex) {
      wishList {
        id
        products
      }
    }
  }
`;

export const ADDTO_WISHLIST = gql`
  mutation (
    $productColorId: String
    $productId: String
    $productModelId: String
  ) {
    addToWishList(
      productColorId: $productColorId
      productId: $productId
      productModelId: $productModelId
    ) {
      wishList {
        id
        products
      }
    }
  }
`;

export const ORDER = gql`
  mutation ORDER(
    $deliveryMethod: String!
    $locationLat: Float!
    $locationLon: Float!
  ) {
    order(
      deliveryMethod: $deliveryMethod
      locationLat: $locationLat
      locationLon: $locationLon
    ) {
      orderId
    }
  }
`;

export const REVIEW_PRODUCT = gql`
  mutation REVIEW_PRODUCT(
    $productId: String!
    $review: Int!
    $comment: String
  ) {
    ReviewProduct(productId: $productId, review: $review, comment: $comment) {
      productReview {
        totalReviewer
        averageReview
        review
      }
    }
  }
`;

export const WISHLIST_TO_CART = gql`
  mutation WISHLIST_TO_CART($productIndex: Int!) {
    wishListToCart(productIndex: $productIndex) {
      wishList {
        id
        products
      }
    }
  }
`;

export const CART_TO_WISHLIST = gql`
  mutation CART_TO_WISHLIST($productIndex: Int!) {
    cartToWishList(productIndex: $productIndex) {
      cart {
        id
        products
      }
    }
  }
`;

export const ADD_PRODUCT_MODEL = gql`
  mutation ADD_PRODUCT_MODEL(
    $modelOrSizeName: String!
    $price: Float!
    $color: String!
    $quantity: Int!
    $discount: Float
    $widthCm: Float!
    $heightCm: Float!
    $lengthCm: Float!
    $approximateMassKg: Float!
    $productId: String!
  ) {
    addProductModel(
      modelOrSizeName: $modelOrSizeName
      price: $price
      color: $color
      quantity: $quantity
      discount: $discount
      heightCm: $heightCm
      widthCm: $widthCm
      lengthCm: $lengthCm
      approximateMassKg: $approximateMassKg
      productId: $productId
    ) {
      product {
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
        productmodelSet {
          id
          name
        }
      }
    }
  }
`;

export const ADD_PRODUCT_COLOR = gql`
  mutation ADD_PRODUCT_COLOR(
    $color: String!
    $productModelId: String!
    $quantity: Int!
  ) {
    addProductColor(
      color: $color
      productModelId: $productModelId
      quantity: $quantity
    ) {
      product {
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
        productmodelSet {
          id
          name
          productcolorSet {
            id
            name
          }
        }
      }
    }
  }
`;

export const REPORT_PRODUCT = gql`
  mutation REPORT_PRODUCT($reason: String!, $productId: UUID!) {
    reportProduct(reason: $reason, productId: $productId) {
      product {
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

export const DELETE_SHOP_PHONE = gql`
  mutation DELETE_SHOP_PHONE($phone: String!) {
    deleteShopPhone(phone: $phone) {
      shop {
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
    }
  }
`;

export const CREATE_PAYPAL_LINK = gql`
  mutation CREATE_PAYPAL_LINK($orderId: String!) {
    createPayPalLink(orderId: $orderId) {
      redirectUrl
    }
  }
`;
