import Head from 'next/head';

export default function SEO({ title, description, image }) {
  const siteTitle = 'Lilian Boutique - ملابس نساء وأطفال';
  const siteDescription = 'متجر ليليان بوتيك - أفضل متجر لملابس النساء والأطفال في الجزائر. تصاميم عصرية وجودة عالية مع توصيل سريع لجميع الولايات.';
  const siteLogo = '/logo.png';

  return (
    <Head>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || siteDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:image" content={image || siteLogo} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || siteDescription} />
      <meta name="twitter:image" content={image || siteLogo} />
      
      <link rel="icon" href="/logo.png" />
    </Head>
  );
}
