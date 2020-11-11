/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncTalks = /* GraphQL */ `
  query SyncTalks($filter: ModelTalkFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
    syncTalks(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
      items {
        id
        clientId
        name
        description
        speakerName
        speakerBio
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTalk = /* GraphQL */ `
  query GetTalk($id: ID!) {
    getTalk(id: $id) {
      id
      clientId
      name
      description
      speakerName
      speakerBio
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listTalks = /* GraphQL */ `
  query ListTalks($filter: ModelTalkFilterInput, $limit: Int, $nextToken: String) {
    listTalks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clientId
        name
        description
        speakerName
        speakerBio
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
