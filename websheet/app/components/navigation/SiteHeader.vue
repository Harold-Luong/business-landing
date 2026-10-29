<script setup lang="ts">
import { navigation } from '~/data/site'
const header = ref<HTMLElement | null>(null)
const toggle = ref<HTMLButtonElement | null>(null)
const open = ref(false)
const active = useActiveSection(header)
let dispose = () => { }
function close(focus = false) {
    open.value = false
    if (focus) toggle.value?.focus()
}
onMounted(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && open.value) close(true) }
    const outside = (event: MouseEvent) => { if (!header.value?.contains(event.target as Node)) close() }
    const media = matchMedia('(min-width: 601px)')
    const resize = () => { if (media.matches) close() }
    document.addEventListener('keydown', escape)
    document.addEventListener('click', outside)
    media.addEventListener('change', resize)
    dispose = () => {
        document.removeEventListener('keydown', escape)
        document.removeEventListener('click', outside)
        media.removeEventListener('change', resize)
    }
})
onBeforeUnmount(() => dispose())
</script>
<template>
    <header ref="header" class="site-header">
        <div class="container nav-wrap">
            <BrandMark to="#" />
            <button ref="toggle" class="menu-toggle" type="button" :aria-expanded="open" aria-controls="navigation"
                :aria-label="open ? 'Đóng menu' : 'Mở menu'" @click="open = !open"><span /><span /></button>
            <nav id="navigation" :class="{ 'is-open': open }" aria-label="Điều hướng chính">
                <NuxtLink v-for="item in navigation" :key="item.id" :to="`#${item.id}`"
                    :aria-current="active === item.id ? 'location' : undefined"
                    :class="{ 'button button-small nav-cta': item.id === 'lien-he' }" @click="close()">{{ item.label }}
                    <span v-if="item.id === 'lien-he'" aria-hidden="true">↗</span></NuxtLink>
            </nav>
        </div>
    </header>
</template>
