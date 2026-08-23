import type { RegistryComponent } from '../types/index.js';
import { BUILTIN_COMPONENTS } from '../registry/components.js';

export async function getAvailableComponents(
  registryUrl?: string
): Promise<{ name: string; title: string; description: string; version: string }[]> {
  if (registryUrl && registryUrl.startsWith('http')) {
    try {
      const res = await fetch(`${registryUrl}/index.json`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {
      // Fallback to built-in components catalog
    }
  }

  return BUILTIN_COMPONENTS.map((c) => ({
    name: c.name,
    title: c.title || c.name,
    description: c.description || '',
    version: c.version,
  }));
}

export async function fetchComponent(
  name: string,
  registryUrl?: string
): Promise<RegistryComponent> {
  if (registryUrl && registryUrl.startsWith('http')) {
    try {
      const res = await fetch(`${registryUrl}/r/${name}.json`);
      if (res.ok) {
        const data = await res.json();
        return data as RegistryComponent;
      }
    } catch {
      // Fallback
    }
  }

  const found = BUILTIN_COMPONENTS.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  if (!found) {
    throw new Error(`Component "${name}" was not found in registry.`);
  }

  return found;
}
