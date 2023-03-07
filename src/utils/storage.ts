
export function getItem(key: string): string | null {
  return localStorage.getItem(key);
}

export function setItem(key: string, token: string): void {
  localStorage.setItem(key, token);
}

export function removeItem(key: string): void {
  return localStorage.removeItem(key);
}
