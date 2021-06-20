import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public aspects: ITopicQuestions[] = [];
  public title: string = '';
  public isMainTopic: boolean = true;
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
      this.questionArray.push(res);
    });
    this.isMainTopic = true;
    this.mainIndex = ++this.mainIndex;
  }

  public nextQuestion(answer: boolean) {
    if(!!this.currentQuestion && answer === this.currentQuestion.answer) {
      this._services.getQuestionByParentId(this.currentQuestion.id).subscribe(res => {
        this.questionArray.push(res);
      });
    }
    if(this.questionArray.length < this.questionIndex) {
      if(this.aspects.length < this.mainIndex) {
        console.log('FIN DE LAS PREGUTNAS');
      } else {
        this.newMainTopic();
      }
    } else {
      this.isMainTopic = false;
      this.currentQuestion = this.questionArray[this.questionIndex];
      this.questionIndex = ++this.questionIndex;
      console.log('currentquestion', this.currentQuestion);
    }
  }

}
