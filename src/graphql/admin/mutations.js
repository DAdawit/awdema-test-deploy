import { gql } from "@apollo/client";

export const ADMIN_ACTIVATE_DELIVERER = gql`
  mutation ADMIN_ACTIVATE_DELIVERER($delivererId: String!) {
    activateDeliverer(delivererId: $delivererId) {
      activated
    }
  }
`;

export const EDIT_CATEGORIES = gql`
  mutation EDIT_CATEGORIES(
    $name: String!
    $description: String
    $newName: String
  ) {
    editCategory(name: $name, description: $description, newName: $newName) {
      category {
        id
        name
        image
        description
      }
    }
  }
`;

export const CHANGE_CATEGORY_COVER_PICTURE = gql`
  mutation CHANGE_CATEGORY_COVER_PICTURE(
    $file: Upload!
    $categoryName: String!
  ) {
    changeCategoryCoverPicture(file: $file, categoryName: $categoryName) {
      url
    }
  }
`;

export const EDIT_SUBCATEGORIES = gql`
  mutation EDIT_SUBCATEGORIES(
    $subcategoryId: String!
    $categoryId: String
    $description: String
    $name: String
  ) {
    editSubCategory(
      subcategoryId: $subcategoryId
      categoryId: $categoryId
      description: $description
      name: $name
    ) {
      subCategory {
        id
      }
    }
  }
`;

export const CHANGE_SUBCATEGORY_COVER_PICTURE = gql`
  mutation CHANGE_SUBCATEGORY_COVER_PICTURE(
    $file: Upload!
    $subcategoryId: String!
  ) {
    changeSubCategoryCoverPicture(file: $file, subcategoryId: $subcategoryId) {
      url
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CREATE_CATEGORY($description: String!, $name: String!) {
    createCategory(description: $description, name: $name) {
      category {
        id
        name
        image
        description
      }
    }
  }
`;

export const CREATE_SUBCATEGORY = gql`
  mutation CREATE_SUBCATEGORY(
    $categoryName: String!
    $description: String!
    $subcategoryName: String!
  ) {
    createSubCategory(
      categoryName: $categoryName
      description: $description
      subcategoryName: $subcategoryName
    ) {
      subcategory {
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
