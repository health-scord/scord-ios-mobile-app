import gql from "graphql-tag";

export const SET_PREFERENCE = gql`
    mutation saveActivityPreferences($activityId: ID, $userId: ID, $name: String, $content: String) {
        createOnePreference(data: {
            name: $name,
            content: $content,
            activity: { connect: { id: $activityId } },
            user: { connect: { id: $userId } }
        }) {
            id
        }
    }
`;