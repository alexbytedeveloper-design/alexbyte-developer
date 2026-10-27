import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/ui/icons';
import {buttonStyles} from '@/components/ui/button';

export default async function NotFound({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'notFound'});
  const tNav = await getTranslations({locale, namespace: 'nav'});

  return (
    <main className="flex-grow pt-20 pb-24">
      <div className="container-page text-center">
        <div className="inline-flex size-24 items-center justify-center rounded-full border border-accent/20 bg-accent/5 mb-6 text-accent">
          <span className="text-6xl">{t('code')}</span>
        </div>
        <h1 className="heading-1 mb-4">{t('title')}</h1>
        <p className="lead mb-10 max-w-xl mx-auto">{t('text')}</p>
        <Link
          href="/"
          className={buttonStyles()}
        >
          {t('cta')}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </main>
  );
}
