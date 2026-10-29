<template>
    <div class="service-detail">
        <a class="skip-link" href="#noi-dung">Chuyển đến nội dung</a>
        <SiteHeader />
        <slot />
        <footer class="container detail-footer"><span>WebSheet · Thiết kế & lập trình theo yêu cầu</span>
            <NuxtLink to="/">Về trang chủ ↑</NuxtLink>
        </footer>
    </div>
</template>
