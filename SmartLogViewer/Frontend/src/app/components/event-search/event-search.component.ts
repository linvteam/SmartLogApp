import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LogService } from 'src/app/services/log.service';
import { LogMessageService } from 'src/app/services/log-message.service';


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
    constructor(private formBuilder: FormBuilder, private logMessageService: LogMessageService) {
        this.searchString = "";
    }

    ngOnInit() {
        this.logMessageService.currentValue.subscribe(value => this.searchString = value)
    }

    onSubmit(): void {
        // Process data here
        console.warn('Your data: ', this.uploadForm.value.q);

        this.searchString = this.uploadForm.value.q as string;

        this.logMessageService.changeValue(this.searchString);


        this.uploadForm.reset();
        
    }


}
