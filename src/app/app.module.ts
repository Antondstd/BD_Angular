import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from "@angular/common";
import {PointtrService} from "./pointtr.service";
import { ProfileComponent } from './profile/profile.component';
import { HeadMenuComponent } from './head-menu/head-menu.component';
import { GroupComponent } from './group/group.component';
import { PgTournamentsComponent } from './pg-tournaments/pg-tournaments.component';
import { PgTournamentComponent } from './pg-tournament/pg-tournament.component';
import { StorageComponent } from './storage/storage.component';
import { StoragesComponent } from './storages/storages.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'group/:id',component: GroupComponent},
  {path: 'tournaments',component: PgTournamentsComponent},
  {path: 'tournament/:id',component: PgTournamentComponent},
  {path: 'rooms',component:StoragesComponent},
  {path: 'room/:id',component:StorageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ProfileComponent,
    HeadMenuComponent,
    GroupComponent,
    PgTournamentsComponent,
    PgTournamentComponent,
    StorageComponent,
    StoragesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe,PointtrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
