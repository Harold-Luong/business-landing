<template>
    <div>
        <a class="skip-link" href="#noi-dung">{{ $t("layout.skipToContent") }}</a>
        <SiteHeader />
        <slot />
        <SiteFooter />
    </div>
</template>
