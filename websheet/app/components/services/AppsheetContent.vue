<template>
<div>
<section class="container detail-section" aria-labelledby="giai-phap">
            <div v-reveal class="detail-copy"><p class="eyebrow">{{ $t("appsheet.understandTheSolution") }}</p><h2 id="giai-phap">{{ $t("appsheet.fromSpreadsheetDataToInternalApps") }}</h2><p>{{ $t("appsheet.appsheetIsGoogleSPlatformForBuilding") }}</p></div>
            <div class="detail-card-grid"><article v-reveal class="detail-card"><h3>{{ $t("appsheet.orderManagement") }}</h3><p>{{ $t("appsheet.enterOrdersThroughFormsTrackTheirStatus") }}</p></article><article v-reveal class="detail-card"><h3>{{ $t("appsheet.inventoryTracking") }}</h3><p>{{ $t("appsheet.recordStockMovementsAndViewInventoryReports") }}</p></article><article v-reveal class="detail-card"><h3>{{ $t("appsheet.taskCoordination") }}</h3><p>{{ $t("appsheet.bringTogetherTasksDeadlinesAndOwnersWith") }}</p></article></div>
        </section>
<section v-reveal class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div><p class="eyebrow">{{ $t("appsheet.scopeDeliverables") }}</p><h2 id="pham-vi">{{ $t("appsheet.deliverables") }}<br>{{ $t("appsheet.agreedInAdvance") }}</h2><p>{{ $t("appsheet.pricingCoversImplementationExcludingAppsheetGoogleWorkspace") }}</p></div>
                <ul><li>{{ $t("appsheet.oneAppWithUpTo5Google") }}</li><li>{{ $t("appsheet.upTo5ScreensForDataEntry") }}</li><li>{{ $t("appsheet.upTo2UserRolesAndOne") }}</li><li>{{ $t("appsheet.configurationHandoverAndAdminGuidance1Month") }}</li></ul>
            </div>
        </section>
</div>
</template>
