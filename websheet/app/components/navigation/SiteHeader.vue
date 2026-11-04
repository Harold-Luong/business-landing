<script setup lang="ts">
import { navigation } from "~/data/site";
const header = ref<HTMLElement | null>(null);
const toggle = ref<HTMLButtonElement | null>(null);
const languageMenu = ref<HTMLDetailsElement | null>(null);
const open = ref(false);
const ready = ref(false);
const route = useRoute();
const { locale, isHome, switchLocale } = useLocale();
const active = useActiveSection(header);
const currentSection = computed(() => isHome.value ? active.value : 'dich-vu');
watch(() => route.fullPath, () => { close(); closeLanguage(); });
let dispose = () => {};
function closeLanguage(focus = false) {
  if (!languageMenu.value) return;
  languageMenu.value.open = false;
  if (focus) languageMenu.value.querySelector('summary')?.focus();
}
function onLanguageFocusOut(event: FocusEvent) {
  if (!languageMenu.value?.contains(event.relatedTarget as Node | null)) closeLanguage();
}
function close(focus = false) {
  open.value = false;
  if (focus) toggle.value?.focus();
}
onMounted(() => {
  ready.value = true;
  const escape = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    if (languageMenu.value?.open) closeLanguage(true);
    else if (open.value) close(true);
  };
  const outside = (event: MouseEvent) => {
    if (!header.value?.contains(event.target as Node)) close();
    if (!languageMenu.value?.contains(event.target as Node)) closeLanguage();
  };
  const media = matchMedia("(min-width: 601px)");
  const resize = () => {
    if (media.matches) close();
  };
  document.addEventListener("keydown", escape);
  document.addEventListener("click", outside);
  media.addEventListener("change", resize);
  dispose = () => {
    document.removeEventListener("keydown", escape);
    document.removeEventListener("click", outside);
    media.removeEventListener("change", resize);
  };
});
onBeforeUnmount(() => dispose());
</script>
<template>
  <header ref="header" class="site-header">
    <div class="container nav-wrap">
      <BrandMark :to="$localePath(isHome ? '#' : '/')" />
      <details ref="languageMenu" class="language-switch" @toggle="languageMenu?.open && close()" @focusout="onLanguageFocusOut">
        <summary :aria-label="$t('nav.language')" :title="$t('nav.language')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <ellipse cx="12" cy="12" rx="4" ry="9" />
            <path d="M3 12h18" />
          </svg>
        </summary>
        <ul class="language-options" :aria-label="$t('nav.language')">
          <li v-for="language in (['vi', 'en'] as const)" :key="language">
            <NuxtLink :to="switchLocale(language, ready)" :lang="language" :hreflang="language" :aria-current="locale === language ? 'true' : undefined" @click="closeLanguage(true)">
              <span>{{ language === 'vi' ? 'Tiếng Việt' : 'English' }}</span>
              <svg v-if="locale === language" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
            </NuxtLink>
          </li>
        </ul>
      </details>
      <button
        ref="toggle"
        class="menu-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="navigation"
        :aria-label="$t(open ? 'nav.closeMenu' : 'nav.openMenu')"
        @click="closeLanguage(); open = !open"
      >
        <span /><span />
      </button>
      <nav id="navigation" :class="{ 'is-open': open }" :aria-label="$t('nav.main')">
        <NuxtLink
          v-for="item in navigation"
          :key="item.id"
          :to="$localePath(`${isHome ? '' : '/'}#${item.id}`)"
          :aria-current="currentSection === item.id ? 'location' : undefined"
          @click="close()"
          >{{ $t(item.label) }}
          <span v-if="item.id === 'lien-he'" aria-hidden="true">↗</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
