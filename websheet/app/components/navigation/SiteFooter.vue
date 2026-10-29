<script setup lang="ts">
const year = useState('copyright-year', () => new Date().getFullYear())
</script>

<template>
    <footer class="site-footer">
        <div class="container">
            <div class="footer-main">
                <BrandMark to="#"></BrandMark>
                <p>Thiết kế website.<br>Lập trình theo yêu cầu.</p>
                <div>
                    <NuxtLink to="#dich-vu">Dịch vụ</NuxtLink>
                    <NuxtLink to="#bang-gia">Bảng giá</NuxtLink>
                    <NuxtLink to="#cau-hoi">Câu hỏi thường
                        gặp</NuxtLink>
                </div>
                <NuxtLink class="footer-top" to="#" aria-label="Về đầu trang">↑</NuxtLink>
            </div>
            <div class="footer-bottom"><span>© <span id="year">{{ year }}</span> WebSheet.</span><span>Thiết kế · Lập
                    trình ·
                    Bảo trì website</span></div>
        </div>
    </footer>
</template>
