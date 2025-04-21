import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-design-canvas',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './design-canvas.component.html',
  styleUrls: ['./design-canvas.component.css']
})
export class DesignCanvasComponent {
  @Input() droppedElements: any[] = [];
  @Output() elementRemoved = new EventEmitter<string>();
  @Output() elementsUpdated = new EventEmitter<void>();
  @Output() elementSelected = new EventEmitter<any>();

  selectedElement: any = null;
  editPanelVisible = false;
  showOverlay = false;

  // Mapeo de nombres de componentes
  componentNames: { [key: string]: string } = {
    'Boton': 'Botón',
    'Input': 'Campo de Texto',
    'Titulo': 'Título'
  };

  // Colores disponibles para los botones
  buttonColors = [
    { value: 'primary', name: 'Primario (Azul)' },
    { value: 'secondary', name: 'Secundario (Gris)' },
    { value: 'danger', name: 'Peligro (Rojo)' }
  ];

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.edit-panel-container') && 
        !(event.target as HTMLElement).closest('.control-btn')) {
      this.closeEditPanel();
    }
  }

  onDrop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.droppedElements, event.previousIndex, event.currentIndex);
    } else {
      const elementType = event.item.data;
      const newElement = {
        id: crypto.randomUUID(),
        type: elementType,
        props: this.getDefaultProps(elementType),
        position: { x: 0, y: 0 }
      };
      
      this.droppedElements.splice(event.currentIndex, 0, newElement);
      // No pasamos el evento aquí ya que no es necesario para la selección inicial
      this.selectElement(newElement);
    }
    this.elementsUpdated.emit();
  }

  getDefaultProps(type: string): any {
    switch(type) {
      case 'Boton': return { text: 'Botón', color: 'primary' };
      case 'Input': return { placeholder: 'Escribe aquí...', type: 'text' };
      case 'Titulo': return { text: 'Título', level: 1 };
      default: return {};
    }
  }

  getComponentName(type: string): string {
    return this.componentNames[type] || 'Componente';
  }

  removeElement(id: string, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.droppedElements = this.droppedElements.filter(e => e.id !== id);
    this.elementRemoved.emit(id);
    this.elementsUpdated.emit();
    
    if (this.selectedElement?.id === id) {
      this.closeEditPanel();
    }
  }

  onPropChange(): void {
    this.elementsUpdated.emit();
  }

  selectElement(element: any, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedElement = element;
    this.elementSelected.emit(element);
  }

  editElement(element: any, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedElement = element;
    this.editPanelVisible = true;
    this.showOverlay = true;
    this.elementSelected.emit(element);
  }

  closeEditPanel(): void {
    this.editPanelVisible = false;
    this.showOverlay = false;
    this.elementsUpdated.emit();
  }
}