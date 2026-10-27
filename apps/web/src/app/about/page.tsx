import {getTranslations} from 'next-intl/server';
import {DemoNotice} from '@/components/ui/demo-notice';

export default async function AboutPage({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'about'});

  return (
    <section className="relative overflow-hidden border-b border-border/70 pt-20 pb-32 sm:pt-24 sm:pb-40 lg:pb-48">
      <div className="container-page relative">
        <div className="max-w-3xl mx-auto">
          <p className="kicker">{t('kicker')}</p>
          <h1 className="heading-1 mb-6">{t('title')}</h1>
          <p className="lead mb-10 max-w-2xl">{t('lead')}</p>

          <div className="space-y-10 mb-16">
            <p className="text-lg leading-relaxed text-muted">{t('p1')}</p>
            <p className="text-lg leading-relaxed text-muted">{t('p2')}</p>
            <p className="text-lg leading-relaxed text-muted">{t('p3')}</p>
          </div>

          <div className="space-y-8">
            <h2 className="heading-2 mb-4">{t('valuesTitle')}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {key: 'clarity', title: t('values.clarity.title'), text: t('values.clarity.text')},
                {key: 'craft', title: t('values.craft.title'), text: t('values.craft.text')},
                {key: 'security', title: t('values.security.title'), text: t('values.security.text')},
                {key: 'ai', title: t('values.ai.title'), text: t('values.ai.text')},
              ].map((value) => (
                <div key={value.key} className="card p-6">
                  <h3 className="heading-3 mb-2">{value.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{value.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-surface/90 to-surface/70 p-8 sm:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="heading-2 mb-2">{t('ctaTitle')}</h2>
                <p className="text-sm text-muted">{t('ctaText')}</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 font-semibold text-accent transition-colors hover:bg-accent/20 hover:text-white"
              >
                {t('cta')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
