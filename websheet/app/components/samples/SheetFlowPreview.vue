<template>
  <section
    class="container detail-section service-samples"
    id="mau-giao-dien"
    aria-labelledby="sheets-showcase-title"
  >
    <div v-reveal class="sheets-showcase-heading">
      <p class="eyebrow">GOOGLE SHEETS · APPS SCRIPT</p>
      <h2 id="sheets-showcase-title">{{ $t("preview.sheetFlow.oneSpreadsheetLessBusywork") }}</h2>
      <p>{{ $t("preview.sheetFlow.aSampleInterfaceForManagingDataAnd") }}</p>
    </div>
    <article class="sheet-demo-card">
      <div
        v-reveal
        class="sheet-preview"
        role="img"
        :aria-label="$t('preview.sheetFlow.sheetflowInterfaceConceptOrderTrackingTotalRevenue')"
      >
        <div class="sheet-window" aria-hidden="true">
          <div class="sheet-window-heading">
            <span class="sheet-file-icon">▦</span>
            <div>
              <strong>{{ $t("preview.sheetFlow.sheetflowOrderManagement") }}</strong
              ><small>{{ $t("preview.sheetFlow.fileEditViewExtensions") }}</small>
            </div>
            <span class="sheet-share">{{ $t("preview.sheetFlow.share") }}</span>
          </div>
          <div class="sheet-toolbar">
            <span>↶   ↷   |   100%</span><span>{{ $t("preview.sheetFlow.syncDataCreateReports") }}</span>
          </div>
          <div class="sheet-formula">
            <span>A2</span><i>ƒx</i><span>=SUM(C5:C8)</span>
          </div>
          <div class="sheet-summary">
            <div>
              Doanh thu<strong>24,8 <small>{{ $t("pricing.google.million") }}</small></strong>
            </div>
            <div>{{ $t("preview.sheetFlow.orders") }}<strong>32</strong></div>
            <div> {{ $t("preview.sheetFlow.completed") }}<strong>24 <small>/ 32</small></strong>
            </div>
          </div>
          <table class="sheet-data">
            <thead>
              <tr>
                <th></th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>4</th>
                <td>{{ $t("preview.sheetFlow.orderId") }}</td>
                <td>{{ $t("preview.sheetFlow.customer") }}</td>
                <td>{{ $t("preview.sheetFlow.value") }}</td>
                <td>{{ $t("preview.sheetFlow.status") }}</td>
              </tr>
              <tr>
                <th>5</th>
                <td>DH-001</td>
                <td>An Studio</td>
                <td>6.900.000</td>
                <td><span class="sheet-status done">{{ $t("preview.sheetFlow.complete") }}</span></td>
              </tr>
              <tr>
                <th>6</th>
                <td>DH-002</td>
                <td>{{ $t("preview.sheetFlow.mocHome") }}</td>
                <td>8.500.000</td>
                <td><span class="sheet-status pending">{{ $t("preview.sheetFlow.inProgress") }}</span></td>
              </tr>
              <tr>
                <th>7</th>
                <td>DH-003</td>
                <td>{{ $t("preview.sheetFlow.laCoffee") }}</td>
                <td>4.200.000</td>
                <td><span class="sheet-status done">{{ $t("preview.sheetFlow.complete") }}</span></td>
              </tr>
              <tr>
                <th>8</th>
                <td>DH-004</td>
                <td>{{ $t("preview.sheetFlow.nangShop") }}</td>
                <td>5.200.000</td>
                <td><span class="sheet-status new">{{ $t("preview.sheetFlow.new") }}</span></td>
              </tr>
            </tbody>
          </table>
          <div class="sheet-tabs">
            <span>＋   ☰</span><strong>{{ $t("preview.sheetFlow.orders2") }}</strong><span>{{ $t("preview.sheetFlow.customer") }}</span
            ><span>{{ $t("preview.sheetFlow.reports") }}</span>
          </div>
        </div>
        <span class="sheet-preview-note">{{ $t("preview.sheetFlow.illustrativeInterfaceData") }}</span>
      </div>
      <div v-reveal="80" class="sheet-demo-copy">
        <span class="sheet-demo-tag">{{ $t("preview.sheetFlow.customSolutionConcept") }}</span>
        <h3>SheetFlow</h3>
        <p> {{ $t("preview.sheetFlow.trackOrdersCustomersAndReportsInAn") }} </p>
        <ul>
          <li>{{ $t("preview.sheetFlow.keyFiguresAtTheTopOfThe") }}</li>
          <li>{{ $t("preview.sheetFlow.clearStatusesForEasyTracking") }}</li>
          <li>{{ $t("preview.sheetFlow.aSidebarForSyncingAndReporting") }}</li>
        </ul>
        <div class="sheet-demo-actions">
          <DemoLink sample-id="sheetflow" label="Xem demo Sheets"></DemoLink>
          <NuxtLink
            class="text-link"
            :to="$localePath('/?concept=sheetflow&plan=apps-script#quote-form')"
            >{{ $t("preview.sheetFlow.discussThisConcept") }} <span aria-hidden="true">→</span></NuxtLink
          >
        </div>
        <p class="sheet-demo-note"> {{ $t("preview.sheetFlow.sheetflowIsAnInterfaceConceptForDiscussing") }} </p>
      </div>
    </article>
  </section>
</template>
