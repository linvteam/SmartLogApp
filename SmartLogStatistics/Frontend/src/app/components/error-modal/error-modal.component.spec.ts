import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorModalComponent } from './error-modal.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ ErrorModalComponent ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TUS-62: Verifica che la classe venga istanziata correttamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
