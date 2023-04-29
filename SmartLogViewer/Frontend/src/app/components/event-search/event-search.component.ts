import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LogService } from 'src/app/services/log.service';


@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent {

    uploadForm = this.formBuilder.group({
        q: ''
    });


    constructor(private formBuilder: FormBuilder, private logService: LogService) {
        console.log(this.logService.getDisplayLog().Events.length)
    }

    onSubmit(): void {
        // Process data here
        console.warn('Your data: ', this.uploadForm.value.q);

        let searchString = this.uploadForm.value.q;

        this.logService.filterEvents(searchString)

        console.log(this.logService.getDisplayLog().Events.length)

        this.uploadForm.reset();
        
    }


}
