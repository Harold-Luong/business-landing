<template>
  <div>
    <section class="container detail-section" aria-labelledby="giai-phap">
      <div v-reveal class="detail-copy">
        <p class="eyebrow">{{ $t("sheets.toolsInsideYourSpreadsheet") }}</p>
        <h2 id="giai-phap">{{ $t("sheets.menusButtonsOrASidebar") }}</h2>
        <p>{{ $t("sheets.toolsAreDesignedAroundTheStepsYou") }}</p>
      </div>
      <div class="detail-card-grid">
        <article v-reveal class="detail-card"><h3>{{ $t("sheets.menusActionButtons") }}</h3><p>{{ $t("sheets.runATaskSuchAsDataCleaning") }}</p></article>
        <article v-reveal class="detail-card"><h3>{{ $t("sheets.sheetsSidebar") }}</h3><p>{{ $t("sheets.bringOptionsAndActionsIntoAPanel") }}</p></article>
        <article v-reveal class="detail-card"><h3>{{ $t("sheets.scheduledWorkflows") }}</h3><p>{{ $t("sheets.generateReportsOrSendRemindersOnConfigured") }}</p></article>
      </div>
    </section>
    <section v-reveal class="detail-scope" aria-labelledby="pham-vi">
      <div class="container detail-scope-grid">
        <div>
          <p class="eyebrow">{{ $t("sheets.chooseAnApproach") }}</p>
          <h2 id="pham-vi">{{ $t("sheets.whenDoYouNeedASeparateApp") }}</h2>
          <p>{{ $t("sheets.ifSeveralPeopleNeedDataEntryScreens") }}</p>
        </div>
        <ul>
          <li><NuxtLink class="text-link" :to="$localePath('/dich-vu/google-apps-script/')">{{ $t("sheets.appsScriptInSheetToolsAndAutomated") }}</NuxtLink></li>
          <li><NuxtLink class="text-link" :to="$localePath('/dich-vu/appsheet/')">{{ $t("sheets.appsheetDataEntryAndManagementInterfacesFor") }}</NuxtLink></li>
          <li>{{ $t("sheets.browserExtensionsAreADifferentTypeOf") }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>
