import { ITopicQuestions } from "./ITopicQuestions";

export interface IGeneralQuestions {
  province?: string;
  sector?: string;
  employeeNumber?: number;
  aspects: ITopicQuestions[];
}
