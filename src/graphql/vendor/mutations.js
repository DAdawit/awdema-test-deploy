import { gql } from "@apollo/client";
export const CREATE_SHOPE = gql`
  mutation CREATE_SHOP(
    $name: String!
    $address: String!
    $description: String!
    $isTotUser: Boolean!
    $locationLat: Float!
    $locationLon: Float!
    $domain: String
    $tinNo: String!
  ) {
    createShop(
      name: $name
      address: $address
      description: $description
      isTotUser: $isTotUser
      locationLat: $locationLat
      locationLon: $locationLon
      tinNo: $tinNo
      domain: $domain
    ) {
      shop {
        id
      }
    }
  }
`;

export const CHANGE_SHOPE_PICTURE = gql`
  mutation CHANGE_SHOPE_PICTURE($file: Upload!) {
    changeShopPicture(file: $file) {
      url
    }
  }
`;
export const ADD_PRODUCT = gql`
  mutation ADD_PRODUCT(
    $name: String!
    $price: Float!
    $quantity: Int!
    $discount: Float
    $tags: String
    $description: String
    $approximateMassKg: Float!
    $color: String!
    $heightCm: Float!
    $lengthCm: Float!
    $modelOrSizeName: String!
    $subcategoryId: String!
    $widthCm: Float!
  ) {
    addProduct(
      approximateMassKg: $approximateMassKg
      color: $color
      heightCm: $heightCm
      lengthCm: $lengthCm
      modelOrSizeName: $modelOrSizeName
      name: $name
      price: $price
      quantity: $quantity
      subcategoryId: $subcategoryId
      widthCm: $widthCm
      description: $description
      discount: $discount
      tags: $tags
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

export const EDIT_SHOP = gql`
  mutation Edit_SHOP(
    $name: String
    $address: String
    $description: String
    $tinNo: String
    $domain: String
    $isTotUser: Boolean
  ) {
    editShop(
      name: $name
      address: $address
      description: $description
      tinNo: $tinNo
      domain: $domain
      isTotUser: $isTotUser
    ) {
      shop {
        id
        name
        address
        locationLat
        locationLon
        description
        tinNo
        domain
        isActive
      }
    }
  }
`;
export const VERIFY_SHOP_PHONE = gql`
  mutation VERIFY_SHOP_PHONE($phone: String!, $verificationCode: String!) {
    verifyShopPhone(phone: $phone, verificationCode: $verificationCode) {
      isVerified
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($productId: String!) {
    deleteProduct(productId: $productId) {
      productDeleted
    }
  }
`;

export const HIDE_PRODUCT = gql`
  mutation HIDE_PRODUCT($productId: String!) {
    hideProduct(productId: $productId) {
      hideProduct
    }
  }
`;
export const UNHIDE_PRODUCT = gql`
  mutation UNHIDE_PRODUCT($productId: String!) {
    unHideProduct(productId: $productId) {
      unHideProduct
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation EDIT_PRODUCT(
    $productId: String!
    $name: String
    $price: Float
    $quantity: Float
    $subcategoryId: String
    $tags: Float
    $description: String
    $color: String
  ) {
    editProduct(
      productId: $productId
      name: $name
      price: $price
      quantity: $quantity
      subcategoryId: $subcategoryId
      tags: $tags
      description: $description
      modelOrSizeName: $modelOrSizeName
      color: $color
    ) {
      product {
        id
        name
        price
        description
        tags
        date
        totalQuantity
      }
    }
  }
`;

// export const EDIT_PRODUCT_MODEL = gql`
//   mutation EDIT_PRODUCT_MODEL(
//     $approximateMassKg: Float
//     $color: String
//     $heightCm: Float
//     $lengthCm: Float
//     $productModelId: String
//     $quantity: Float
//     $widthCm: Float
//   ) {
//     editProductModel(
//       approximateMassKg: $approximateMassKg
//       heightCm: $heightCm
//       lengthCm: $lengthCm
//       widthCm: $widthCm
//       productModelId: $productModelId
//       quantity: $quantity
//       color: $color
//     ) {
//       productModel {
//         id
//         name
//         price
//         discount
//         massKg
//         volume
//         productId
//         productName
//       }
//     }
//   }
// `;

export const EDIT_PRODUCT_QUANTITY = gql`
  mutation EDIT_PRODUCT_QUANTITY(
    $color: String!
    $productId: String!
    $productModelName: String!
    $quantity: Int!
  ) {
    editProductQuantity(
      color: $color
      productId: $productId
      productModelName: $productModelName
      quantity: $quantity
    ) {
      product {
        id
        name
      }
    }
  }
`;

export const EDIT_PRODUCT_MODEL = gql`
  mutation EDIT_PRODUCT_MODEL(
    $productModelId: String!
    $approximateMassKg: Float
    $discount: Float
    $heightCm: Float
    $lengthCm: Float
    $modelName: String
    $price: Float
    $quantity: Int
    $widthCm: Float
  ) {
    editProductModel(
      productModelId: $productModelId
      approximateMassKg: $approximateMassKg
      discount: $discount
      heightCm: $heightCm
      lengthCm: $lengthCm
      modelName: $modelName
      price: $price
      quantity: $quantity
      widthCm: $widthCm
    ) {
      productModel {
        id
        name
        price
        discount
        massKg
        volume
        productId
        productName
      }
    }
  }
`;
