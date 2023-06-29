import { gql } from "@apollo/client";

export const CATEGORIES = gql`
  query ListAllCategory {
    listAllCategory {
      id
      name
      image
      description
    }
  }
`;

export const SUB_CATEGORIES = gql`
  query ListAllSubCategory {
    listAllSubCategory {
      id
      name
    }
  }
`;

export const PRODUCT_BYSUBCATEGORIES = gql`
  query PRODUCT_BYSUBCATEGORIES(
    $filterSubcategoryName: String
    $filterBy: String
    $startDate: String
    $endDate: String
    $pageNo: Int
    $perPage: Int
  ) {
    PaginatedProduct(
      filterSubcategoryName: $filterSubcategoryName
      filterBy: $filterBy
      startDate: $startDate
      endDate: $endDate
      pageNo: $pageNo
      perPage: $perPage
    ) {
      hasNext
      pageNo
      hasPrev
      objects {
        id
        name
        description
        price
        image
      }
    }
  }
`;

export const GROSSERIES = gql`
  query GROSSERIES {
    PaginatedProductByCategory(
      categoryName: "Grosseries"
      pageNo: 1
      perPage: 15
    ) {
      objects {
        id
        name
        image
        price
      }
    }
  }
`;
export const ELECTRONICS = gql`
  query PaginatedProductByCategory {
    PaginatedProductByCategory(
      categoryName: "electronics"
      pageNo: 1
      perPage: 15
    ) {
      objects {
        id
        name
        image
        price
        description
      }
    }
  }
`;

export const PRODUCTS = gql`
  query PRODUCTS(
    $filterBy: String
    $startDate: String
    $endDate: String
    $filterSubcategoryName: String
    $pageNo: Int
    $perPage: Int
  ) {
    PaginatedProduct(
      startDate: $startDate
      endDate: $endDate
      filterSubcategoryName: $filterSubcategoryName
      pageNo: $pageNo
      perPage: $perPage
      filterBy: $filterBy
    ) {
      hasNext
      hasPrev
      pageNo
      total
      objects {
        name
        id
        date
        image
        price
        description
      }
    }
  }
`;

export const NEW_ARRIVALES = gql`
  query NEW_ARRIVALES(
    $filterBy: String
    $startDate: String
    $endDate: String
    $filterSubcategoryName: String
    $pageNo: Int
    $perPage: Int
  ) {
    PaginatedProduct(
      startDate: $startDate
      endDate: $endDate
      filterSubcategoryName: $filterSubcategoryName
      pageNo: $pageNo
      perPage: $perPage
      filterBy: $filterBy
    ) {
      hasNext
      hasPrev
      pageNo
      total
      objects {
        name
        id
        date
        image
        price
        description
      }
    }
  }
`;
export const PRODUCT_BYCATEGORIES = gql`
  query PRODUCT_BYSUBCATEGORIES(
    $categoryName: String
    $pageNo: Int
    $perPage: Int
  ) {
    PaginatedProductByCategory(
      categoryName: $categoryName
      pageNo: $pageNo
      perPage: $perPage
    ) {
      pageNo
      hasNext
      hasPrev
      objects {
        id
        name
        description
        price
        image
      }
    }
  }
`;

export const PRODUCT_DETAIL = gql`
  query PRODUCT_DETAIL($productId: UUID!) {
    productById(productId: $productId) {
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
      shop {
        id
        name
        address
        locationLat
        locationLon
        shopPicture
        shopVideo
        description
        domain
        isActive
      }
      subcategory {
        id
        name
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
      productreviewSet {
        totalReviewer
        averageReview
        review
      }
    }
  }
`;
export const RELATED_ITEMS = gql`
  query RELATED_ITEMS($productId: UUID!) {
    RelatedProducts(productId: $productId, pageNo: 1) {
      relatedProducts {
        id
        name
        image
        price
        description
      }
    }
  }
`;

export const MY_CART = gql`
  query MyCart {
    myCart {
      id
      products
    }
  }
`;

export const MY_WISHLIST = gql`
  query MY_WISHLIST {
    myWishList {
      id
      products
    }
  }
`;

export const MY_ORDERS = gql`
  query MY_ORDERS {
    myOrdersPaginated(pageNo: 1, perPage: 20) {
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
          phoneNumber {
            id
            number
          }
        }
      }
    }
  }
`;

export const PRODUCT_REVIEWS = gql`
  query PRODUCT_REVIEWS($productId: String!) {
    productReview(productId: $productId) {
      totalReviewer
      averageReview
      review
    }
  }
`;

export const CLEAR_CART = gql`
  query CLEAR_CART {
    clearCart
  }
`;

export const CLEAR_WISHLIST = gql`
  query CLEAR_WISHLIST {
    clearWishList
  }
`;

export const SEARCH_PRODUCT = gql`
  query SEARCH_PRODUCT(
    $search: String
    $pageNo: Int
    $perPage: Int
    $isSearch: Boolean
    $startDate: String
    $endDate: String
    $maxPrice: Float
    $minPrice: Float
    $filterSubcategoryName: String
    $filterBy: String
  ) {
    searchProductPaginated(
      search: $search
      pageNo: $pageNo
      perPage: $perPage
      isSearch: $isSearch
      startDate: $startDate
      endDate: $endDate
      maxPrice: $maxPrice
      minPrice: $minPrice
      filterSubcategoryName: $filterSubcategoryName
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

export const RECOMENDED_FORME = gql`
  query RECOMENDED_FORME($pageNo: Int) {
    recommendedForMe(pageNo: $pageNo) {
      id
      name
      image
      price
      description
    }
  }
`;
