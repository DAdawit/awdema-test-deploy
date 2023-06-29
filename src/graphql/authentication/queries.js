import { gql } from "@apollo/client";

export const FETCH_USER_DATA = gql`
  query FETCH_USER_DATA {
    me {
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
`;

export const SELLER_INFO = gql`
  query SELLER_INFO {
    isSeller {
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
`;

export const DELIVERER_INFO = gql`
  query DELIVERER_INFO {
    isDeliverer {
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
`;
