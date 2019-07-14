import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  text = 'Check out the Ionic Social Sharing!';
  url = 'https://ionicframework.com/';

  constructor(private socialSharing: SocialSharing) {}

  test() {
    this.socialSharing.shareVia(`com.discord`, `${this.text} ${this.url}`)
        .then(() => {
          console.log('Success');
        }).catch(() => {
          console.log('Error');
    });
  }

}
