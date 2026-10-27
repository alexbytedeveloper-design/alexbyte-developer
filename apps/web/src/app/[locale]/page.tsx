import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Hero} from '@/components/home/hero';

export default async function LocaleHomePage({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'home'});
  const tMeta = await getTranslations({locale, namespace: 'meta'});

  return (
    <>
      <Hero locale={locale} />

      <section className="relative overflow-hidden border-b border-border/70 pt-20 pb-28 sm:pt-24 sm:pb-32 lg:pb-40">
        <div className="container-page relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between max-w-3xl mx-auto">
            <div className="max-w-xl">
              <p className="kicker">{t('aboutKicker')}</p>
              <h2 className="heading-2">{t('aboutTitle')}</h2>
              <p className="lead mt-4 max-w-2xl">{t('aboutText')}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className={buttonStyles()}
              >
                {t('contactCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
