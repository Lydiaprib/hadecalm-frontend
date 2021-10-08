import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AppHeaderComponent } from './app-header/app-header.component';
import { InitialFormComponent } from './initial-form/initial-form.component';
import { RouterModule, Routes } from '@angular/router';
import { InitialFormModule } from './initial-form/initial-form.module';
import { IntroductionModule } from './introduction/introduction.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';

const routes: Routes = [
  {
    path: 'general',
    loadChildren: () => import('./initial-form/initial-form.module').then(m => InitialFormModule)
  },
  // { path: 'general', component: InitialFormComponent },
  {
    path: 'introduction',
    loadChildren: () => import('./introduction/introduction.module').then(m => IntroductionModule)
  },
  {
    path: 'questionnaire',
    loadChildren: () => import('./questionnaire/questionnaire.module').then(m => QuestionnaireModule)
  },
  { path: '', redirectTo: '/introduction', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [AppHeaderComponent],
  exports: [AppHeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
