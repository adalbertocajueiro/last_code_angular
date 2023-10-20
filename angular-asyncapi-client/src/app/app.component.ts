import { Component } from '@angular/core';
import { ClientImplementationService } from './client/implementation/client_implementation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-asyncapi-client';

  constructor(private clientImplementation: ClientImplementationService) {}
}
