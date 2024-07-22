import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasEditComponent } from './citas-edit.component';

describe('CitasEditComponent', () => {
  let component: CitasEditComponent;
  let fixture: ComponentFixture<CitasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
