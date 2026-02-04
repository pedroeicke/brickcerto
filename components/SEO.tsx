
import React, { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    keywords?: string[];
    image?: string;
    noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    keywords = [],
    image = '/og-image.jpg',
    noindex = false
}) => {
    const siteTitle = 'Brick Certo - Carros, Acompanhantes, Imóveis e Empregos';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const canonicalUrl = canonical || currentUrl.split('?')[0];

    // Default SEO keywords including specific city combinations
    const defaultKeywords = [
        'classificados', 'brick certo', 'comprar', 'vender',
        'garotas de programa', 'acompanhantes', 'massagem', 'massagem nuru',
        'garota de programa em são paulo', 'garota de programa em rio de janeiro',
        'garota de programa em curitiba', 'garota de programa em belo horizonte',
        'garota de programa em porto alegre', 'garota de programa em brasília',
        'garota de programa em salvador', 'garota de programa em fortaleza',
        'garota de programa em florianópolis', 'garota de programa em recife',
        'acompanhantes em floripa', 'garotas de programa brasil',
        'imóveis', 'carros', 'empregos'
    ];

    const finalKeywords = keywords.length > 0 ? keywords : defaultKeywords;

    useEffect(() => {
        if (typeof document === 'undefined') return;

        const upsertMetaByName = (name: string, content: string) => {
            let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute('name', name);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        const upsertMetaByProperty = (property: string, content: string) => {
            let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute('property', property);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        const upsertLink = (rel: string, href: string) => {
            let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
            if (!el) {
                el = document.createElement('link');
                el.setAttribute('rel', rel);
                document.head.appendChild(el);
            }
            el.setAttribute('href', href);
        };

        document.title = fullTitle;
        upsertMetaByName('description', description);
        upsertMetaByName('keywords', finalKeywords.join(', '));
        upsertLink('canonical', canonicalUrl);

        if (noindex) upsertMetaByName('robots', 'noindex, nofollow');
        else {
            const existing = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
            if (existing) existing.remove();
        }

        upsertMetaByProperty('og:type', 'website');
        upsertMetaByProperty('og:url', canonicalUrl);
        upsertMetaByProperty('og:title', fullTitle);
        upsertMetaByProperty('og:description', description);
        upsertMetaByProperty('og:image', image);

        upsertMetaByProperty('twitter:card', 'summary_large_image');
        upsertMetaByProperty('twitter:url', canonicalUrl);
        upsertMetaByProperty('twitter:title', fullTitle);
        upsertMetaByProperty('twitter:description', description);
        upsertMetaByProperty('twitter:image', image);
    }, [canonicalUrl, description, finalKeywords, fullTitle, image, noindex]);

    return null;
};

export default SEO;
