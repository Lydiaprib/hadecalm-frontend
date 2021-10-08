import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICheckAnswers } from '../models/ICheckAnswers';
import { IGeneralQuestions } from '../models/IGeneralQuestions';
import { ITopicQuestions } from '../models/ITopicQuestions';
import { ConfigService } from '../services/services.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  private generalQuestions: IGeneralQuestions = {
    aspects: []
  };
  private questionArray: ITopicQuestions[] = [];
  private mainIndex: number = 0;
  private questionIndex: number = 0;
  private checkAnswers: ICheckAnswers[] = [];
  public aspects: ITopicQuestions[] = [];
  public title: string = '';
  public isMainTopic: boolean = true;
  public showSpinner: boolean = false;
  public currentQuestion: ITopicQuestions = {
    id: '',
    active: false,
    answer: false,
    description: ''
  };

  constructor(
    protected _services: ConfigService,
    protected _router: Router
  ) { }

  ngOnInit() {
    this.generalQuestions = history.state.data;
    if(!!!this.generalQuestions) {
      this._router.navigate(['general/']);
    } else {
      this.aspects = this.generalQuestions.aspects;
      console.log('generalQuestions', this.generalQuestions);
      this.newMainTopic();
      this.currentQuestion = this.questionArray[this.questionIndex];
    }
  }

  private newMainTopic() {
    this.title = this.aspects[this.mainIndex].description;
    this._services.getQuestionByParentId(this.aspects[this.mainIndex].id).subscribe(res => {
      res.forEach((element: ITopicQuestions) => {
        this.questionArray.push(element);
      })
    });
    this.isMainTopic = true;
    this.mainIndex = ++this.mainIndex;
  }

  public nextQuestion(answer: boolean) {
    this.showSpinner = true;
    let waitForResponse = false;
    if(!!this.currentQuestion && answer === this.currentQuestion.answer) {
      waitForResponse = true;
      this.checkAnswers.push({
        id: this.currentQuestion.id,
        relatedId: this.currentQuestion.relatedId,
        answer: this.currentQuestion.answer
      });
      this._services.getQuestionByParentId(this.currentQuestion.id).subscribe(res => {
        res.forEach((element: ITopicQuestions) => {
          this.questionArray.push(element);
          this.questionSettings();
        })
      });
    }
    if(!waitForResponse) {
      this.questionSettings();
    }
  }

  private questionSettings() {
    console.log(this.questionArray.length, this.questionIndex);
    if(this.questionArray.length <= this.questionIndex) {
      if(this.aspects.length <= this.mainIndex) {
        console.log('FIN DE LAS PREGUNTAS');
        this.currentQuestion = {
          id: '',
          active: false,
          answer: false,
          description: ''};
      } else {
        this.newMainTopic();
      }
    } else {
      this.isMainTopic = false;
      console.log(this.questionArray, this.questionIndex);
      this.currentQuestion = this.questionArray[this.questionIndex];
      this.questionIndex = ++this.questionIndex;
      console.log('currentquestion', this.currentQuestion);
    }
    this.showSpinner = false;
  }

  private checkAnswerValues(id: string) {
    let question: ICheckAnswers | undefined;
    this.checkAnswers.some(function(value) {
      console.log(value);
      question = value.relatedId?.find(element => element === id) ? value : undefined;
      return question !== undefined;
    });
    if(question !== undefined) {
      this.nextQuestion(!!question.answer)
    }
  }

  public checkBoxChange(checked: boolean, id: string) {
    console.log('valor del checkbox', checked, id);
  }

  public RRSSIcons(value: string): string {
    switch(value) {
      case 'Twitter':
        return 'twitter';
      case 'Facebook':
        return 'facebook';
      case 'Instagram':
        return 'instagram';
      case 'Tik Tok':
        return 'music-box';
      case 'LinkedIn':
        return 'linkedin';
      default:
        return 'pine-tree';
    }
  }

}
