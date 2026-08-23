import type { DoctorFinding } from '../types/index.js';

export interface FileToCheck {
  path: string;
  content: string;
}

export function auditAccessibility(files: FileToCheck[]): DoctorFinding[] {
  const findings: DoctorFinding[] = [];

  for (const file of files) {
    const lines = file.content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (typeof line !== 'string') continue;
      const lineNum = i + 1;

      // 1. Missing alt on <img>
      if (/<img\b/i.test(line) && !/\balt\s*=\s*["'][^"']*["']/i.test(line)) {
        findings.push({
          category: 'a11y',
          severity: 'error',
          file: file.path,
          line: lineNum,
          rule: 'a11y/img-alt',
          message: '<img> element is missing an alt attribute.',
          snippet: line.trim(),
          suggestion: 'Add an alt attribute describing the image or alt="" for decorative images.',
        });
      }

      // 2. Button missing accessible name
      if (
        /<button\b[^>]*>\s*<\/(?:span|svg|i|button)>/i.test(line) &&
        !/aria-label\s*=/i.test(line) &&
        !/aria-labelledby\s*=/i.test(line)
      ) {
        findings.push({
          category: 'a11y',
          severity: 'warning',
          file: file.path,
          line: lineNum,
          rule: 'a11y/button-name',
          message: '<button> appears to have no text and is missing aria-label.',
          snippet: line.trim(),
          suggestion: 'Provide visible text or add aria-label="..." to identify the button action.',
        });
      }

      // 3. Button missing type attribute
      if (/<button\b(?![^>]*\btype=)[^>]*>/i.test(line)) {
        findings.push({
          category: 'a11y',
          severity: 'info',
          file: file.path,
          line: lineNum,
          rule: 'a11y/button-type',
          message: '<button> is missing an explicit type attribute.',
          snippet: line.trim(),
          suggestion: 'Add type="button", type="submit", or type="reset" to prevent unexpected form submissions.',
        });
      }

      // 4. Clickable non-interactive tags without role/tabindex
      if (/<(div|span)\b[^>]*(?:onclick|@click|v-on:click)[^>]*>/i.test(line)) {
        if (!/role\s*=\s*["']button["']/i.test(line) || !/tabindex\s*=/i.test(line)) {
          findings.push({
            category: 'a11y',
            severity: 'warning',
            file: file.path,
            line: lineNum,
            rule: 'a11y/interactive-role',
            message: 'Non-interactive element has click handler but lacks role="button" or tabindex="0".',
            snippet: line.trim(),
            suggestion: 'Use a native <button> or add role="button", tabindex="0", and keyboard event handlers.',
          });
        }
      }

      // 5. Disclosure trigger missing aria-expanded
      if (/(?:data-accordion-trigger|plain-accordion-trigger|plain-dropdown-trigger)/i.test(line)) {
        if (/<button\b/i.test(line) && !/aria-expanded\s*=/i.test(line)) {
          findings.push({
            category: 'a11y',
            severity: 'warning',
            file: file.path,
            line: lineNum,
            rule: 'a11y/disclosure-aria',
            message: 'Interactive disclosure trigger is missing aria-expanded attribute.',
            snippet: line.trim(),
            suggestion: 'Add aria-expanded="false" (or "true") and aria-controls="[id]".',
          });
        }
      }

      // 6. Custom Modal / Dialog without role="dialog"
      if (/<(?:div|section)\b[^>]*(?:class=["'][^"']*\b(?:modal|dialog-container)\b[^"']*["']|data-modal)[^>]*>/i.test(line)) {
        if (!/role\s*=\s*["']dialog["']/i.test(line)) {
          findings.push({
            category: 'a11y',
            severity: 'error',
            file: file.path,
            line: lineNum,
            rule: 'a11y/dialog-role',
            message: 'Custom modal dialog missing role="dialog" or aria-modal="true".',
            snippet: line.trim(),
            suggestion: 'Use the native <dialog> element or add role="dialog" aria-modal="true".',
          });
        }
      }

      // 7. Form controls missing labels
      if (/<input\b(?![^>]*\b(type=["'](hidden|submit|reset|button)["']))[^>]*>/i.test(line)) {
        if (
          !/aria-label\s*=/i.test(line) &&
          !/aria-labelledby\s*=/i.test(line) &&
          !/id\s*=/i.test(line)
        ) {
          findings.push({
            category: 'a11y',
            severity: 'warning',
            file: file.path,
            line: lineNum,
            rule: 'a11y/input-label',
            message: '<input> is missing an id for <label for="..."> association or aria-label.',
            snippet: line.trim(),
            suggestion: 'Associate with a <label for="[id]"> or add aria-label="...".',
          });
        }
      }
    }
  }

  return findings;
}
