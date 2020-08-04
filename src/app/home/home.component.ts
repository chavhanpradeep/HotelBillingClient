import { Component } from '@angular/core';
import { CredentialsService } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  /**
   *
   */
  constructor(public credentialsService: CredentialsService) {
  }

  ngOnInit() {

  }


}
