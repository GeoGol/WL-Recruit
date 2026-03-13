export const getUniqueOptions = <T extends object, K extends keyof T>(
    data: T[] | undefined,
    idKey: K,
    labelKey?: K
) => {
  if (!data) return [];

  if (!data.every(item => idKey in item)) {
    return undefined;
  }

  const map = new Map<string | number, { value: string | number; label: string }>();

  data.forEach(item => {
    const value = item[idKey];
    
    // Skip if value is undefined, null, or not string/number
    if (value === undefined || value === null) return;
    if (typeof value !== 'string' && typeof value !== 'number') return;
    
    if (!map.has(value)) {
      map.set(value, {
        value,
        label: labelKey ? String(item[labelKey]) : String(value)
      });
    }
  });

  return Array.from(map.values());
};