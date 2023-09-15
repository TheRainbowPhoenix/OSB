// Given a description in HTML that contains <br> either at start or the end,
// remove those <br> instances so no extra spaces appear in the DOM once rendered.
export const getDescriptionFormatted = (description: string) => {
  try {
    return description.replace(/\r\n/g, '');
  } catch {
    return description;
  }
};
