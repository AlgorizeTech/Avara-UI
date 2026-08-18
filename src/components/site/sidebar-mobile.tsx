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
  slug: string;
  badge?: string;
  children?: MenuItem[];
}

// Transform the existing navigation data to match our new MenuItem interface
const transformNavigation = (): MenuItem[] => {
  return navigation.map(section => ({
    label: section.label,
    slug: section.children[0]?.slug ?? '',
    children: section.children.map(child => ({
      label: child.label,
      slug: child.slug,
      badge: child.badge,
    })),
  }));
};

const menuData = transformNavigation();

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
          'flex items-center justify-between py-1 text-sm transition-colors cursor-pointer relative',
          isNested ? 'pl-6' : 'font-medium',
          isActive || hasActiveChild
            ? 'text-zinc-900 dark:text-white'
            : isNested
              ? 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              : 'text-zinc-500 dark:text-white/80 hover:text-zinc-900 dark:hover:text-white/90'
        )}
      >
        <span className="flex items-center gap-2">
          {/* Active indicator dot for main section links */}
          {!isNested && (isActive || hasActiveChild) && (
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1 flex-shrink-0" />
          )}
          {!isNested && item.children && (
            <span>
              {isOpen ? (
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              )}
            </span>
          )}
          {isNested && (
            <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 mr-2"></span>
          )}
          {item.label}
          {item.badge && (
            <span
              className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full ml-1.5',
                item.badge === 'New'
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : item.badge === 'Updated'
                    ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
              )}
            >
              {item.badge}
            </span>
          )}
        </span>
      </div>

      {item.children && isOpen && (
        <ul
          className={cn(
            'mt-0.5 space-y-0.5',
            isNested ? 'pl-2' : 'ml-4 border-l border-zinc-100 dark:border-zinc-800 mt-0.5 relative'
          )}
        >
          {item.children.map((child, index) => {
            const isChildActive = currentSlug === child.slug;

            return isNested ? (
              <MenuItem key={index} item={child} isNested onClose={onClose} />
            ) : (
              <li key={child.slug} className="relative py-0 pl-4">
                <div className="flex items-center">
                  {/* Active indicator dot for child links */}
                  {isChildActive && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
                  )}
                  <Link
                    href={docsHref(framework, child.slug)}
                    onClick={onClose}
                    className={cn(
                      'block py-1 text-sm',
                      isChildActive
                        ? 'text-blue-600 dark:text-blue-400 font-medium'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    )}
                    aria-current={isChildActive ? 'page' : undefined}
                  >
                    {child.label}
                  </Link>
                  {child.badge && (
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded-full ml-1.5',
                        child.badge === 'New'
                          ? 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400'
                          : child.badge === 'Updated'
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
                      )}
                    >
                      {child.badge}
                    </span>
                  )}
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
    <aside className="w-full h-[calc(100%-60px)] sticky top-[60px] border-t border-zinc-100 dark:border-zinc-800 overflow-visible">
      <ScrollArea className="h-full w-full">
        <div className="py-6 px-6 relative overflow-visible">
          {/* Same control, same position as desktop. onNavigate closes the sheet:
              leaving it open over the newly loaded page hides the very content
              the reader switched to see. */}
          <FrameworkSwitcher onNavigate={onClose} className="mb-5" />

          <nav role="navigation" aria-label="Documentation navigation">
            <ul className="space-y-1 relative">
              {menuData.map((item, index) => (
                <MenuItem key={index} item={item} onClose={onClose} />
              ))}
            </ul>
          </nav>

          <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center">
              {/* Active indicator dot for Getting Started Guide - inline */}
              {currentSlug === 'index' && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
              )}
              <Link
                href={docsHref(framework, 'index')}
                className={cn(
                  'block py-1.5 text-sm',
                  currentSlug === 'index'
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
                )}
                onClick={onClose}
              >
                Getting Started Guide
              </Link>
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
