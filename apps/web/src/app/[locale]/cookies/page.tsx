import {getTranslations} from 'next-intl/server';

export default async function CookiesPage({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'legal.cookies'});

  return (
    <section className="relative overflow-hidden border-b border-border/70 pt-20 pb-32 sm:pt-24 sm:pb-40 lg:pb-48">
      <div className="container-page relative">
        <article className="max-w-3xl mx-auto prose-alex max-w-none space-y-8">
          <div className="flex flex-col gap-3 max-w-xl">
            <p className="kicker">Cookies</p>
            <h1 className="heading-1">Cookies</h1>
            <p className="text-xs font-mono text-muted mt-2">
              Última actualización: 2026-10-27 · Versión inicial
            </p>
          </div>

          <p>{t('intro')}</p>
          <h2>{t('necessaryTitle')}</h2>
          <p>{t('necessaryText')}</p>
          <h2>{t('analyticsTitle')}</h2>
          <p>{t('analyticsText')}</p>
          <h2>{t('manageTitle')}</h2>
          <p>{t('manageText')}</p>
          <h2>{t('contactTitle')}</h2>
          <p>{t('contactText')}</p>
        </article>
      </div>
    </section>
  );
}
