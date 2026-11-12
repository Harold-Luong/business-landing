<template>
    <div>
        <section class="container detail-section" aria-labelledby="giai-phap">
            <div v-reveal class="detail-copy">
                <p class="eyebrow">{{ $t("sheets.toolsInsideYourSpreadsheet") }}</p>
                <h2 id="giai-phap">{{ $t("sheets.menusButtonsOrASidebar") }}</h2>
                <p>{{ $t("sheets.toolsAreDesignedAroundTheStepsYou") }}</p>
            </div>
            <ServiceExamples :items="['examples.cleaning', 'examples.reconciliation', 'examples.sidebar']" />
        </section>
        <section v-reveal class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div>
                    <p class="eyebrow">{{ $t("sheets.chooseAnApproach") }}</p>
                    <h2 id="pham-vi">{{ $t("sheets.whenDoYouNeedASeparateApp") }}</h2>
                    <p>{{ $t("sheets.ifSeveralPeopleNeedDataEntryScreens") }}</p>
                </div>
                <ul>
                    <li>
                        <NuxtLink class="text-link" :to="$localePath('/dich-vu/google-apps-script/')">{{
                            $t("sheets.appsScriptInSheetToolsAndAutomated") }}</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="text-link" :to="$localePath('/dich-vu/appsheet/')">{{
                            $t("sheets.appsheetDataEntryAndManagementInterfacesFor") }}</NuxtLink>
                    </li>
                    <li>{{ $t("sheets.browserExtensionsAreADifferentTypeOf") }}</li>
                </ul>
            </div>
        </section>
    </div>
</template>
