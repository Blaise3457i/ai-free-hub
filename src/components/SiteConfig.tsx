import { useEffect } from 'react';

export function SiteConfig() {
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings');
        if (response.ok) {
          const data = await response.json();
          const settings: Record<string, string> = {};
          data.forEach((s: any) => settings[s.key] = s.value);

          if (settings.site_title) {
            document.title = settings.site_title;
          }
          
          if (settings.meta_description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
              metaDesc = document.createElement('meta');
              metaDesc.setAttribute('name', 'description');
              document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', settings.meta_description);
          }

          if (settings.meta_keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
              metaKeywords = document.createElement('meta');
              metaKeywords.setAttribute('name', 'keywords');
              document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', settings.meta_keywords);
          }
        }
      } catch (err) {
        console.error('Failed to fetch site settings', err);
      }
    };

    fetchSettings();
  }, []);

  return null;
}
