<script setup lang="ts">
import { emailGuideMeta } from '~~/shared/site'
import { emailGuide, emailGuideSources } from '~/data/email-guide'
import exampleCode from '~~/public/resources/send-approved-emails.gs?raw'

const { locale } = useLocale()
const guide = computed(() => emailGuide[locale.value])
const ready = ref(false)
const copyState = ref<'idle' | 'copied' | 'failed'>('idle')
const copyFeedback = computed(() => copyState.value === 'idle' ? '' : guide.value[copyState.value === 'copied' ? 'copied' : 'copyFailed'])
onMounted(() => { ready.value = true })
async function copyCode() {
  try {
    await navigator.clipboard.writeText(exampleCode)
    copyState.value = 'copied'
  } catch {
    copyState.value = 'failed'
  }
}
useSiteSeo(emailGuideMeta)
definePageMeta({ layout: 'service' })
</script>

<template>
  <main id="noi-dung" class="email-guide">
    <header class="detail-intro">
      <div class="container">
        <nav class="breadcrumb" :aria-label="$t('services.hero.breadcrumb')">
          <NuxtLink :to="$localePath('/')">{{ $t('services.hero.home') }}</NuxtLink>
          <span aria-hidden="true">/</span><span>{{ $t('resources.label') }}</span>
        </nav>
        <div class="guide-intro">
          <p class="eyebrow">{{ $t('resources.label') }}</p>
          <h1>{{ $t(emailGuideMeta.name) }}</h1>
          <p class="guide-byline">{{ guide.author }}</p>
          <p class="guide-lead">{{ guide.intro }}</p>
          <div class="guide-actions">
            <a class="button" href="/resources/email-queue.csv" download>{{ guide.download }} <span aria-hidden="true">↓</span></a>
            <a class="text-link" href="#ma-mau">{{ guide.jumpToCode }} <span aria-hidden="true">↓</span></a>
          </div>
          <p class="guide-summary">{{ guide.summary }}</p>
        </div>
      </div>
    </header>
    <div class="container guide-layout">
      <nav class="guide-toc" :aria-label="guide.contents">
        <p class="eyebrow">{{ guide.contents }}</p>
        <ol><li v-for="section in guide.sections" :key="section.id"><a :href="`#${section.id}`">{{ section.title }}</a></li></ol>
      </nav>
      <article class="guide-body" :aria-label="$t(emailGuideMeta.name)">
        <section v-for="(section, index) in guide.sections" :id="section.id" :key="section.id" :aria-labelledby="`${section.id}-title`">
          <h2 :id="`${section.id}-title`">{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <div v-if="index === 0" class="guide-table-wrap">
            <table>
              <caption>{{ guide.columnsTitle }}</caption>
              <thead><tr><th scope="col">{{ guide.columnHeader }}</th><th scope="col">{{ guide.meaningHeader }}</th></tr></thead>
              <tbody><tr v-for="[column, meaning] in guide.columns" :key="column"><th scope="row"><code>{{ column }}</code></th><td>{{ meaning }}</td></tr></tbody>
            </table>
          </div>
        </section>
        <section id="ma-mau" aria-labelledby="guide-code-title">
          <h2 id="guide-code-title">{{ guide.codeTitle }}</h2>
          <p>{{ guide.codeIntro }}</p>
          <div class="guide-actions">
            <a class="button button-outline" href="/resources/send-approved-emails.gs" download>{{ guide.downloadCode }} <span aria-hidden="true">↓</span></a>
            <button v-if="ready" class="button" type="button" @click="copyCode">{{ guide.copyCode }}</button>
          </div>
          <p class="copy-feedback" role="status" aria-live="polite">{{ copyFeedback }}</p>
          <details class="guide-code">
            <summary>{{ guide.showCode }}</summary>
            <pre tabindex="0" role="region" :aria-label="guide.codeLabel"><code>{{ exampleCode }}</code></pre>
          </details>
        </section>
        <section aria-labelledby="guide-sources-title">
          <h2 id="guide-sources-title">{{ guide.sourcesTitle }}</h2>
          <p>{{ guide.quotaNote }}</p>
          <ul class="guide-sources"><li v-for="(url, index) in emailGuideSources" :key="url"><a :href="url">{{ guide.sourceLabels[index] }}</a></li></ul>
          <NuxtLink class="guide-service-link" :to="$localePath('/dich-vu/google-apps-script/')">{{ guide.serviceLink }}</NuxtLink>
        </section>
      </article>
    </div>
    <section class="container detail-cta" aria-labelledby="tu-van">
      <div><h2 id="tu-van">{{ guide.ctaTitle }}</h2><p>{{ guide.ctaText }}</p></div>
      <NuxtLink class="button" :to="$localePath('/?plan=apps-script#lien-he')">{{ guide.ctaLink }} <span aria-hidden="true">↗</span></NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.guide-intro { max-width: 880px; }
.guide-byline { margin-top: 20px; color: var(--muted); font-size: 13px; }
.guide-lead { margin-top: 24px; font-size: 17px; line-height: 1.9; }
.guide-summary { margin-top: 24px; padding: 20px; background: var(--card); border-left: 3px solid var(--accent); color: var(--muted); }
.guide-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px; margin-top: 24px; }
.guide-layout { display: grid; grid-template-columns: minmax(180px, 240px) minmax(0, 1fr); gap: 64px; padding-block: 64px; align-items: start; }
.guide-toc { position: sticky; top: 110px; border-left: 2px solid var(--line); padding-left: 20px; }
.guide-toc ol { display: grid; gap: 4px; }
.guide-toc a { display: block; padding-block: 10px; color: var(--muted); font-size: 13px; line-height: 1.6; }
.guide-toc a:hover { color: var(--accent); text-decoration: underline; }
.guide-body { min-width: 0; max-width: 760px; font-size: 16px; line-height: 1.9; }
.guide-body section + section { margin-top: 48px; }
.guide-body h2 { font-size: clamp(23px, 2.5vw, 30px); line-height: 1.4; color: var(--ink); }
.guide-body p { margin-top: 20px; }
.guide-table-wrap { margin-top: 24px; }
table { border-collapse: collapse; width: 100%; font-size: 14px; }
caption { text-align: left; font-weight: 500; margin-bottom: 12px; }
th, td { border: 1px solid var(--line-strong); padding: 12px; text-align: left; vertical-align: top; overflow-wrap: anywhere; }
thead { background: var(--surface); }
th { color: var(--ink); font-weight: 500; }
code { font-family: ui-monospace, monospace; font-size: 0.85em; }
.guide-code { border: 1px solid var(--line-strong); border-radius: 6px; overflow: hidden; }
.guide-code summary { cursor: pointer; padding: 16px; background: var(--surface); }
.guide-code pre { margin: 0; padding: 20px; overflow-x: auto; background: var(--ink); color: #ffffff; line-height: 1.75; }
.guide-code pre:focus-visible { outline-offset: -4px; }
.copy-feedback { min-height: 1.9em; color: var(--muted); font-size: 13px; }
.guide-sources { list-style: disc; padding-left: 24px; margin-block: 20px; }
.guide-sources li { margin-block: 12px; }
.guide-sources a, .guide-service-link { color: var(--accent); text-decoration: underline; text-underline-offset: 4px; }
@media (max-width: 850px) {
  .guide-layout { grid-template-columns: minmax(0, 1fr); gap: 36px; padding-block: 40px; }
  .guide-toc { position: static; }
  .guide-body { max-width: none; }
}
@media (max-width: 600px) {
  .guide-lead { font-size: 16px; }
  .guide-actions .button { width: 100%; gap: 12px; }
  th, td { padding: 10px 8px; font-size: 13px; }
  .guide-body h2 { letter-spacing: -0.5px; }
}
</style>
