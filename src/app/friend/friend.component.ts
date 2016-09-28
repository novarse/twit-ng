import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-friend',
  templateUrl: 'friend.component.html',
  styleUrls: ['friend.component.css']
})
export class FriendComponent implements OnInit {

  friendId = ''

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.map(params => params['friendId']).subscribe((friendId) => {
	      this.friendId = friendId;
	      console.log(friendId);
	    });
  }

}