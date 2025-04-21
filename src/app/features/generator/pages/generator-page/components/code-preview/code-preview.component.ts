import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';

type CopySuccessType = {
  html: boolean;
  css: boolean;
  ts: boolean;
};

@Component({
  selector: 'app-code-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-preview.component.html',
  styleUrls: ['./code-preview.component.css']
})
export class CodePreviewComponent {
  @Input() generatedHtml: string = '';
  @Input() generatedCss: string = '';
  @Input() generatedTs: string = '';

  activeTab: 'html' | 'css' | 'ts' = 'html';
  copySuccess: CopySuccessType = {
    html: false,
    css: false,
    ts: false
  };

  constructor(private clipboard: Clipboard) {}

  copyToClipboard(code: string, type: 'html' | 'css' | 'ts'): void {
    if (this.clipboard.copy(code)) {
      this.copySuccess[type] = true;
      setTimeout(() => this.copySuccess[type] = false, 2000);
    }
  }

  selectTab(tab: 'html' | 'css' | 'ts'): void {
    this.activeTab = tab;
  }
}