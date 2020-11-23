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
      totalEfficiency
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
      totalEfficiency
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
      totalEfficiency
      createdAt
      updatedAt
    }
  }
`;
export const createUserInput = /* GraphQL */ `
  mutation CreateUserInput(
    $input: CreateUserInputInput!
    $condition: ModeluserInputConditionInput
  ) {
    createUserInput(input: $input, condition: $condition) {
      id
      wheelDiameter
      fuelType
      augerLength
      createdAt
      updatedAt
    }
  }
`;
export const updateUserInput = /* GraphQL */ `
  mutation UpdateUserInput(
    $input: UpdateUserInputInput!
    $condition: ModeluserInputConditionInput
  ) {
    updateUserInput(input: $input, condition: $condition) {
      id
      wheelDiameter
      fuelType
      augerLength
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserInput = /* GraphQL */ `
  mutation DeleteUserInput(
    $input: DeleteUserInputInput!
    $condition: ModeluserInputConditionInput
  ) {
    deleteUserInput(input: $input, condition: $condition) {
      id
      wheelDiameter
      fuelType
      augerLength
      createdAt
      updatedAt
    }
  }
`;
