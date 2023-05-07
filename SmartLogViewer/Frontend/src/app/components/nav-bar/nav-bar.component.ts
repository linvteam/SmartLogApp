import { Component } from '@angular/core';
import { LogService } from '../../services/log/log.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

    constructor(public logService: LogService) { }

    public isCollapsed = true;
    public Collapse(){
        this.isCollapsed = !this.isCollapsed;
    }
}
