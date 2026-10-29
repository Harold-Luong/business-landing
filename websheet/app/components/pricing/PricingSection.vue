<template>
    <section id="bang-gia" class="section pricing">
        <div class="container">
            <div class="center-heading">
                <p class="eyebrow">03 / BẢNG GIÁ THAM KHẢO</p>
                <h2>Chọn gói theo nhu cầu.</h2>
                <p>Giá khởi điểm theo phạm vi dưới đây. Báo giá chính thức sau khi trao đổi yêu cầu.</p>
            </div>
            <nav class="pricing-navigation" aria-label="Nhóm bảng giá">
                <NuxtLink to="#bang-gia-google">Google Automation <span aria-hidden="true">↘</span></NuxtLink>
                <NuxtLink to="#bang-gia-website">Website &amp; web app <span aria-hidden="true">↘</span></NuxtLink>
            </nav>
            <GooglePricing></GooglePricing>
            <WebsiteComparison></WebsiteComparison>
        </div>
    </section>
</template>
