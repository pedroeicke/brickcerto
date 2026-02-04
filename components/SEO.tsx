
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
    const siteTitle = 'Brick Certo - Classificados Premium';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const canonicalUrl = canonical || currentUrl.split('?')[0];

    // Default SEO keywords including adult services as requested
    const defaultKeywords = [
        'classificados', 'brick certo', 'comprar', 'vender',
        'garotas de programa', 'acompanhantes', 'massagem', 'massagem nuru',
        'acompanhantes em floripa', 'garotas de programa brasil',
        'imóveis', 'carros', 'empregos'
    ];

    const finalKeywords = keywords.length > 0 ? keywords : defaultKeywords;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={finalKeywords.join(', ')} />
            <link rel="canonical" href={canonicalUrl} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Schema.org for Local Business or Product could go here, passed as a prop */}
        </Helmet>
    );
};

export default SEO;
