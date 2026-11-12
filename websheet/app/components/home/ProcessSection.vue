<template>
<section id="quy-trinh" class="section process">
            <div class="container">
                <div v-reveal class="section-heading">
                    <div>
                        <p class="eyebrow">{{ $t("process.eyebrow") }}</p>
                        <h2>{{ $t("process.fromPlanning") }}<br>{{ $t("process.toHandover") }}</h2>
                    </div>
                    <p>{{ $t("process.youApproveTheResultsAtEachStep") }}</p>
                </div>
                <ol class="process-grid">
                    <li v-reveal><span class="step-number">01 <span class="step-icon" aria-hidden="true">↗</span></span>
                        <h3>{{ $t("process.discoveryConsultation") }}</h3>
                        <p>{{ $t("process.agreeOnGoalsScopeBudgetAndTimeline") }}</p>
                    </li>
                    <li v-reveal><span class="step-number">02 <span class="step-icon" aria-hidden="true">↗</span></span>
                        <h3>{{ $t("process.designReview") }}</h3>
                        <p>{{ $t("process.approveTheDesignOrWorkflowBeforeDevelopment") }}</p>
                    </li>
                    <li v-reveal><span class="step-number">03 <span class="step-icon" aria-hidden="true">↗</span></span>
                        <h3>{{ $t("process.developmentTesting") }}</h3>
                        <p>{{ $t("process.testTheFeaturesAndReviewTheResults") }}</p>
                    </li>
                    <li v-reveal><span class="step-number">04 <span class="step-icon" aria-hidden="true">✓</span></span>
                        <h3>{{ $t("process.deploymentHandover") }}</h3>
                        <p>{{ $t("process.signOffReceiveTheDeliverablesAndLearn") }}</p>
                    </li>
                </ol>
            </div>
        </section>
</template>
