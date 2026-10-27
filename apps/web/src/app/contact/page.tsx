import {getTranslations} from 'next-intl/server';
import {ContactForm} from '@/components/forms/contact-form';

export default async function ContactPage({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'contact'});

  return (
    <section className="relative overflow-hidden border-b border-border/70 pt-20 pb-32 sm:pt-24 sm:pb-40 lg:pb-48">
      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] max-w-4xl mx-auto">
          <div>
            <p className="kicker">{t('kicker')}</p>
            <h1 className="heading-1 mb-6">{t('title')}</h1>
            <p className="lead mb-8">{t('subtitle')}</p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="size-5 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary">
                    @
                  </span>
                  <div>
                    <span className="block font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                      {t('emailLabel')}
                    </span>
                    <a href="mailto:hola@alexbyte.dev" className="text-sm text-text">
                      hola@alexbyte.dev
                    </a>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="size-5 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary">
                    ⟳
                  </span>
                  <div>
                    <span className="block font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                      {t('availability')}
                    </span>
                    <p className="text-sm text-muted">{t('responseTime')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 card p-6">
              <h3 className="heading-3 mb-4">{t('socialTitle')}</h3>
              <p className="text-sm text-muted mb-5">También estoy en redes oficiales y por correo directo.</p>
            </div>
          </div>

          <div className="card p-8 sm:p-12 shadow-xl">
            <h2 className="heading-2 mb-6">{t('formTitle')}</h2>
            <ContactForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
