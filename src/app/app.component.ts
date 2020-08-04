import { Component } from '@angular/core';
import { AuthenticationService } from './core/authentication/authentication.service';
import { Router } from '@angular/router';
import { CredentialsService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientApp';
  isExpanded = false;

  constructor(public authService: AuthenticationService,
    public credentialsService: CredentialsService,
    private router: Router) {
  }

  ngOnInit() {
    console.log(this.credentialsService.isAuthenticated());
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }
}
