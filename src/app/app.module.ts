import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewGraphqlComponent } from './view-graphql/view-graphql.component';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import { GraphqlService } from './graphql.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule,MatCardModule,MatNativeDateModule,MatSelectModule,} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    ViewGraphqlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [GraphqlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
