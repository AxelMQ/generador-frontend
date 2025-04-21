import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CodeGeneratorService, AngularComponentCode } from '../../services/code-generator.service';
import { DesignCanvasComponent } from './components/design-canvas/design-canvas.component';
import { CodePreviewComponent } from './components/code-preview/code-preview.component';

type DroppedElement = {
  id: string;
  type: 'Boton' | 'Input' | 'Titulo';
  props: any;
};

@Component({
  selector: 'app-generator-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, DesignCanvasComponent, CodePreviewComponent],
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.css']
})
export class GeneratorPageComponent {
  private codeGen = inject(CodeGeneratorService);
  fullGeneratedCode: AngularComponentCode | null = null;
  droppedElements: DroppedElement[] = [];
  availableComponents = [
    { type: 'Boton', label: 'Botón' },
    { type: 'Input', label: 'Input' },
    { type: 'Titulo', label: 'Título' }
  ];

  onGenerateAll() {
    this.fullGeneratedCode = this.codeGen.generateComponentCode('preview', this.droppedElements);
  }

  updateGeneratedCode() {
    this.fullGeneratedCode = this.codeGen.generateComponentCode('preview', this.droppedElements);
  }

  onDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const type = event.item.data.type;
      const newElement: DroppedElement = {
        id: crypto.randomUUID(),
        type,
        props: this.getDefaultProps(type)
      };
      this.droppedElements.splice(event.currentIndex, 0, newElement);
    }
    this.updateGeneratedCode();
  }

  getDefaultProps(type: 'Boton' | 'Input' | 'Titulo') {
    switch (type) {
      case 'Boton':
        return { text: 'Haz clic aquí', color: 'primary' };
      case 'Input':
        return { placeholder: 'Escribe aquí', type: 'text' };
      case 'Titulo':
        return { text: 'Título por defecto', level: 1 };
      default:
        return {};
    }
  }

  removeElement(id: string) {
    this.droppedElements = this.droppedElements.filter(el => el.id !== id);
    this.updateGeneratedCode();
  }
}