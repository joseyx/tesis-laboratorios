import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPageComponent } from './citas-page.component';

describe('CitasPageComponent', () => {
  let component: CitasPageComponent;
  let fixture: ComponentFixture<CitasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
