export const truncateDescription = (
  description: string,
  maxLength: number,
  addEllipsis: boolean = true
): string => {
  if (!description) return "";
  if (description.length <= maxLength) return description;

  let truncated = description.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex !== -1 && lastSpaceIndex < maxLength - 1) {
    truncated = truncated.substring(0, lastSpaceIndex);
  }

  return addEllipsis ? `${truncated}...` : truncated;
};
