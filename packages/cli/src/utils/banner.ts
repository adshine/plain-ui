import pc from 'picocolors';

export function getBanner(): string {
  const art = `
   ___  __       _        __  ______
  / _ \/ /___ _ (_)__    / / / /  _/
 / ___/ / _ \/ / / _ \  / /_/ // /  
/_/  /_/\_,_/_/_/_//_/  \____/___/  
`;

  const title = pc.bold(pc.cyan('  Plain UI CLI')) + pc.dim(' — Zero-dependency, headless UI engine');
  const divider = pc.dim('  ────────────────────────────────────────────────────────────');

  return pc.cyan(art) + '\n' + title + '\n' + divider + '\n';
}

export function printBanner(): void {
  console.log(getBanner());
}
