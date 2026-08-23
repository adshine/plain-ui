import pc from 'picocolors';

export const logger = {
  info(...messages: unknown[]) {
    console.log(pc.blue('ℹ'), ...messages);
  },
  success(...messages: unknown[]) {
    console.log(pc.green('✔'), ...messages);
  },
  warn(...messages: unknown[]) {
    console.log(pc.yellow('⚠'), ...messages);
  },
  error(...messages: unknown[]) {
    console.error(pc.red('✖'), ...messages);
  },
  step(step: string, ...messages: unknown[]) {
    console.log(pc.cyan('◆ ' + step), ...messages);
  },
  break() {
    console.log('');
  },
  highlight(text: string) {
    return pc.cyan(pc.bold(text));
  },
  bold(text: string) {
    return pc.bold(text);
  },
  dim(text: string) {
    return pc.dim(text);
  },
  green(text: string) {
    return pc.green(text);
  },
  red(text: string) {
    return pc.red(text);
  },
  yellow(text: string) {
    return pc.yellow(text);
  },
  cyan(text: string) {
    return pc.cyan(text);
  },
};
