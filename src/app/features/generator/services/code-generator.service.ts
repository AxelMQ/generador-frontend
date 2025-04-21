import { Injectable } from '@angular/core';

export interface AngularComponentCode {
  html: string;
  css: string;
  ts: string;
  filename: string;
}

export type DroppedElement ={
  id: string;
  type: 'Boton' | 'Input' | 'Titulo';
  props: {
    text?: string;
    placeholder?: string;
  };
}

@Injectable({
  providedIn: 'root'
})

export class CodeGeneratorService {

  generateComponentCode(name: string, elements: DroppedElement[]): AngularComponentCode {
    const html = this.generateHtml(elements);
    const css = this.generateCss();
    const ts = this.generateTsCode(name);

    return {
      html,
      css,
      ts,
      filename: `${name}.component.ts`,
    }
  }

  private generateHtml(elements: DroppedElement[]): string {
    return elements.map(el => {
      switch (el.type) {
        case 'Boton':
          return `<button class="component">${el.props.text}</button>`;
        case 'Input':
          return `<input class="component" placeholder="${el.props.placeholder}" />`;
        case 'Titulo':
          return `<h1 class="component">${el.props.text}</h1>`;
        default:
          return '';
      }
    }).join('\n');
  }

  private generateCss(): string {
    return `
      .component {
        padding: 8px;
        margin: 5px;
        font-family: Arial, sans-serif;
      }
    `.trim();
  }

  private generateTsCode(name: string): string {
    return `
      import { Component } from '@angular/core';

      @Component({
        selector: 'app-${name}',
        templateUrl: './${name}.component.html',
        styleUrls: ['./${name}.component.css']
      })
      export class ${this.capitalize(name)}Component { }
    `.trim();
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
