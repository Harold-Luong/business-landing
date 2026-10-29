export const contactDetails = {
  email: 'ductrong.luongnguyen@gmail.com',
  zalo: { label: '0975 6666 14', href: 'https://zalo.me/0975666614' },
  hotline: { label: '0947787904', number: '+84947787904' },
}

export function emailLink(email: string) {
  const value = email.trim()
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value) ? `mailto:${encodeURIComponent(value)}` : ''
}
