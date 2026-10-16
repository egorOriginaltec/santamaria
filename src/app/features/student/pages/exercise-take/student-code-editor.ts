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

const INDENT = '  ';

const OPENERS: Readonly<Record<string, string>> = {
  '(': ')',
  '[': ']',
  '"': '"',
  "'": "'",
};

const CLOSERS = new Set(['}', ')', ']']);

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
    if (this.disabled() || event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    const area = event.target as HTMLTextAreaElement;

    if (event.key === 'Tab') {
      event.preventDefault();
      if (event.shiftKey) {
        this.unindent(area);
      } else {
        this.indent(area);
      }
      return;
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleEnter(area);
      return;
    }

    if (event.key === 'Backspace' && this.handleBackspacePair(area, event)) {
      return;
    }

    if (CLOSERS.has(event.key) && this.skipCloser(area, event.key)) {
      event.preventDefault();
      const pos = area.selectionStart + 1;
      this.apply(area, this.value(), pos, pos);
      return;
    }

    const closer = OPENERS[event.key];
    if (closer) {
      event.preventDefault();
      this.insertPair(area, event.key, closer);
    }
  }

  private indent(area: HTMLTextAreaElement): void {
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const value = this.value();

    if (start !== end && value.slice(start, end).includes('\n')) {
      const blockStart = value.lastIndexOf('\n', start - 1) + 1;
      const block = value.slice(blockStart, end);
      const nextBlock = block
        .split('\n')
        .map((line, index, lines) => (index === lines.length - 1 && line === '' ? line : `${INDENT}${line}`))
        .join('\n');
      const next = `${value.slice(0, blockStart)}${nextBlock}${value.slice(end)}`;
      this.apply(area, next, start + INDENT.length, end + (nextBlock.length - block.length));
      return;
    }

    const next = `${value.slice(0, start)}${INDENT}${value.slice(end)}`;
    this.apply(area, next, start + INDENT.length, start + INDENT.length);
  }

  private unindent(area: HTMLTextAreaElement): void {
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const value = this.value();
    const blockStart = value.lastIndexOf('\n', start - 1) + 1;
    const blockEnd = start === end ? this.lineEnd(value, start) : end;
    const block = value.slice(blockStart, blockEnd);
    const lines = block.split('\n');
    let removedBeforeStart = 0;
    let removedTotal = 0;
    let offset = 0;
    const nextLines: string[] = [];

    for (const line of lines) {
      const strip = line.startsWith(INDENT)
        ? INDENT.length
        : line.startsWith('\t') || line.startsWith(' ')
          ? 1
          : 0;
      const absoluteStart = blockStart + offset;
      const absoluteEnd = absoluteStart + line.length;
      if (start > absoluteEnd) {
        removedBeforeStart += strip;
      } else if (start > absoluteStart) {
        removedBeforeStart += Math.min(strip, start - absoluteStart);
      }
      removedTotal += strip;
      nextLines.push(line.slice(strip));
      offset += line.length + 1;
    }

    const nextBlock = nextLines.join('\n');
    const next = `${value.slice(0, blockStart)}${nextBlock}${value.slice(blockEnd)}`;
    const nextStart = Math.max(blockStart, start - removedBeforeStart);
    const nextEnd = Math.max(nextStart, end - removedTotal);
    this.apply(area, next, nextStart, nextEnd);
  }

  private handleEnter(area: HTMLTextAreaElement): void {
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const value = this.value();
    const before = value.slice(0, start);
    const after = value.slice(end);
    const lineStart = before.lastIndexOf('\n') + 1;
    const currentIndent = before.slice(lineStart).match(/^[ \t]*/)?.[0] ?? '';
    const prevChar = before.slice(-1);
    const nextChar = after.slice(0, 1);

    // `.hola {` + Enter → opens block and places the closing `}` on Enter
    if (prevChar === '{') {
      const inner = `${currentIndent}${INDENT}`;
      const rest = nextChar === '}' ? after : `}${after}`;
      const inserted = `\n${inner}\n${currentIndent}`;
      const next = `${before}${inserted}${rest}`;
      this.apply(area, next, before.length + 1 + inner.length, before.length + 1 + inner.length);
      return;
    }

    const extra = prevChar === ':' || prevChar === '(' || prevChar === '[' ? INDENT : '';
    const inserted = `\n${currentIndent}${extra}`;
    const next = `${before}${inserted}${after}`;
    this.apply(area, next, before.length + inserted.length, before.length + inserted.length);
  }

  private handleBackspacePair(area: HTMLTextAreaElement, event: KeyboardEvent): boolean {
    const start = area.selectionStart;
    const end = area.selectionEnd;
    if (start !== end || start === 0) {
      return false;
    }

    const value = this.value();
    const open = value[start - 1];
    const close = value[start];
    if (!open || !close || OPENERS[open] !== close) {
      return false;
    }

    event.preventDefault();
    const next = `${value.slice(0, start - 1)}${value.slice(start + 1)}`;
    this.apply(area, next, start - 1, start - 1);
    return true;
  }

  private skipCloser(area: HTMLTextAreaElement, closer: string): boolean {
    const start = area.selectionStart;
    const end = area.selectionEnd;
    if (start !== end) {
      return false;
    }

    return this.value()[start] === closer;
  }

  private insertPair(area: HTMLTextAreaElement, open: string, close: string): void {
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const value = this.value();

    if (start === end && (open === '"' || open === "'") && value[start] === close) {
      this.apply(area, value, start + 1, start + 1);
      return;
    }

    const selected = value.slice(start, end);
    if (selected) {
      const next = `${value.slice(0, start)}${open}${selected}${close}${value.slice(end)}`;
      this.apply(area, next, start + 1, end + 1);
      return;
    }

    const next = `${value.slice(0, start)}${open}${close}${value.slice(end)}`;
    this.apply(area, next, start + 1, start + 1);
  }

  private lineEnd(value: string, index: number): number {
    const at = value.indexOf('\n', index);
    return at === -1 ? value.length : at;
  }

  private apply(area: HTMLTextAreaElement, next: string, selectionStart: number, selectionEnd: number): void {
    this.valueChange.emit(next);
    queueMicrotask(() => {
      area.selectionStart = selectionStart;
      area.selectionEnd = selectionEnd;
    });
  }
}
