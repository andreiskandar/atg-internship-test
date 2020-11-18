/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSimulationReport = /* GraphQL */ `
  mutation CreateSimulationReport(
    $input: CreateSimulationReportInput!
    $condition: ModelsimulationReportConditionInput
  ) {
    createSimulationReport(input: $input, condition: $condition) {
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
export const updateSimulationReport = /* GraphQL */ `
  mutation UpdateSimulationReport(
    $input: UpdateSimulationReportInput!
    $condition: ModelsimulationReportConditionInput
  ) {
    updateSimulationReport(input: $input, condition: $condition) {
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
export const deleteSimulationReport = /* GraphQL */ `
  mutation DeleteSimulationReport(
    $input: DeleteSimulationReportInput!
    $condition: ModelsimulationReportConditionInput
  ) {
    deleteSimulationReport(input: $input, condition: $condition) {
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
