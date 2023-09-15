export const slugToSentence = (slug: string) =>
  slug
    .split(/[_-]/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

export const camelCaseToSnakeCase = (camelStr: string): string =>
  camelStr.replace(/([A-Z])/g, '_$1').toLowerCase();
