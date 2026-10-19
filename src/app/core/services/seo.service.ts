import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  DEFAULT_SEO,
  NOINDEX_PATH_PREFIXES,
  PAGE_SEO,
  SITE_NAME,
  SITE_ORIGIN,
  type PageSeo,
} from '../constants/seo/seo.constants';
import { courseBySlug } from '@features/landing/data/courses';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  /** Escucha navegación y aplica meta/canonical. */
  init(): void {
    this.applyForUrl(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.applyForUrl(event.urlAfterRedirects));
  }

  applyForUrl(rawUrl: string): void {
    const path = this.normalizePath(rawUrl);
    const courseMatch = /^\/cursos\/([^/?#]+)/.exec(path);

    if (courseMatch) {
      const course = courseBySlug(decodeURIComponent(courseMatch[1]));
      if (course) {
        this.apply({
          title: `${course.title} · ${SITE_NAME}`,
          description: course.lead,
          robots: 'index,follow',
          path: `/cursos/${course.slug}`,
          image: course.icon.startsWith('http')
            ? course.icon
            : `${SITE_ORIGIN}${course.icon.replace(/\?.*$/, '')}`,
        });
        return;
      }
    }

    if (this.isNoIndexPath(path)) {
      const legalTitle = this.legalTitle(path);
      this.apply({
        title: legalTitle ?? `Página privada · ${SITE_NAME}`,
        description: DEFAULT_SEO.description,
        robots: 'noindex,nofollow',
        path,
      });
      return;
    }

    const page = PAGE_SEO[path];
    if (page) {
      this.apply({ ...page, path });
      return;
    }

    this.apply({
      title: DEFAULT_SEO.title,
      description: DEFAULT_SEO.description,
      robots: 'index,follow',
      path,
    });
  }

  private apply(input: PageSeo & { path: string; image?: string }): void {
    const canonicalPath = input.path === '/' ? '/' : input.path.replace(/\/$/, '');
    const url = `${SITE_ORIGIN}${canonicalPath === '/' ? '' : canonicalPath}`;
    const image = input.image ?? DEFAULT_SEO.image;

    this.title.setTitle(input.title);
    this.setMeta('description', input.description);
    this.setMeta('robots', input.robots);
    this.setMeta('author', SITE_NAME);
    this.setMeta('language', 'Spanish');

    this.setMeta('og:type', 'website', 'property');
    this.setMeta('og:site_name', SITE_NAME, 'property');
    this.setMeta('og:locale', DEFAULT_SEO.locale, 'property');
    this.setMeta('og:title', input.title, 'property');
    this.setMeta('og:description', input.description, 'property');
    this.setMeta('og:url', url, 'property');
    this.setMeta('og:image', image, 'property');

    this.setMeta('twitter:card', 'summary_large_image');
    this.setMeta('twitter:title', input.title);
    this.setMeta('twitter:description', input.description);
    this.setMeta('twitter:image', image);

    this.setCanonical(url);
    this.document.documentElement.lang = 'es';
  }

  private setMeta(name: string, content: string, attr: 'name' | 'property' = 'name'): void {
    if (attr === 'property') {
      this.meta.updateTag({ property: name, content });
      return;
    }
    this.meta.updateTag({ name, content });
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private normalizePath(rawUrl: string): string {
    const withoutQuery = rawUrl.split('?')[0] ?? rawUrl;
    const withoutHash = withoutQuery.split('#')[0] ?? withoutQuery;
    if (!withoutHash || withoutHash === '') {
      return '/';
    }
    return withoutHash.startsWith('/') ? withoutHash : `/${withoutHash}`;
  }

  private isNoIndexPath(path: string): boolean {
    return NOINDEX_PATH_PREFIXES.some(
      (prefix) => path === prefix || path.startsWith(`${prefix}/`),
    );
  }

  private legalTitle(path: string): string | null {
    if (path.startsWith('/legal/terminos')) {
      return `Términos de uso · ${SITE_NAME}`;
    }
    if (path.startsWith('/legal/privacidad')) {
      return `Política de privacidad · ${SITE_NAME}`;
    }
    if (path.startsWith('/legal/cookies')) {
      return `Política de cookies · ${SITE_NAME}`;
    }
    if (path.startsWith('/legal')) {
      return `Aviso legal · ${SITE_NAME}`;
    }
    if (path.startsWith('/acceso') || path.startsWith('/login')) {
      return `Acceso · ${SITE_NAME}`;
    }
    return null;
  }
}
