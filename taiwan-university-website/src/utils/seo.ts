export interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogType?: string;
}

const SITE_NAME = '台湾大学データベース | 台湾留学101';
const SITE_URL = 'https://db.taiwan101.com';

export function buildTitle(pageTitle: string): string {
  return `${pageTitle} | ${SITE_NAME}`;
}

export function buildCanonical(path: string): string {
  return `${SITE_URL}${path}`;
}
