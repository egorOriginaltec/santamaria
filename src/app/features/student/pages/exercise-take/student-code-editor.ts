import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { highlightCode } from './highlight-code';

@Component({
  selector: 'app-student-code-editor',
  templateUrl: './student-code-editor.html',
  styleUrl: './student-code-editor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCodeEditor {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly highlightPane = viewChild<ElementRef<HTMLElement>>('highlightPane');
  private readonly gutter = viewChild<ElementRef<HTMLElement>>('gutter');

  readonly value = input('');
  readonly language = input('');
  readonly disabled = input(false);
  readonly placeholder = input('');
  readonly valueChange = output<string>();

  readonly lines = computed(() => {
    const count = Math.max((this.value() || '').split('\n').length, 8);
    return Array.from({ length: count }, (_, index) => index + 1);
  });

  readonly highlighted = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(highlightCode(this.value(), this.language())),
  );

  onInput(value: string): void {
    if (this.disabled()) {
      return;
    }

    this.valueChange.emit(value);
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const highlight = this.highlightPane()?.nativeElement;
    const gutter = this.gutter()?.nativeElement;
    if (highlight) {
      highlight.scrollTop = target.scrollTop;
      highlight.scrollLeft = target.scrollLeft;
    }
    if (gutter) {
      gutter.scrollTop = target.scrollTop;
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled() || event.key !== 'Tab') {
      return;
    }

    event.preventDefault();
    const area = event.target as HTMLTextAreaElement;
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const next = `${this.value().slice(0, start)}  ${this.value().slice(end)}`;
    this.valueChange.emit(next);
    queueMicrotask(() => {
      area.selectionStart = start + 2;
      area.selectionEnd = start + 2;
    });
  }
}
