"use client";

import { useEffect } from "react";

export function VerifyBadgeDocsUpdater() {
  useEffect(() => {
    const handle = (e: any) => {
      const { color, size, animate } = e.detail;
      const codeBlock = document.querySelector("#verify-badge-docs code");
      if (!codeBlock) return;
      
      // Get the original HTML (we rely on the fact that the initial render has color="#1d9bf0", size="lg", animate={true})
      // But since it might have been updated already, we use regex to find the current values
      
      let html = codeBlock.innerHTML;
      
      // 1. Replace Hex Color
      // We look for a hex color surrounded by quotes to avoid replacing inline syntax highlighter styles like style="color: #FFF"
      html = html.replace(/((?:["']|&quot;|&#34;|&#x22;)(?:<[^>]+>)*)(#[a-fA-F0-9]{3,6})((?:<[^>]+>)*(?:["']|&quot;|&#34;|&#x22;))/g, `$1${color}$3`);
      
      // 2. Replace Size
      // We look for sm, md, lg, xl surrounded by quotes (handling HTML entities and span tags in between)
      html = html.replace(/((?:["']|&quot;|&#34;|&#x22;)(?:<[^>]+>)*)(sm|md|lg|xl)((?:<[^>]+>)*(?:["']|&quot;|&#34;|&#x22;))/g, `$1${size}$3`);
      
      // 3. Replace Animate
      // We look for true or false surrounded by curly braces {true}
      html = html.replace(/(\{(?:<[^>]+>)*)(true|false)((?:<[^>]+>)*\})/g, `$1${animate ? "true" : "false"}$3`);
      
      codeBlock.innerHTML = html;
    };
    
    window.addEventListener("verify-badge-change", handle);
    return () => window.removeEventListener("verify-badge-change", handle);
  }, []);

  return null;
}
