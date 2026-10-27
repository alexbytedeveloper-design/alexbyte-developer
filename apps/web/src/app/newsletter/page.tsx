import {getTranslations} from 'next-intl/server';
import {NewsletterForm} from '@/components/forms/newsletter-form';

export default async function NewsletterPage({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'newsletter'});

  return (
    <section className="relative overflow-hidden border-b border-border/70 pt-20 pb-32 sm:pt-24 sm:pb-40 lg:pb-48">
      <div className="container-page relative">
        <div className="max-w-2xl mx-auto text-center">
          <p className="kicker">{t('kicker')}</p>
          <h1 className="heading-1 mb-6">{t('title')}</h1>
          <p className="lead mb-10">{t('subtitle')}</p>

          <div className="grid gap-6 sm:grid-cols-3 text-left">
            {[t('benefits.one'), t('benefits.two'), t('benefits.three')].map((benefit, index) => (
              <div key={index} className="card p-6">
                <span
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface/50 text-accent"
                  aria-hidden
                >
                  ✦
                </span>
                <h3 className="heading-3 mt-4 mb-2">{benefit}</h3>
                <p className="text-sm text-muted">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 card p-8 sm:p-12 shadow-xl">
            <h2 className="heading-2 mb-6">{t('formTitle')}</h2>
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
