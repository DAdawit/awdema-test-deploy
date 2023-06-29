import { gql } from "@apollo/client";

export const ADD_DELIVERER_PHONE = gql`
  mutation ADD_DELIVERER_PHONE($phone: String!) {
    addDelivererPhone(phone: $phone) {
      deliverer {
        id
      }
    }
  }
`;
export const VERIFY_DELIVERER_PHONE = gql`
  mutation VERIFY_DELIVERER_PHONE($phone: String!, $verificationCode: String!) {
    verifyDelivererPhone(phone: $phone, verificationCode: $verificationCode) {
      isVerified
    }
  }
`;
