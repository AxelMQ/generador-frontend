import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generator-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.css'],
})

export class GeneratorPageComponent {
  private sanitizer = inject(DomSanitizer); 

  // Tipado fuerte para droppedElements
  droppedElements: Array<{ type: 'Boton' | 'Input' | 'Titulo'; html: String }> = [];

  generatedCode: string = '';

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const type = event.dataTransfer?.getData('component-type');

    if (type === 'Boton' || type === 'Input' || type === 'Titulo' ) {
      const html = this.getHtmlFromType(type);
      this.droppedElements.push({ type, html });
      this.updateGeneratedCode();
    }
  }

  // Retorna HTML como string 
  private getHtmlFromType(type: 'Boton' | 'Input' | 'Titulo'): string {
    const components = {
      'Boton': '<button class= "component">Click aqui</button>',
      'Input': '<input class="component" placeholder="Texto aqui" />',
      'Titulo': '<h1 class="component">Titulo</h1>'
    }
    return components[type] || '';
  }

  private updateGeneratedCode() {
    this.generatedCode = this.droppedElements.map(el => el.html.toString()).join('\n');
  }
  
  onDragStart(event: DragEvent, type: 'Boton' | 'Input' | 'Titulo') {
    event.dataTransfer?.setData('component-type', type);
  }
  
}
