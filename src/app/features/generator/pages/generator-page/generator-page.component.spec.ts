import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneratorPageComponent } from './generator-page.component';
import { CommonModule } from '@angular/common';

describe('GeneratorPageComponent', () => {
  let component: GeneratorPageComponent;
  let fixture: ComponentFixture<GeneratorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, GeneratorPageComponent], // Importa el componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a button when dropped', () => {
    const mockEvent = {
      preventDefault: () => {},
      dataTransfer: { getData: () => 'Botón' }
    } as unknown as DragEvent;

    component.onDrop(mockEvent);
    expect(component.droppedElements.length).toBe(1);
    expect(component.droppedElements[0].type).toBe('Botón');
  });

  it('should update generatedCode when elements are dropped', () => {
    const mockEvent = {
      preventDefault: () => {},
      dataTransfer: { getData: () => 'Input' }
    } as unknown as DragEvent;

    component.onDrop(mockEvent);
    expect(component.generatedCode).toContain('<input');
  });

  it('should prevent default on dragover', () => {
    const mockEvent = {
      preventDefault: jasmine.createSpy('preventDefault')
    } as unknown as DragEvent;

    component.onDragOver(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});