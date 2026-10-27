import {getTranslations} from 'next-intl/server';

export default async function TermsPage({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'legal.terms'});

  return (
    <section className="relative overflow-hidden border-b border-border/70 pt-20 pb-32 sm:pt-24 sm:pb-40 lg:pb-48">
      <div className="container-page relative">
        <article className="max-w-3xl mx-auto prose-alex max-w-none space-y-8">
          <div className="flex flex-col gap-3 max-w-xl">
            <p className="kicker">Términos de uso</p>
            <h1 className="heading-1">Términos de uso</h1>
            <p className="text-xs font-mono text-muted mt-2">
              Última actualización: 2026-10-27 · Versión inicial
            </p>
          </div>

          <p>{t('intro')}</p>
          <h2>{t('useTitle')}</h2>
          <p>{t('useText')}</p>
          <h2>{t('contentTitle')}</h2>
          <p>{t('contentText')}</p>
          <h2>{t('downloadsTitle')}</h2>
          <p>{t('downloadsText')}</p>
          <h2>{t('liabilityTitle')}</h2>
          <p>{t('liabilityText')}</p>
          <h2>{t('changesTitle')}</h2>
          <p>{t('changesText')}</p>
        </article>
      </div>
    </section>
  );
}
