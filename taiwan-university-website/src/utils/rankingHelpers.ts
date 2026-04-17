import { schools } from '../data/loaders';
import rankingsData from '../data/rankings-2026.json';

export type SchoolSlugResolver = (nameCht: string) => string | null;

export function buildSchoolSlugResolver(): SchoolSlugResolver {
  const schoolByName = new Map<string, string>();
  for (const s of schools) {
    const slug = s.resolvedSlug || s.slug;
    schoolByName.set(s.name.cht, slug);
    const stripped = s.name.cht.replace(/^天主教/, '').replace(/^學校財團法人/, '');
    if (stripped !== s.name.cht) schoolByName.set(stripped, slug);
  }
  return (nameCht: string) => schoolByName.get(nameCht) || schoolByName.get('天主教' + nameCht) || null;
}

export function sortKey(rank: any): number {
  if (rank == null) return 99999;
  if (typeof rank === 'number') return rank;
  const match = String(rank).match(/^(\d+)/);
  return match ? parseInt(match[1]) : 99998;
}

export const rankings = rankingsData.rankings || [];

export function getQsWorldRows() {
  return [...rankings]
    .filter(r => r.qs_world != null)
    .sort((a, b) => sortKey(a.qs_world) - sortKey(b.qs_world))
    .map(r => ({ name_cht: r.name_cht, name_en: r.name_en, rankValue: r.qs_world }));
}

export function getQsAsiaRows() {
  return [...rankings]
    .filter(r => r.qs_asia != null)
    .sort((a, b) => sortKey(a.qs_asia) - sortKey(b.qs_asia))
    .map(r => ({ name_cht: r.name_cht, name_en: r.name_en, rankValue: r.qs_asia }));
}

export function getTheWorldRows() {
  return [...rankings]
    .filter(r => r.the_world != null)
    .sort((a, b) => sortKey(a.the_world) - sortKey(b.the_world))
    .map(r => ({ name_cht: r.name_cht, name_en: r.name_en, rankValue: r.the_world }));
}

export function getCheersRows() {
  return [...rankings]
    .filter(r => r.cheers != null || r.yuanjian != null)
    .sort((a, b) => sortKey(a.cheers) - sortKey(b.cheers))
    .map(r => ({ name_cht: r.name_cht, name_en: r.name_en, rankValue: r.cheers, secondaryValue: r.yuanjian }));
}
