import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsExamplesComponent } from './rxjs-examples.component';

describe('RxjsExamplesComponent', () => {
  let component: RxjsExamplesComponent;
  let fixture: ComponentFixture<RxjsExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RxjsExamplesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
