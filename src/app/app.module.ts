import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PlayersComponent } from './Players/players.component';
import { TeamsComponent } from './Teams/teams.component';
import { ModalComponent } from './Modal/modal.component';
import { TeamPlayersComponent } from './TeamPlayers/teamplayers.component';
import { FavoriteComponent } from './Favorite/favorite.component';

import { HttpClientModule }   from '@angular/common/http';
import { PaginatorPipe } from './paginator.pipe';

import { NgxPaginationModule } from 'ngx-pagination';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const appRoutes: Routes =[
    { path: '', component: PlayersComponent},
    { path: 'teams', component: TeamsComponent},
    { path: 'players/:abbr', component: TeamPlayersComponent},
    { path: 'favorite', component: FavoriteComponent}
];

@NgModule({
    imports: [
        BrowserModule, HttpClientModule, NgxPaginationModule, MatSlideToggleModule, MatMenuModule, 
        BrowserAnimationsModule, MatPaginatorModule, MatIconModule, RouterModule.forRoot(appRoutes), 
        MatProgressBarModule, MatDialogModule, MatTooltipModule, MatProgressSpinnerModule
    ],
    declarations: [
        AppComponent, TeamsComponent, PlayersComponent, ModalComponent, 
        TeamPlayersComponent, FavoriteComponent, PaginatorPipe
    ],
    bootstrap: [ AppComponent ],
    entryComponents: [ ModalComponent ]
    
})
export class AppModule { }
