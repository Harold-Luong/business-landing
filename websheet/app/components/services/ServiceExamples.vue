<script setup lang="ts">
defineProps<{ items: string[], beforeAfter?: boolean }>()
</script>

<template>
    <div class="service-examples">
        <p class="examples-note">{{ $t('examples.scopeNote') }}</p>
        <div class="detail-card-grid">
            <article v-for="item in items" :key="item" v-reveal class="detail-card">
                <h3>{{ $t(`${item}.title`) }}</h3>
                <dl>
                    <div>
                        <dt>{{ $t(beforeAfter ? 'examples.before' : 'examples.need') }}</dt>
                        <dd>{{ $t(`${item}.need`) }}</dd>
                    </div>
                    <div>
                        <dt>{{ $t(beforeAfter ? 'examples.after' : 'examples.approach') }}</dt>
                        <dd>{{ $t(`${item}.approach`) }}</dd>
                    </div>
                    <div>
                        <dt>{{ $t('examples.outcome') }}</dt>
                        <dd>{{ $t(`${item}.outcome`) }}</dd>
                    </div>
                </dl>
            </article>
        </div>
    </div>
</template>

<style scoped>
.examples-note {
    margin-top: 24px;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.8;
}
.detail-card-grid {
    margin-top: 24px;
}
dl {
    display: grid;
    gap: 18px;
}
dt {
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: 500;
    color: var(--ink);
}
dd {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.8;
}
</style>
