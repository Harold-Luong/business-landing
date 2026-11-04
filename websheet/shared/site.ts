export const homeMeta = {
    title: 'seo.websheetGoogleSheetsAppsheetWebDesign',
    description: 'seo.websheetBuildsCustomWebsitesAndGoogleSheets'
}
export const serviceMeta = [
  {
    "path": "/dich-vu/google-automation/",
    "name": "Google Automation",
    "title": "seo.googleAutomationAppsScriptAppsheetSolutionsWebsheet",
    "description": "seo.customGoogleSheetsSolutionsBuiltWithApps",
    "plan": "automation"
  },
  {
    "path": "/dich-vu/google-apps-script/",
    "name": "Google Apps Script",
    "title": "seo.googleAppsScriptDevelopmentSheetsAutomationWebsheet",
    "description": "seo.customAppsScriptDevelopmentForGoogleSheets",
    "plan": "apps-script"
  },
  {
    "path": "/dich-vu/appsheet/",
    "name": "automation.appsheetApps",
    "title": "seo.customAppsheetAppsForBusinessesWebsheet",
    "description": "seo.customAppsheetAppsForManagingOrdersInventory",
    "plan": "appsheet"
  },
  {
    "path": "/dich-vu/tien-ich-google-sheets/",
    "name": "seo.googleSheetsTools",
    "title": "seo.googleSheetsToolsAppsScriptOrAppsheet",
    "description": "seo.customGoogleSheetsToolsBuiltWithApps",
    "plan": "automation"
  },
  {
    "path": "/dich-vu/thiet-ke-website/",
    "name": "hero.webDesign",
    "title": "seo.businessWebsitesLandingPageDesignWebsheet",
    "description": "seo.customLandingPagesBusinessWebsitesAndWeb",
    "plan": "launch"
  }
]
export const vietnameseRoutes = ['/', ...serviceMeta.map(page => page.path)]
export const routes = [...vietnameseRoutes, ...vietnameseRoutes.map(path => `/en${path}`)]
