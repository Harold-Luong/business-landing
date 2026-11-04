<template>
<div>
<section class="container detail-section" aria-labelledby="giai-phap">
            <div v-reveal class="detail-copy"><p class="eyebrow">{{ $t("appsheet.understandTheSolution") }}</p><h2 id="giai-phap">{{ $t("appsScript.whatCanAppsScriptAutomate") }}</h2><p>{{ $t("appsScript.appsScriptIsGoogleSProgrammingTool") }}</p></div>
            <div class="detail-card-grid"><article v-reveal class="detail-card"><h3>{{ $t("appsScript.consolidatedReports") }}</h3><p>{{ $t("appsScript.combineDataFromAgreedSheetsCheckRequired") }}</p></article><article v-reveal class="detail-card"><h3>{{ $t("appsScript.dataReconciliation") }}</h3><p>{{ $t("appsScript.flagMissingInformationFindDuplicatesOrCompare") }}</p></article><article v-reveal class="detail-card"><h3>{{ $t("appsScript.scheduledReminders") }}</h3><p>{{ $t("appsScript.setUpChecksForDeadlinesAndSend") }}</p></article></div>
        </section>
<section v-reveal class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div><p class="eyebrow">{{ $t("appsheet.scopeDeliverables") }}</p><h2 id="pham-vi">{{ $t("appsheet.deliverables") }}<br>{{ $t("appsheet.agreedInAdvance") }}</h2><p>{{ $t("appsScript.externalApisMultipleDataSourcesOrComplex") }}</p></div>
                <ul><li>{{ $t("appsScript.oneAutomatedWorkflowAcrossUpTo2") }}</li><li>{{ $t("appsScript.cleanReconcileOrConsolidateDataUsingAgreed") }}</li><li>{{ $t("appsScript.runOnAScheduleOrFromA") }}</li><li>{{ $t("appsScript.sourceCodeConfigurationAndInstructions1Month") }}</li></ul>
            </div>
        </section>
</div>
</template>
