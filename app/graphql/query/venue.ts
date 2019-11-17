import gql from "graphql-tag";

const VenueFragments = {
    venue: gql`
        fragment VenueFragment on Venue {
            id
            name
            content
            locations {
                id
                name
                content
                latitude
                longitude
                meta {
                    id
                    name
                    value
                }
            }
            schedules {
                id
                name
                content
                meta {
                    id
                    name
                    value
                }
            }
            selectedObjectGroups {
                id
                name
                content
                objectTypes {
                    id
                    name
                    content
                    meta {
                        id
                        name
                        value
                    }
                }
                joinedUsers {
                    id
                    email
                }
                locations {
                    id
                    name
                    content
                    meta {
                        id
                        name
                        value
                    }
                }
                meta {
                    id
                    name
                    value
                }
            }
            selectedObjectTypes {
                id
                name
                content
            }
            meta {
                id
                name
                value
            }
        }
    `,
};

export const GET_VENUES = gql`
    query venue {
        findManyVenue {
            ...VenueFragment
        }
    }
    ${VenueFragments.venue}
`;

export const FILTER_VENUES = gql`
    query filterVenues($filters: String) {
        filterVenues(filters: $filters) {
            ...VenueFragment
        }
    }
    ${VenueFragments.venue}
`;