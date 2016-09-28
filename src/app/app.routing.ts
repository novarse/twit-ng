import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendComponent } from './friend/friend.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '',  redirectTo: '/feed',  pathMatch: 'full'},
  { path: 'feed', component: FeedComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'friends/:friendId', component: FriendComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'login', component: LoginComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes); 