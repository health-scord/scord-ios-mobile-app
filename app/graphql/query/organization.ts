import gql from "graphql-tag";

const OrganizationFragments = {
    organization: gql`
        fragment OrganizationFragment on Organization {
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
            venues {
                id
                name
                content
                meta {
                    id
                    name
                    value
                }
            }
            amenities {
                id
                name 
                content
            }
            downloads {
                id
                name 
                content
            }
            activities {
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

export const GET_ORGANIZATIONS = gql`
    query organizations {
        findManyOrganization {
            ...OrganizationFragment
        }
    }
    ${OrganizationFragments.organization}
`;

export const FILTER_ORGANIZATIONS = gql`
    query filterOrganizations($filters: String) {
        filterOrgs(filters: $filters) {
            ...OrganizationFragment
        }
    }
    ${OrganizationFragments.organization}
`;