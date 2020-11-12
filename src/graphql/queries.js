/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCoins = /* GraphQL */ `
  query GetCoins($limit: Int, $start: Int) {
    getCoins(limit: $limit, start: $start) {
      id
      name
      symbol
      price_usd
    }
  }
`;
export const syncTalks = /* GraphQL */ `
  query SyncTalks(
    $filter: ModelTalkFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTalks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  query ListTalks(
    $filter: ModelTalkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTalks(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const syncSimulationReports = /* GraphQL */ `
  query SyncSimulationReports(
    $filter: ModelsimulationReportFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSimulationReports(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        combine_weight
        wheel_diameter
        fuel_type
        auger_length
        time_per_pass
        time_taken_to_plane_the_field
        percentage_of_field_chosen_to_cover
        cost_per_run
        total_efficiency
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
export const getSimulationReport = /* GraphQL */ `
  query GetSimulationReport($id: ID!) {
    getSimulationReport(id: $id) {
      id
      combine_weight
      wheel_diameter
      fuel_type
      auger_length
      time_per_pass
      time_taken_to_plane_the_field
      percentage_of_field_chosen_to_cover
      cost_per_run
      total_efficiency
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listSimulationReports = /* GraphQL */ `
  query ListSimulationReports(
    $filter: ModelsimulationReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSimulationReports(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        combine_weight
        wheel_diameter
        fuel_type
        auger_length
        time_per_pass
        time_taken_to_plane_the_field
        percentage_of_field_chosen_to_cover
        cost_per_run
        total_efficiency
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
