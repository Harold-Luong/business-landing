<template>
    <section id="dich-vu" class="section services" aria-labelledby="services-title">
        <!-- Preserve incoming links from independently deployed demos. -->
        <span id="giao-dien" class="service-samples-anchor" aria-hidden="true"></span>
        <div class="container">
            <p class="eyebrow">01 / CHỌN NHÓM DỊCH VỤ</p>
            <h2 class="sr-only" id="services-title">Giải pháp cho nhu cầu của bạn</h2>
            <div class="service-paths">
                <NuxtLink v-reveal class="service-family" id="dich-vu-google" to="/dich-vu/google-automation/"
                    aria-labelledby="google-services-title google-service-link">
                    <div class="service-family-top">
                        <span class="service-family-icon" aria-hidden="true">
                            <svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7" rx="2"></rect>
                                <rect x="14" y="14" width="7" height="7" rx="2"></rect>
                                <path d="M7 10v7h7M10 7h7v7"></path>
                            </svg>
                        </span>
                        <span class="service-family-label">TỰ ĐỘNG HÓA CÔNG VIỆC</span>
                    </div>
                    <h3 id="google-services-title">Google Automation</h3>
                    <p>
                        Tiện ích Google Sheets với Apps Script và AppSheet để tự động hóa thao tác và
                        quản lý công việc.
                    </p>
                    <figure class="service-family-preview">
                        <div role="img" aria-label="Minh họa giao diện quản lý đơn hàng SheetFlow trong Google Sheets">
                            <SheetTeaser aria-hidden="true" />
                        </div>
                        <figcaption>SheetFlow · Giao diện minh họa theo yêu cầu</figcaption>
                    </figure>
                    <div class="service-family-actions">
                        <span class="service-detail-link" id="google-service-link">Xem giải pháp tự động hóa
                            <span aria-hidden="true">↗</span></span>
                    </div>
                </NuxtLink>
                <NuxtLink v-reveal="80" class="service-family" id="dich-vu-website" to="/dich-vu/thiet-ke-website/"
                    aria-labelledby="web-services-title website-service-link">
                    <div class="service-family-top">
                        <span class="service-family-icon" aria-hidden="true">
                            <svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="9"></circle>
                                <ellipse cx="12" cy="12" rx="4" ry="9"></ellipse>
                                <path d="M3 12h18M5 6h14M5 18h14"></path>
                            </svg>
                        </span>
                        <span class="service-family-label">WEBSITE CHO DOANH NGHIỆP</span>
                    </div>
                    <h3 id="web-services-title">Website &amp; Web App</h3>
                    <p>
                        Thiết kế landing page, website doanh nghiệp và ứng dụng web theo mục tiêu kinh
                        doanh của bạn.
                    </p>
                    <figure class="service-family-preview">
                        <div role="img" aria-label="Minh họa website kiến trúc và nội thất An Studio">
                            <AnStudioPreview aria-hidden="true" />
                        </div>
                        <figcaption>An Studio · Mẫu website kiến trúc &amp; nội thất</figcaption>
                    </figure>
                    <div class="service-family-actions">
                        <span class="service-detail-link" id="website-service-link">Xem dịch vụ website <span
                                aria-hidden="true">↗</span></span>
                    </div>
                </NuxtLink>
            </div>
            <p v-reveal class="service-samples-note">
                Giao diện minh họa; xem mẫu chi tiết trong từng dịch vụ. Phạm vi triển khai được
                thống nhất theo nhu cầu của bạn.
            </p>
        </div>
    </section>
</template>
