import gql from "graphql-tag";

const ActivityFragments = {
    activity: gql`
        fragment ActivityFragment on Activity {
            id
            name
            types {
                id
                name
                content
                meta {
                    id
                    name
                    value
                }
            }
            members {
                id
                email
            }
            savers {
                id
                email
            }
            status {
                id
                name
            }
            meta {
                id
                name
                value
            }
            objectGroups {
                id
                name
                content
            }
            deleted
        }
    `,
};

export const SEARCH_ACTIVITIES = gql`
    query searchActivities($phrase: String) {
        findManyActivity(where: { name: { contains: $phrase } }) {
            ...ActivityFragment
        }
    }
    ${ActivityFragments.activity}
`;

export const GET_ACTIVITY = gql`
    query getActivity($id: ID) {
        findOneActivity(where: { id: $id }) {
            ...ActivityFragment
        }
    }
    ${ActivityFragments.activity}
`;