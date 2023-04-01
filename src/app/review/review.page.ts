import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage {
  username: string = '';
  score: number = 0;
  comment: string = '';
  reviews: any[] = [];

  constructor(private storage: Storage) {
    this.storage.create(); // call the create() method
  }

  ionViewDidEnter() {
    this.storage.get('reviews').then((reviews) => {
      console.log('Saved reviews:', reviews);
      if (reviews) {
        this.reviews = JSON.parse(reviews);
      }
    });
  }

  saveReview() {
    console.log('Saving review');
    const review = {
      username: this.username,
      score: this.score,
      comment: this.comment || '' // make comment an empty string if it's undefined
    };

    this.storage.get('reviews').then((reviews) => {
      let savedReviews = [];

      if (reviews) {
        savedReviews = JSON.parse(reviews);
      }

      savedReviews.push(review);
      console.log('Saved reviews:', savedReviews);
      this.storage.set('reviews', JSON.stringify(savedReviews)).then(() => {
        this.reviews.push(review);
        this.username = '';
        this.score = 0;
        this.comment = '';
      });
    });
  }
}