/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncSimulationReports = /* GraphQL */ `
  query SyncSimulationReports(
    $filter: ModelsimulationReportFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSimulationReports(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
      items {
        id
        combineWeight
        wheelDiameter
        fuelType
        augerLength
        timeSpentToPlaneTheField
        costPerRun
        percentageOfFieldChosenToCover
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
      combineWeight
      wheelDiameter
      fuelType
      augerLength
      timeSpentToPlaneTheField
      costPerRun
      percentageOfFieldChosenToCover
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listSimulationReports = /* GraphQL */ `
  query ListSimulationReports($filter: ModelsimulationReportFilterInput, $limit: Int, $nextToken: String) {
    listSimulationReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        combineWeight
        wheelDiameter
        fuelType
        augerLength
        timeSpentToPlaneTheField
        costPerRun
        percentageOfFieldChosenToCover

        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
