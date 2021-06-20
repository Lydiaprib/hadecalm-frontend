export interface ITopicQuestions {
  id: string;
  active: boolean;
  answer: boolean;
  description: string;
  options?: string[];
  parentId?: string;
  relatedId?: string[];
}
