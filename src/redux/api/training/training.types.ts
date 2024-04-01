
export interface IExercise {
  _id?: string,
  name: string,
  replays: number,
  weight: number,
  approaches: number,
  isImplementation: boolean,
  isSelectedForDelete: boolean,
  unicKyeForDev: number,
}

export interface IExerciseWithId extends IExercise {
  _id: string
}

export interface IParameters {
  "repeat": boolean,
  "period": number,
  "jointTraining": boolean,
  "participants": string[]
}

export interface ITraining {
  "_id": string,
  "name": string,
  "date": string,
  "isImplementation": false,
  "userId": "string",
  "parameters": IParameters,
  "exercises": IExerciseWithId[]
}

export interface ITrainingReq {
  "_id"?: string,
  "name": string,
  "date": string,
  "isImplementation"?: boolean,
  "userId"?: "string",
  "parameters"?: IParameters,
  "exercises": IExercise[]
}
