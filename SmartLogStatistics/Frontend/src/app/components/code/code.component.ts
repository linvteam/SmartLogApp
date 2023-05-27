import {Component} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';


/**
 * Classe che gestisce il widget di inserimento del code
 */
@Component({
    selector: 'app-code',
    templateUrl: './code.component.html',
    styleUrls: ['./code.component.css']
})
export class CodeComponent {

    public availableCode: string[] = [];

    public selectedCode: string = "";

    public dropdownSettings = {
        singleSelection: true,
    }

    formGroup = this.formBuilder.group({
        code: new FormControl()
    });

    /**
     * Crea una nuova istanza del controller del widget di inserimento del code
     * @param formBuilder Servizio di gestione dei form
     */
    constructor(private formBuilder: FormBuilder) {
        this.availableCode = ["1","2","3","4","5","6"];
    }

    /**
     * Metodo che gestisce il submit del form.
     */
    public submitForm(): void {

      console.log("CODE:");
      console.log(this.selectedCode);
    }
}
