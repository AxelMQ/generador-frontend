import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

type ComponentProps = {
  text?: string;
  placeholder?: string;
};

type DroppedElement = {
  id: string;
  type: 'Boton' | 'Input' | 'Titulo';
  props: ComponentProps;
};

@Component({
  selector: 'app-generator-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.css'],
})
export class GeneratorPageComponent {
  private sanitizer = inject(DomSanitizer);

  droppedElements: DroppedElement[] = [];
  generatedCode: string = '';

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const type = event.dataTransfer?.getData('component-type') as DroppedElement['type'];

    if (type) {
      const newElement: DroppedElement = {
        id: crypto.randomUUID(), // identificador único
        type,
        props: this.getDefaultProps(type),
      };
      this.droppedElements.push(newElement);
      this.updateGeneratedCode();
    }
  }

  private getDefaultProps(type: DroppedElement['type']): ComponentProps {
    switch (type) {
      case 'Boton':
        return { text: 'Click aquí' };
      case 'Input':
        return { placeholder: 'Texto aquí' };
      case 'Titulo':
        return { text: 'Título' };
      default:
        return {};
    }
  }

  updateGeneratedCode() {
    this.generatedCode = this.droppedElements.map(el => this.generateHtml(el)).join('\n');
  }

  removeElement(id: string) {
    this.droppedElements = this.droppedElements.filter(el => el.id !== id);
    this.updateGeneratedCode();
  }
  
  dropElement(event: CdkDragDrop<DroppedElement[]>) {
    moveItemInArray(this.droppedElements, event.previousIndex, event.currentIndex);
    this.updateGeneratedCode();
  }

  public generateHtml(el: DroppedElement): string {
    const { type, props } = el;
    switch (type) {
      case 'Boton':
        return `<button class="component">${props.text}</button>`;
      case 'Input':
        return `<input class="component" placeholder="${props.placeholder}" />`;
      case 'Titulo':
        return `<h1 class="component">${props.text}</h1>`;
      default:
        return '';
    }
  }

  onDragStart(event: DragEvent, type: 'Boton' | 'Input' | 'Titulo') {
    event.dataTransfer?.setData('component-type', type);
  }
}
