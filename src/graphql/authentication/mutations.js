import { gql } from "@apollo/client";

export const VERIFY_TOKEN = gql`
  mutation VERIFY_TOKEN($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;
export const SIGNUP_CUSTOMER = gql`
  mutation SIGNUP_CUSTOMER(
    $email: String!
    $firstname: String!
    $lastname: String!
    $password: String!
    $phone: String!
    $username: String!
  ) {
    signupCustomer(
      email: $email
      firstname: $firstname
      lastname: $lastname
      password: $password
      phone: $phone
      username: $username
    ) {
      newUser {
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

export const VERIFY_EMAIL = gql`
  mutation VERIFY_EMAIL($email: String!, $verificationCode: String!) {
    verifyEmail(email: $email, verificationCode: $verificationCode) {
      newUser {
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

export const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      user {
        id
        username
        phone
        profilePicture
        dateJoined
        email
        firstName
        lastName
        isSeller
        isDeliverer
      }
      token
    }
  }
`;

export const LOGING_USER = gql`
  mutation LOGING_USER($username: String!, $password: String!) {
    userAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation EDIT_PROFILE(
    $username: String
    $firstname: String
    $lastname: String
    $profilePicture: Upload
  ) {
    editProfile(
      username: $username
      firstname: $firstname
      lastname: $lastname
      profilePicture: $profilePicture
    ) {
      user {
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
export const CHANGE_PASSWORD = gql`
  mutation CHANGE_PASSWORD(
    $currentPassword: String
    $newPassword1: String
    $newPassword2: String
  ) {
    changePassword(
      currentPassword: $currentPassword
      newPassword1: $newPassword1
      newPassword2: $newPassword2
    ) {
      changePassword
    }
  }
`;

export const ADD_SHOP_PHONE = gql`
  mutation ADD_SHOP_PHONE($phone: String!) {
    addShopPhone(phone: $phone) {
      shop {
        id
        name
      }
    }
  }
`;

export const REST_PASSWORD = gql`
  mutation REST_PASSWORD($email: String!) {
    RequestResetPassword(email: $email) {
      requestResetPassword
    }
  }
`;

export const CHANGE_PASSWORD_WITH_RESET_CODE = gql`
  mutation RESET_PASSWORD_WITH_RESET_CODE(
    $code: String
    $email: String
    $newPassword: String
  ) {
    ResetPassword(code: $code, email: $email, newPassword: $newPassword) {
      resetPassword
    }
  }
`;

// export const RESEND_USER_VERIFICATION_CODE = gql`
// mutation RESEND_USER_VERIFICATION_CODE(
//       resendUserVerification {
//          codeSent
//     }
// )
// `;

export const CHANGE_PROFILE_IMAGE = gql`
  mutation CHANGE_PROFILE_IMAGE($file: Upload!) {
    changeProfilePicture(file: $file) {
      url
    }
  }
`;

export const CREATE_DELIVERER = gql`
  mutation CREATE_DELIVERER(
    $address: String!
    $deliveryMethode: [String]!
    $description: String!
    $maximumMass: Float!
    $maximumVolume: Float!
    $name: String!
  ) {
    createDeliverer(
      address: $address
      deliveryMethode: $deliveryMethode
      description: $description
      maximumMass: $maximumMass
      maximumVolume: $maximumVolume
      name: $name
    ) {
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
`;
