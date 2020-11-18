/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      numOfElectricRuns
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
        numOfElectricRuns
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getNumOfElectricRuns = `
query getNumOfElectricRuns {
  listSimulationReports(filter: {fuelType: {eq: "Electric"}}) {
    items {
      id
    }
  }
}
`;
