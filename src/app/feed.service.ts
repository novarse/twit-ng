import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Tweet } from './tweet';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FeedService {

  tweets = [];

  tweetText = '';

  constructor(private userService: UserService, private http: Http) { }

  ngOnInit() {
  }

  private getTweetFromJson(obj: Tweet): Tweet {
    return new Tweet(
      obj.id, obj.body, obj.author, obj.date, obj.retweets, obj.favorites);
  }

  getCurrentFeed(): Observable<Tweet[]> {

    return this.http.get('/api/tweets').map((resp: Response) => {
      console.log(resp.json());
      let fetchedTweets = [];
      for (let tweet of resp.json().data) {
        fetchedTweets.push(this.getTweetFromJson(tweet));
      }
      return fetchedTweets as Array<Tweet>;
    }).catch(this.errorHandler);

  }

  private errorHandler(err) {
    console.log(err);
    return Observable.throw(err);
  }

  isUserInCollection(collection: string[], userId: string): boolean {
    return collection.indexOf(userId) !== -1;
  }

  postNewTweet(tweetText: string) {

    let body = JSON.stringify({
      body: tweetText, author: this.userService.getCurrentUser(),
      date: new Date(), retweets: [], favorites: []
    });

    console.log(body);

    return this.http.post('/api/tweets', body).map(
      (resp: Response) => {
        console.log(resp.json());
        return this.getTweetFromJson(resp.json().data);
      });

  }

  reTweet(tweet: Tweet) {

    if (!this.isUserInCollection(tweet.retweets, this.userService.getCurrentUser())) {
      tweet.retweets.push(this.userService.getCurrentUser());
      console.log('retweet');
      this.updateTweet(tweet).subscribe(resp => console.log(resp));
    }

  }

  favoriteTweet(tweet: Tweet) {

    if (!this.isUserInCollection(tweet.favorites, this.userService.getCurrentUser())) {
      tweet.favorites.push(this.userService.getCurrentUser());
      this.updateTweet(tweet).subscribe(resp => console.log(resp));
    }

  }

  getFriends(): Observable<string[]> {

    return this.http.get('/assets/friends.json')
      .map((resp: Response) => resp.json() as string[]);
    // return [ 'Mary', 'Joe', 'Karen', 'Phil', 'Toni'];
  }

updateTweet(tweet: Tweet) {
    let body = JSON.stringify(tweet);

    let url = `/api/tweets/${tweet.id}`;

    return this.http.put(url, body).map(
      (resp: Response) => {
        console.log(resp);
        if (resp.status === 204) {
          console.log('Success. Yay!');
        } else {
          throw `Error fetching tweet ${tweet.id}. Status was ${resp.status}`;
        }
      }).catch(this.errorHandler);

  }

}
