export function enquiryHref(email: string, subject: string): string {
  return `mailto:${encodeURIComponent(email).replace('%40', '@')}?subject=${encodeURIComponent(subject)}`;
}
