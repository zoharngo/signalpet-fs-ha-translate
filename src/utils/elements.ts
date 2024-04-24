export function findTranslatedTags(): HTMLElement[] {
  const translatedTags = document.querySelectorAll('[translate="yes"]');
  return Array.from(translatedTags) as HTMLElement[];
}
