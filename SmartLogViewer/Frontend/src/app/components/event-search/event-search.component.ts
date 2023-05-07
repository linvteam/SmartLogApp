import { Component } from '@angular/core';
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';
import { EventSearch } from "../../LogManipulator/event-search";
import { FormBuilder } from "@angular/forms";


@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent {

    uploadForm = this.formBuilder.group({
        q: ''
    });

    constructor(private formBuilder: FormBuilder, private logManipulationService: LogManipulationService) { }

    onSubmit(): void {
        this.logManipulationService.setManipulation(new EventSearch(this.uploadForm.value.q as string));
    }

}
