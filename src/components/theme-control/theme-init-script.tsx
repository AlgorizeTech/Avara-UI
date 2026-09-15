import {
  COLOR_TOKENS,
  FONT_FAMILY_STORAGE_KEY,
  THEME_CUSTOMIZER_STORAGE_KEY,
} from "@/lib/theme-presets";

/**
 * Blocking script that applies the persisted theme before the first paint.
 *
 * With no stored choice it falls back to "system", matching the provider's
 * defaultTheme, so a first-time reader on a light-mode OS gets light and
 * everyone else gets dark — resolved here rather than after hydration.
 *
 * Without it the page paints with the defaults from globals.css, then
 * ThemeCustomizerProvider's mount effect injects the stored palette — the user
 * sees the default theme flash into their own colors on every reload.
 *
 * This must stay a plain <script> in <head> with no `defer`/`async`: the browser
 * pauses parsing to run it, so the custom properties are on <html> before any
 * pixels exist. Inline styles beat both `:root` and `.dark`, so it does not
 * matter that next-themes' own script runs later.
 *
 * The font override is handled here too: the site default is Cooper, and a
 * reader who picked a Google font would otherwise see Cooper flash into their
 * choice on every reload. Setting --font-sans and starting the stylesheet
 * download this early means the swap happens before (or at) first paint. The
 * <link> id and URL shape must match loadGoogleFont in use-google-fonts.ts,
 * which reuses this element rather than creating a second one.
 *
 * Kept deliberately dependency-free and wrapped in try/catch — a throw here
 * would block parsing of the rest of the document.
 */
export function ThemeInitScript() {
  const script = `(function(){try{
var d=document.documentElement,s=d.style;
var sys=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
var t=localStorage.getItem("theme")||"system";
var m=t==="system"?sys:t;
if(m!=="dark"&&m!=="light")m=sys;
if(m==="dark")d.classList.add("dark");else d.classList.remove("dark");
s.colorScheme=m;
var raw=localStorage.getItem(${JSON.stringify(THEME_CUSTOMIZER_STORAGE_KEY)});
if(raw){var v=JSON.parse(raw)||{},c=(v.colors||{})[m];
if(c){var k=${JSON.stringify(COLOR_TOKENS)};for(var i=0;i<k.length;i++){if(c[k[i]])s.setProperty("--"+k[i],c[k[i]]);}}
if(typeof v.radius==="number")s.setProperty("--radius",v.radius+"rem");}
var fs=localStorage.getItem("fontSize");if(fs)s.fontSize=fs+"%";
var ff=localStorage.getItem(${JSON.stringify(FONT_FAMILY_STORAGE_KEY)});
if(ff){s.setProperty("--font-sans",'"'+ff+'", sans-serif');
var l=document.createElement("link");l.id="dynamic-google-font";l.rel="stylesheet";
l.href="https://fonts.googleapis.com/css2?family="+ff.replace(/ /g,"+")+":wght@400;500;600;700&display=swap";
document.head.appendChild(l);}
var dir=localStorage.getItem("dir");if(dir==="rtl"||dir==="ltr")d.setAttribute("dir",dir);
}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
