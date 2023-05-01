import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LogService } from 'src/app/services/log.service';
import { EventSearchService } from 'src/app/services/event-search.service';


@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent implements OnInit {

    uploadForm = this.formBuilder.group({
        q: ''
    });

    searchString: string;

    constructor(private formBuilder: FormBuilder, private eventSearchService: EventSearchService) {
        this.searchString = "";
    }

    ngOnInit() {

    }

    onSubmit(): void {

        // Process data here

        this.searchString = this.uploadForm.value.q as string;

        console.warn('Your data: ', this.searchString);

        this.eventSearchService.filterEvents(this.searchString);

        this.uploadForm.reset();
        
    }


}
