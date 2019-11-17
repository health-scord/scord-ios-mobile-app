import gql from "graphql-tag";

export const REVERSE_GEOCODE = gql`
    query reverseGeocode($latlng: String) {
        reverseGeocode(latlng: $latlng)
    }
`;