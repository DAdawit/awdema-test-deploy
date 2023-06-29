import { gql } from "@apollo/client";

export const ADMIN_ALL_USERS = gql`
  query ADMIN_ALL_USERS(
    $pageNo: Int!
    $perPage: Int!
    $endDate: String!
    $startDate: String!
  ) {
    adminAllUserPaginated(
      pageNo: $pageNo
      perPage: $perPage
      endDate: $endDate
      startDate: $startDate
    ) {
      pageNo
      hasNext
      hasPrev
      total
      objects {
        username
        id
        phone
        profilePicture
        dateJoined
        email
        firstName
        lastName
        isSeller
        isDeliverer
      }
    }
  }
`;

export const ADMIN_ALL_SHOPS = gql`
  query ADMIN_ALL_SHOPS($pageNo: Int!, $perPage: Int!) {
    adminAllShopsPaginated(pageNo: $pageNo, perPage: $perPage) {
      pageNo
      hasNext
      hasPrev
      objects {
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
      }
    }
  }
`;

export const ADMIN_ALL_REPORTED_PRODUCTS = gql`
  query ADMIN_ALL_REPORTED_PRODUCTS(
    $startDate: String
    $endDate: String
    $pageNo: Int
    $perPage: Int
  ) {
    adminReportOnProduct(
      startDate: $startDate
      endDate: $endDate
      pageNo: $pageNo
      perPage: $perPage
    ) {
      pageNo
      hasNext
      hasPrev
      objects {
        id
        reason
        isChecked
        dateTime
        reporterId
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
  }
`;

export const ADMIN_ADD_SHOP_TO_BLACKLIST = gql`
  query ADMIN_ADD_SHOP_TO_BLACKLIST($shopId: UUID) {
    adminAddShopToBlackList(shopId: $shopId)
  }
`;
export const ADMIN_REMOVE_SHOP_FROM_BLACKLIST = gql`
  query ADMIN_REMOVE_SHOP_FROM_BLACKLIST($shopId: UUID) {
    adminRemoveShopFromBlackList(shopId: $shopId)
  }
`;

export const ADMIN_MARK_REPORTED_PRODUCT_AS_CHECKED = gql`
  query ADMIN_MARK_REPORTED_PRODUCT_AS_CHECKED($commentId: UUID!) {
    adminMarkReportOnProductAsChecked(commentId: $commentId) {
      pageNo
      hasNext
      hasPrev
      objects {
        id
      }
    }
  }
`;

export const ADMIN_DELETE_REPORTED_COMMENT = gql`
  query ADMIN_DELETE_REPORTED_COMMENT($commentId: UUID!) {
    adminDeleteReportOnProduct(commentId: $commentId) {
      objects {
        id
      }
    }
  }
`;

export const DELETE_ALL_REPORTED_COMMENT_ON_PRODUCT = gql`
  query DELETE_ALL_REPORTED_COMMENT_ON_PRODUCT {
    DeleteAllCheckedReportedComment
  }
`;

export const ADMIN_ALL_DELIVERERS = gql`
  query ADMIN_ALL_DELIVERERS($perPage: Int, $pageNo: Int) {
    adminAllDeliverersPaginated(perPage: $perPage, pageNo: $pageNo) {
      pageNo
      hasNext
      hasPrev
      objects {
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
`;

export const LIST_ALL_CATEGORY = gql`
  query LIST_ALL_CATEGORY {
    listAllCategory {
      id
      name
      image
      description
      subcategorySet {
        id
        name
        image
        description
        categoryId
        categoryName
      }
    }
  }
`;
