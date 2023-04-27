import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isVisible : boolean;
  
  constructor() {
    this.isVisible = true;
  }
  
  toggleInfoHeader() : void {
    this.isVisible = !this.isVisible;
  }
}
