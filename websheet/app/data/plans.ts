import type { ServicePlan } from '~/types/content'
export const plans: ServicePlan[] = [
  {
    "id": "apps-script",
    "name": "Google Apps Script",
    "category": "google",
    "startingPriceVnd": 900000,
    "formLabel": "plans.googleAppsScriptFromVnd09",
    "kicker": "plans.customDevelopment",
    "features": [
      "appsScript.oneAutomatedWorkflowAcrossUpTo2",
      "appsScript.cleanReconcileOrConsolidateDataUsingAgreed",
      "appsScript.runOnAScheduleOrFromA",
      "appsScript.sourceCodeConfigurationAndInstructions1Month"
    ],
    "detailHref": "/dich-vu/google-apps-script/#pham-vi",
    "recommended": false,
    "scope": "plans.oneWorkflowUpTo2SheetsFiles",
    "delivery": "plans.delivery.threeToFiveDays",
    "warranty": "plans.warranty.oneMonth"
  },
  {
    "id": "appsheet",
    "name": "AppSheet",
    "category": "google",
    "startingPriceVnd": 3900000,
    "formLabel": "plans.appsheetFromVnd79MillionCustom",
    "kicker": "plans.customApps",
    "features": [
      "appsheet.oneAppWithUpTo5Google",
      "appsheet.upTo5ScreensForDataEntry",
      "appsheet.upTo2UserRolesAndOne",
      "appsheet.configurationHandoverAndAdminGuidance1Month"
    ],
    "detailHref": "/dich-vu/appsheet/#pham-vi",
    "recommended": false,
    "scope": "plans.upTo5DataTablesAnd5",
    "delivery": "plans.delivery.sevenToTwelveDays",
    "warranty": "plans.warranty.oneMonth"
  },
  {
    "id": "launch",
    "name": "Launch",
    "category": "website",
    "startingPriceVnd": 4900000,
    "formLabel": "plans.launchFromVnd69Million",
    "kicker": "plans.singlePage",
    "features": [
      "plans.oneLandingPageUpTo8Sections",
      "plans.designAlignedWithYourBrand",
      "plans.responsiveOnMobileTabletAndDesktop",
      "plans.basicTechnicalSeo",
      "plans.formZaloOrPhoneContactIntegration",
      "plans.sourceCodeUsageGuidance",
      "plans.bugFixWarrantyWithinScope3Months"
    ],
    "detailHref": "/dich-vu/thiet-ke-website/#goi-launch",
    "recommended": false,
    "scope": "plans.oneLandingPageUpTo8Sections2",
    "management": "plans.staticPageCmsQuotedSeparately",
    "delivery": "plans.delivery.fiveToSevenDays",
    "warranty": "plans.warranty.threeMonths"
  },
  {
    "id": "business",
    "name": "Business",
    "category": "website",
    "startingPriceVnd": 14900000,
    "formLabel": "plans.businessFromVnd149Million",
    "kicker": "plans.recommended",
    "features": [
      "plans.includesTheLaunchPlanDeliverables",
      "plans.upTo10ContentPages",
      "plans.cmsForArticlesServicesAndProjects",
      "plans.blogWithAnSeoFriendlyStructure",
      "plans.analyticsSetupOnRequest",
      "plans.liveAdminTraining",
      "plans.bugFixWarrantyWithinScope6Months"
    ],
    "detailHref": "/dich-vu/thiet-ke-website/#goi-business",
    "recommended": true,
    "scope": "plans.businessWebsiteUpTo10Pages",
    "management": "plans.cmsBlogIncluded",
    "delivery": "plans.delivery.fifteenToTwentyDays",
    "warranty": "plans.warranty.sixMonths"
  },
  {
    "id": "custom",
    "name": "Custom",
    "category": "website",
    "startingPriceVnd": 29900000,
    "formLabel": "plans.customFromVnd299Million",
    "kicker": "plans.customBuilt",
    "features": [
      "plans.discoveryRequirementsAnalysis",
      "plans.uiUxDesignedForYourWorkflows",
      "plans.userAccountsAccessPermissions",
      "plans.apiAndCrmIntegrationsAsAgreed",
      "plans.architectureDesignedForFutureUpgrades",
      "plans.technicalDocumentationSourceCodeHandover",
      "plans.warrantyAsSpecifiedInTheProjectContract"
    ],
    "detailHref": "/dich-vu/thiet-ke-website/#goi-custom",
    "recommended": false,
    "scope": "plans.websiteWebAppBuiltForYourBusiness",
    "management": "plans.onRequest",
    "delivery": "plans.basedOnProjectScope",
    "warranty": "plans.asAgreedInTheContract"
  }
]
export const googlePlans = plans.filter(p => p.category === 'google')
export const websitePlans = plans.filter(p => p.category === 'website')
export const planById = Object.fromEntries(plans.map(p => [p.id, p])) as Record<ServicePlan['id'], ServicePlan>
export const priceMillions = (price: number) => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 }).format(price / 1000000)
export const quoteOptions = [{ id: 'unsure', label: 'quote.plans.unsure' }, { id: 'automation', label: 'plans.sheetsToolsAppsScriptAppsheet' }, { id: 'website', label: 'plans.websiteHelpMeChooseAPlan' }, ...['launch', 'business', 'custom', 'apps-script', 'appsheet'].map(id => ({ id, label: plans.find(p => p.id === id)!.formLabel }))]
export const budgets = ['quote.budgets.unknown', 'quote.budgets.under10', 'quote.budgets.from10To20', 'quote.budgets.from20To50', 'quote.budgets.over50']
