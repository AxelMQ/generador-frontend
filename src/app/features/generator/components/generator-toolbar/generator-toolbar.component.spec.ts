import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorToolbarComponent } from './generator-toolbar.component';

describe('GeneratorToolbarComponent', () => {
  let component: GeneratorToolbarComponent;
  let fixture: ComponentFixture<GeneratorToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratorToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
