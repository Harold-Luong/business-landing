<template>
  <div class="work-preview sheet-teaser">
    <div class="preview-top"><strong>SheetFlow</strong><span>GOOGLE SHEETS</span></div>
    <div class="preview-title">{{ $t("preview.sheetTeaser.organizedData") }}<br>{{ $t("preview.sheetTeaser.clearWorkflows") }}</div>
    <div class="sheet-teaser-grid">
      <div><strong>{{ $t("preview.sheetFlow.orders") }}</strong><strong>{{ $t("preview.sheetFlow.value") }}</strong><strong>{{ $t("preview.sheetFlow.status") }}</strong></div>
      <div><span>DH-001</span><span>6.900.000</span><span class="sheet-status done">{{ $t("preview.sheetFlow.complete") }}</span></div>
      <div><span>DH-002</span><span>8.500.000</span><span class="sheet-status pending">{{ $t("preview.sheetFlow.inProgress") }}</span></div>
      <div><span>DH-003</span><span>4.200.000</span><span class="sheet-status done">{{ $t("preview.sheetFlow.complete") }}</span></div>
    </div>
    <span class="preview-index">{{ $t("preview.sheetFlow.illustrativeInterfaceData") }}</span>
  </div>
</template>
