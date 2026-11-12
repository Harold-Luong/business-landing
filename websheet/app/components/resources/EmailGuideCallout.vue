<script setup lang="ts">
import { emailGuideMeta } from '~~/shared/site'
</script>
<template>
    <aside class="container email-guide-callout" aria-labelledby="email-guide-callout-title">
        <div>
            <p class="eyebrow">{{ $t('resources.label') }}</p>
            <h2 id="email-guide-callout-title">{{ $t(emailGuideMeta.name) }}</h2>
            <p>{{ $t('resources.emailGuideTeaser') }}</p>
        </div>
        <NuxtLink class="text-link" :to="$localePath(emailGuideMeta.path)">
            {{ $t('resources.readEmailGuide') }}
        </NuxtLink>
    </aside>
</template>
<style scoped>
.email-guide-callout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(200px, 300px);
    gap: 32px;
    align-items: center;
    padding-block: 40px;
    border-block: 1px solid var(--line);
}

.email-guide-callout h2 {
    font-size: 25px;
    letter-spacing: -0.6px;
    line-height: 1.4;
}

.email-guide-callout .eyebrow {
    margin-bottom: 12px;
}

.email-guide-callout p:last-child {
    color: var(--muted);
    margin-top: 12px;
}

.email-guide-callout a {
    color: var(--accent);
    line-height: 1.8;
    min-height: 44px;
    text-decoration: underline;
    text-underline-offset: 4px;
}

@media (max-width: 850px) {
    .email-guide-callout {
        grid-template-columns: minmax(0, 1fr);
        gap: 20px;
    }
}
</style>
