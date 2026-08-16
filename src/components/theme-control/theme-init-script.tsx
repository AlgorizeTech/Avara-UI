import {
  COLOR_TOKENS,
  THEME_CUSTOMIZER_STORAGE_KEY,
} from "@/lib/theme-presets";

/**
 * Blocking script that applies the persisted theme before the first paint.
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
 * Kept deliberately dependency-free and wrapped in try/catch — a throw here
 * would block parsing of the rest of the document.
 */
export function ThemeInitScript() {
  const script = `(function(){try{
var d=document.documentElement,s=d.style;
var t=localStorage.getItem("theme")||"dark";
var m=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;
if(m!=="dark"&&m!=="light")m="dark";
if(m==="dark")d.classList.add("dark");else d.classList.remove("dark");
s.colorScheme=m;
var raw=localStorage.getItem(${JSON.stringify(THEME_CUSTOMIZER_STORAGE_KEY)});
if(raw){var v=JSON.parse(raw)||{},c=(v.colors||{})[m];
if(c){var k=${JSON.stringify(COLOR_TOKENS)};for(var i=0;i<k.length;i++){if(c[k[i]])s.setProperty("--"+k[i],c[k[i]]);}}
if(typeof v.radius==="number")s.setProperty("--radius",v.radius+"rem");}
var fs=localStorage.getItem("fontSize");if(fs)s.fontSize=fs+"%";
var dir=localStorage.getItem("dir");if(dir==="rtl"||dir==="ltr")d.setAttribute("dir",dir);
}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
