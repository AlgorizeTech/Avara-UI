'use client';
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/site/scroll-area';
import { FrameworkSwitcher } from '@/components/site/framework-switcher';
import { navigation } from '@/constants/navigation';
import { docsHref, frameworkFromPathname, slugFromPathname } from '@/lib/framework';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Custom hook for static export compatibility
const useCurrentPath = () => {
  const [currentPath, setCurrentPath] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // For static exports, use window.location.pathname
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      // Remove trailing slash for consistency
      setCurrentPath(path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path);
    }
  }, [pathname]);

  // Fallback to usePathname for development, also normalize
  const normalizedPathname =
    pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  return currentPath || normalizedPathname;
};

interface MenuItem {
  label: string;
  /** Path below the framework segment. Composed into an href at render time. */
  slug?: string;
  href?: string;
  badge?: string;
  children?: MenuItem[];
}

// Transform the existing navigation data to match our new MenuItem interface
const transformNavigation = (): MenuItem[] => {
  return navigation.map(section => ({
    label: section.label,
    slug: section.children[0]?.slug ?? '',
    children: section.children.map(child => {
      const isExcludedBadge =
        child.badge && ['new', 'updated'].includes(child.badge.trim().toLowerCase());
      return {
        label: child.label,
        slug: child.slug,
        badge: isExcludedBadge ? undefined : child.badge,
      };
    }),
  }));
};

const menuData = transformNavigation();

// Mirrors the desktop sidebar: badges are accent tints, whatever they say.
const BADGE = 'text-[9px] font-bold uppercase tracking-wider leading-none px-1.5 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/30 ml-1.5';

const MenuItem: React.FC<{ item: MenuItem; isNested?: boolean; onClose: () => void }> = ({
  item,
  isNested = false,
  onClose,
}) => {
  const pathName = useCurrentPath();
  const framework = frameworkFromPathname(pathName);
  const currentSlug = slugFromPathname(pathName);
  const [isOpen, setIsOpen] = useState(true);
  // Slug comparison, never href — see the note in sidebar.tsx.
  const isActive = currentSlug === item.slug;
  const hasActiveChild = item.children?.some(child => currentSlug === child.slug);

  const handleClick = (e: React.MouseEvent) => {
    if (item.children) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <li>
      <div
        onClick={handleClick}
        className={cn(
          'flex items-center justify-between transition-colors cursor-pointer relative select-none',
          // Top level is a group label (11px uppercase, ink 35%); nested rows
          // are ordinary items (13px, ink 55%) — the desktop sidebar's scale.
          isNested
            ? cn(
                'pl-6 min-h-8 py-[0.35rem] pr-2 rounded-md text-[13px]',
                isActive || hasActiveChild
                  ? 'text-primary font-medium'
                  : 'text-foreground/55 hover:text-foreground'
              )
            : cn(
                'mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]',
                hasActiveChild ? 'text-foreground/60' : 'text-foreground/35 hover:text-foreground/60'
              )
        )}
      >
        <span className="flex items-center gap-1.5">
          {!isNested && item.children && (
            <span>
              {isOpen ? (
                <ChevronDown className="w-3 h-3 opacity-70" />
              ) : (
                <ChevronRight className="w-3 h-3 opacity-70" />
              )}
            </span>
          )}
          {isNested && (
            <span className="w-1 h-1 rounded-full bg-foreground/30 mr-2"></span>
          )}
          {item.label}
          {item.badge && <span className={BADGE}>{item.badge}</span>}
        </span>
      </div>

      {item.children && isOpen && (
        <ul
          className={cn(
            'space-y-0.5',
            isNested ? 'pl-2' : 'ml-1.5 border-l border-foreground/[0.06] relative'
          )}
        >
          {item.children.map((child, index) => {
            const isChildActive = currentSlug === child.slug;

            return isNested ? (
              <MenuItem key={index} item={child} isNested onClose={onClose} />
            ) : (
              <li key={child.slug} className="relative pl-3">
                <div className="flex items-center">
                  {/* Active state is the accent colour alone — no filled
                      background, no dot — as in the desktop sidebar. */}
                  <Link
                    href={child.href || docsHref(framework, child.slug || "")}
                    onClick={onClose}
                    className={cn(
                      'flex items-center min-h-8 py-[0.35rem] pr-2 rounded-md text-[13px] transition-colors',
                      isChildActive
                        ? 'text-primary font-medium'
                        : 'text-foreground/55 hover:text-foreground'
                    )}
                    aria-current={isChildActive ? 'page' : undefined}
                  >
                    {child.label}
                  </Link>
                  {child.badge && <span className={BADGE}>{child.badge}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export const SidebarMobile = ({ onClose }: { onClose: () => void }) => {
  const currentPath = useCurrentPath();
  const framework = frameworkFromPathname(currentPath);
  const currentSlug = slugFromPathname(currentPath);

  return (
    <aside className="w-full h-[calc(100%-60px)] sticky top-[60px] overflow-visible">
      <ScrollArea className="h-full w-full">
        <div className="py-6 px-6 relative overflow-visible">
          {/* Same control, same position as desktop. onNavigate closes the sheet:
              leaving it open over the newly loaded page hides the very content
              the reader switched to see. */}
          <FrameworkSwitcher onNavigate={onClose} className="mb-5" />

          <nav role="navigation" aria-label="Documentation navigation">
            <ul className="space-y-5 relative">
              {menuData.map((item, index) => (
                <MenuItem key={index} item={item} onClose={onClose} />
              ))}
            </ul>
          </nav>

          <div className="mt-6 pt-3 border-t border-foreground/[0.06]">
            <div className="flex items-center">
              <Link
                href={docsHref(framework, 'index')}
                className={cn(
                  'flex items-center min-h-8 py-[0.35rem] pr-2 rounded-md text-[13px] transition-colors',
                  currentSlug === 'index'
                    ? 'text-primary font-medium'
                    : 'text-foreground/55 hover:text-foreground'
                )}
                aria-current={currentSlug === 'index' ? 'page' : undefined}
                onClick={onClose}
              >
                Getting Started Guide
              </Link>
            </div>
            <Link
              href={docsHref(framework, 'mcp')}
              className={cn(
                'flex items-center min-h-8 py-[0.35rem] pr-2 rounded-md text-[13px] transition-colors',
                currentSlug === 'mcp'
                  ? 'text-primary font-medium'
                  : 'text-foreground/55 hover:text-foreground'
              )}
              aria-current={currentSlug === 'mcp' ? 'page' : undefined}
              onClick={onClose}
            >
              MCP Server
            </Link>
            {/* A plain anchor: /llms.txt is a text route, not a docs page. */}
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center min-h-8 py-[0.35rem] pr-2 rounded-md text-[13px] text-foreground/55 hover:text-foreground transition-colors"
              onClick={onClose}
            >
              llms.txt
            </a>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
