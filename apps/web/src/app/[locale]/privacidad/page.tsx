import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {buttonStyles} from '@/components/ui/button';
import {DemoNotice} from '@/components/ui/demo-notice';

export async function generateMetadata({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'meta'});
  return {
    title: t('privacy.title'),
    description: t('privacy.description'),
    alternates: {
      canonical: `https://alexbyte.dev/es/privacidad`,
      languages: {
        es: 'https://alexbyte.dev/es/privacidad',
        en: 'https://alexbyte.dev/en/privacy',
        pt: 'https://alexbyte.dev/pt/privacidade',
        fr: 'https://alexbyte.dev/fr/confidentialite',
        it: 'https://alexbyte.dev/it/privacy',
        'x-default': 'https://alexbyte.dev/en/privacy',
      },
    },
  };
}

export default async function PrivacyPage({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'legal'});
  const tPrivacy = await getTranslations({
    locale,
    namespace: 'legal.privacy',
  });

  return (
    <section className="relative overflow-hidden border-b border-border/70 pt-20 pb-32 sm:pt-24 sm:pb-40 lg:pb-48">
      <div className="container-page relative">
        <article className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-3 max-w-xl">
            <p className="kicker">{t('privacy.intro')}</p>
            <h1 className="heading-1">Política de privacidad</h1>
            <p className="text-xs font-mono text-muted mt-2">
              {t('lastUpdated', {date: '2026-10-27'})} ·
              <span className="text-accent">Versión inicial</span>
            </p>
          </div>

          <div className="mt-10 prose-alex max-w-none">
            <h2>{tPrivacy('dataTitle')}</h2>
            <p>{tPrivacy('dataText')}</p>

            <h2>{tPrivacy('purposeTitle')}</h2>
            <p>{tPrivacy('purposeText')}</p>

            <h2>{tPrivacy('rightsTitle')}</h2>
            <p>{tPrivacy('rightsText')}</p>

            <h2>{tPrivacy('contactTitle')}</h2>
            <p>{tPrivacy('contactText')}</p>
          </div>

          <p className="mt-10 text-xs text-muted">
            {t('draftNotice')}
          </p>
        </article>
      </div>

      <DemoNotice text="Página de ejemplo: el contenido legal se completará antes del lanzamiento público." />
    </section>
  );
}
