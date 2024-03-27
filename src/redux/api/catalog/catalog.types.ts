export interface ITrainingItem {
  "name": string,
  "key": string,
  "label": string,
}
export interface ITariffItem {
  "_id": "string",
  "name": "string",
  "periods": [
    {
      "text": "string",
      "cost": number,
      "days": number
    }
  ]
}
export interface IPeriod {


  "text": "string",
  "cost": number,
  "days": number


}