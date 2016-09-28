import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FeedService } from '../feed.service';
import { Tweet } from '../tweet';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {

  tweets = [];

  tweetText = '';

  errorText = '';

  loaded = false;

  constructor(private userService: UserService, private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.getCurrentFeed().subscribe( (newTweets) => {
      this.tweets = newTweets;
    }, (err) => {
      this.errorText = `Oh no. We have experienced an internal error. The underlying error was ${err}`;
    }, () => {
      this.loaded = true;
    });
  }

  OnFavorite(tweet) {
    this.feedService.favoriteTweet(tweet);
  }

  OnRetweet(tweet) {
    this.feedService.reTweet(tweet);
  }

  OnNewTweet() {
    console.log(this.tweetText);
    this.feedService.postNewTweet(this.tweetText).subscribe((newTweet: Tweet) => {
      this.tweets.unshift(newTweet);
    }, (err) => {
        this.errorText = `Oh no. We have experienced an internal error. The underlying error was ${err}`;
    });
    this.tweetText = '';
  }

}
