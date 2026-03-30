export function formatNTD(amount: string | undefined): string {
  if (!amount) return '—';
  return amount.replace(/NT\$?\s?/, 'NT$');
}

export function formatPhone(phone: string | undefined): string {
  if (!phone) return '—';
  return phone.replace('886-', '+886-');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
}
