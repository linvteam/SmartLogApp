import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent {

    uploadForm = this.formBuilder.group({
        q: ''
    });


    constructor(private formBuilder: FormBuilder) {
        
    }

    onSubmit(): void {
        // Process data here
        console.warn('Your data: ', this.uploadForm.value);
        this.uploadForm.reset();
    }


}
