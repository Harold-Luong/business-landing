<template>
    <div class="work-preview car-preview" role="img"
        :aria-label="$t('preview.aster.htmlAndCssIllustrationForAFictional')">
        <div class="preview-top"><strong>ASTER</strong><span>AUTO / S5 &nbsp; ↗</span></div>
        <div class="preview-title">Aster S5</div>
        <div class="aster-stage" aria-hidden="true">
            <span class="aster-sun" />
            <div class="aster-road"><i /><i /><i /></div>
            <div class="aster-car">
                <span class="aster-roof" />
                <span class="aster-window aster-window-front" />
                <span class="aster-window aster-window-back" />
                <span class="aster-light" />
                <span class="aster-grille" />
                <span class="aster-wheel aster-wheel-front" />
                <span class="aster-wheel aster-wheel-back" />
            </div>
        </div>
        <span class="preview-index">{{ $t("preview.aster.concept01FictionalVehicle") }}</span>
        <span class="preview-arrow" aria-hidden="true">↗</span>
    </div>
</template>
