import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FeedComponent } from './feed/feed.component';
import { UserService } from './user.service';
import { FeedService } from './feed.service';
import { MessagesComponent } from './messages/messages.component';
import { FriendsComponent } from './friends/friends.component';
import { routing, appRoutingProviders } from './app.routing';
import { FriendComponent } from './friend/friend.component';
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { MockDatabaseService } from './mock.database.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FeedComponent,
    MessagesComponent,
    FriendsComponent,
    FriendComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    InMemoryWebApiModule.forRoot(MockDatabaseService, { 
        delay: 3000,  rootPath: 'api/'
    })
  ],
  providers: [ UserService, FeedService, appRoutingProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
