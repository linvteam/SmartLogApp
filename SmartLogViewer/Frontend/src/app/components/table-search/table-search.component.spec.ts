import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSearchComponent } from './table-search.component';
import { MdbAccordionComponent, MdbAccordionItemComponent, MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SequenceSearch } from 'src/app/LogManipulator/sequence-search';
import { SequenceSearchComponent } from '../sequence-search/sequence-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { FileUploadService } from 'src/app/services/upload/file-upload.service';
import { environment } from 'src/environments/environment';
import { EventGroupingComponent } from '../event-grouping/event-grouping.component';

describe('SearchComponent', () => {
  let component: TableSearchComponent;
  let fixture: ComponentFixture<TableSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MdbAccordionModule,
        NgMultiSelectDropDownModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,

      ],
      declarations: [ TableSearchComponent, SequenceSearchComponent, EventGroupingComponent ], 
      providers: [FileUploadService, { provide: BaseURL, useValue: environment.baseUrl }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    // TUV-43: Verifica che la classe venga istanziata correttamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
