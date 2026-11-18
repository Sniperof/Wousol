export function createEnquiryLink(
  email: string,
  subject: string,
  label: string,
): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = 'button secondary';
  link.textContent = label;
  link.href = enquiryHref(email, subject);
  return link;
}
export function enquiryHref(email: string, subject: string): string {
  return `mailto:${encodeURIComponent(email).replace('%40', '@')}?subject=${encodeURIComponent(subject)}`;
}
