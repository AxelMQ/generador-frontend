import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-component-panel',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './component-panel.component.html',
  styleUrls: ['./component-panel.component.css']
})
export class ComponentPanelComponent {
  @Output() dragStart = new EventEmitter<string>();

  components = [
    { type: 'Boton', label: 'Botón', icon: '⭕' },
    { type: 'Input', label: 'Campo de Texto', icon: '📝' },
    { type: 'Titulo', label: 'Título', icon: '🔤' }
  ];

  onDragStarted(type: string): void {
    this.dragStart.emit(type);
  }
}