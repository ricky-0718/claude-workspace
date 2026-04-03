import type { School, Department, DepartmentGroup } from '../data/loaders';

const SITE_URL = 'https://db.ryugaku101.com';

const ORGANIZATION = {
  '@type': 'Organization',
  name: '台湾留学101センター',
  url: 'https://ryugaku101.com',
};

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '台湾大学データベース',
    alternateName: 'Taiwan University Database',
    url: SITE_URL,
    description: '台湾全129大学・2,371学科を日本語で検索。学費・奨学金・寮・ランキング情報を比較できます。',
    inLanguage: 'ja',
    publisher: ORGANIZATION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildSchoolSchema(school: School) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: school.name.ja,
    alternateName: [school.name.en, school.name.cht],
    url: `${SITE_URL}/universities/${school.resolvedSlug}/`,
    address: {
      '@type': 'PostalAddress',
      addressRegion: school.region,
      addressCountry: 'TW',
    },
  };

  if (school.website?.en) schema.sameAs = [school.website.en];
  if (school.website?.cht) {
    schema.sameAs = schema.sameAs || [];
    schema.sameAs.push(school.website.cht);
  }

  if (school.image?.url) {
    schema.image = school.image.url;
  }

  if (school.student_count?.total) {
    schema.numberOfStudents = school.student_count.total;
  }

  if (school.ja_description) {
    schema.description = school.ja_description.slice(0, 300);
  }

  return schema;
}

export function buildDepartmentSchema(dept: Department, school: School) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: dept.name.ja,
    alternateName: [dept.name.en, dept.name.cht],
    url: `${SITE_URL}/universities/${school.resolvedSlug}/departments/${dept.id}/`,
    provider: {
      '@type': 'EducationalOrganization',
      name: school.name.ja,
      url: `${SITE_URL}/universities/${school.resolvedSlug}/`,
    },
    inLanguage: dept.has_eng_taught ? ['zh-TW', 'en'] : 'zh-TW',
    availableLanguage: dept.has_eng_taught ? ['中国語', '英語'] : '中国語',
  };

  if (dept.introduction?.en || dept.introduction?.cht) {
    schema.description = (dept.introduction.en || dept.introduction.cht || '').slice(0, 300);
  }

  if (dept.intro_collego) {
    schema.about = dept.intro_collego.slice(0, 200);
  }

  return schema;
}

export function buildBreadcrumbSchema(items: { label: string; href?: string }[], currentPath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: SITE_URL,
      },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
      })),
    ],
  };
}

export function buildItemListSchema(label: string, items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: label,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 100).map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}
