// --- 型定義 ---

export interface SchoolName {
  cht: string;
  ja: string;
  en: string;
}

export interface Dormitory {
  available: boolean;
  info_cht?: string;
  info_en?: string;
  info_ja?: string;
}

export interface Scholarship {
  available: boolean;
  url?: string;
  info_ja?: string;
}

export interface TuitionItem {
  faculty: string;
  requirement?: string;
  amount: string;
}

export interface StudentCount {
  total?: number;
  foreign?: number;
  japanese?: number;
}

export interface School {
  id: string;
  slug: string;
  resolvedSlug: string;
  name: SchoolName;
  type: string;
  region: string;
  address?: string;
  phone?: string;
  website?: { cht?: string; en?: string };
  dormitory?: Dormitory;
  scholarship?: Scholarship;
  financial_proof?: { amount?: string; jpy_estimate?: string };
  language_req?: { chinese?: string; english?: string };
  ja_description?: string;
  tuition?: TuitionItem[];
  student_count?: StudentCount;
  department_count?: number;
  data_completeness: 'full' | 'enriched' | 'basic';
  data_sources?: string[];
  last_updated?: string;
}

export interface Quota {
  individual_application?: number;
  united_distribution?: {
    total: number;
    s1?: number;
    s2?: number;
    s3?: number;
    s4?: number;
    s5?: number;
  };
}

export interface Department {
  id: string;
  school_id: string;
  slug: string;
  group_id: number;
  name: SchoolName;
  introduction?: { cht?: string; en?: string };
  website?: { cht?: string; en?: string };
  has_eng_taught: boolean;
  required_documents?: string[];
  has_interview: boolean;
  quota?: Quota;
  group_data?: { cht?: string; en?: string };
  ioh_url?: string;
  translation_status?: string;
}

export interface DepartmentGroup {
  id: number;
  slug: string;
  name: SchoolName;
  department_count: number;
}

// --- データ読み込み ---

import schoolsRaw from './schools.json';
import departmentsRaw from './departments.json';
import groupsRaw from './department-groups.json';

// --- スラグ衝突の解決 ---

const slugCounts = new Map<string, number>();
for (const s of schoolsRaw as any[]) {
  slugCounts.set(s.slug, (slugCounts.get(s.slug) || 0) + 1);
}

const regionToEn: Record<string, string> = {
  '台北': 'taipei', '新北': 'newtaipei', '桃園': 'taoyuan', '新竹': 'hsinchu',
  '台中': 'taichung', '彰化': 'changhua', '南投': 'nantou', '嘉義': 'chiayi',
  '台南': 'tainan', '高雄': 'kaohsiung', '屏東': 'pingtung', '花蓮': 'hualien',
  '台東': 'taitung', '宜蘭': 'yilan', '基隆': 'keelung', '金門': 'kinmen',
  '澎湖': 'penghu', '苗栗': 'miaoli', '雲林': 'yunlin',
};

// Build resolved slugs, ensuring uniqueness
function buildResolvedSlugs(rawSchools: any[]): Map<string, string> {
  const result = new Map<string, string>();
  const usedSlugs = new Set<string>();

  // First pass: try region-based disambiguation
  for (const s of rawSchools) {
    let slug = s.slug;
    if ((slugCounts.get(s.slug) || 0) > 1) {
      // Try name hint from ja name (e.g. "銘伝大学(桃園)" → "taoyuan")
      const parenMatch = s.name?.ja?.match(/\(([^)]+)\)/);
      if (parenMatch) {
        const hint = regionToEn[parenMatch[1]] || parenMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '');
        slug = `${s.slug}-${hint}`;
      } else {
        const regionEn = regionToEn[s.region] || s.id;
        slug = `${s.slug}-${regionEn}`;
      }
    }
    // Final uniqueness check — append ID if still collides
    if (usedSlugs.has(slug)) {
      slug = `${s.slug}-${s.id.toLowerCase()}`;
    }
    usedSlugs.add(slug);
    result.set(s.id, slug);
  }
  return result;
}

const resolvedSlugs = buildResolvedSlugs(schoolsRaw as any[]);

// --- エクスポート ---

export const schools: School[] = (schoolsRaw as any[]).map(s => ({
  ...s,
  resolvedSlug: resolvedSlugs.get(s.id) || s.slug,
}));

export const departments: Department[] = departmentsRaw as any[];
export const groups: DepartmentGroup[] = groupsRaw as any[];

// --- インデックス ---

export const schoolBySlug = new Map(schools.map(s => [s.resolvedSlug, s]));
export const schoolById = new Map(schools.map(s => [s.id, s]));

export const deptsBySchool = new Map<string, Department[]>();
for (const d of departments) {
  const list = deptsBySchool.get(d.school_id) || [];
  list.push(d);
  deptsBySchool.set(d.school_id, list);
}

export const deptsByGroup = new Map<number, Department[]>();
for (const d of departments) {
  const list = deptsByGroup.get(d.group_id) || [];
  list.push(d);
  deptsByGroup.set(d.group_id, list);
}

export const groupById = new Map(groups.map(g => [g.id, g]));

// --- ヘルパー ---

export function getSchoolTypeLabel(type: string): string {
  if (type.includes('國立')) return '国立';
  if (type.includes('私立')) return '私立';
  if (type.includes('市立')) return '市立';
  return type;
}

export function isNational(type: string): boolean {
  return type.includes('國立') || type.includes('市立');
}

export function getRegions(): string[] {
  const regions = new Set(schools.map(s => s.region).filter(Boolean));
  return [...regions].sort();
}

export function getSchoolTypes(): string[] {
  const types = new Set(schools.map(s => getSchoolTypeLabel(s.type)));
  return [...types].sort();
}
