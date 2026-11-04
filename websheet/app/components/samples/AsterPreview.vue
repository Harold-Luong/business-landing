<template>
    <div class="work-preview car-preview" role="img"
        :aria-label="$t('preview.aster.htmlAndCssIllustrationForAFictional')">
        <div class="preview-top"><strong>ASTER</strong><span>AUTO / S5 &nbsp; ↗</span></div>
        <div class="preview-title">Aster S5</div>
        <div class="aster-stage" aria-hidden="true">
            <span class="aster-sun" />
            <svg class="aster-car" viewBox="0 0 640 280" fill="none" focusable="false">
                <!-- Shared coordinates keep the body, glazing and wheels in proportion. -->
                <ellipse cx="326" cy="241" rx="264" ry="15" fill="#18232d" opacity=".12" />
                <path d="M59 178 79 147 151 128 210 78Q227 64 254 64H347Q374 65 397 82L453 125 541 145Q566 151 577 173L589 203 571 221H74Q53 216 51 198Z" fill="#f8faf8" stroke="#34444b" stroke-width="3" stroke-linejoin="round" />
                <path d="m157 128 64-46q13-9 33-9h90q24 0 43 14l48 39Z" fill="#364f5b" />
                <path d="m170 124 56-38q10-7 29-7h24v45Z" fill="#78949d" />
                <path d="M291 79h51q23 0 41 13l39 32H291Z" fill="#5d7c89" />
                <path d="m185 121 52-35h26l-43 35Zm120-35h35q20 0 35 11l16 12h-42Z" fill="#c9dcde" opacity=".35" />
                <path d="m60 179 90-32 292-5 111 28-112-10H161Z" fill="#e0e7e5" />
                <path d="M56 193h529l-14 28H74Z" fill="#bccbc9" />
                <path d="M175 218h256" stroke="#52666a" stroke-width="8" />
                <path d="m287 132-2 71m-119-64-12 24m273-30 16 28" stroke="#98a9ac" stroke-width="2" />
                <path d="M250 148h19m113 0h19" stroke="#52666a" stroke-width="4" stroke-linecap="round" />
                <path d="m421 119 18 1 8 10-23 1Z" fill="#34444b" />
                <path d="m528 157 35 8 9 14-44-10Z" fill="#e8f2ef" stroke="#839b9e" stroke-width="2" />
                <path d="m65 165 18-6-3 14-22 7Z" fill="#b76a57" />
                <path d="m554 189 26 3 3 10-33 2Z" fill="#34444b" />
                <path d="M92 217a47 47 0 0 1 94 0m247 0a47 47 0 0 1 94 0" fill="#27383e" />
                <g v-for="cx in [139, 480]" :key="cx" :transform="`translate(${cx} 216)`">
                    <circle r="38" fill="#243238" />
                    <circle r="28" fill="#a6b5b7" />
                    <circle r="22" fill="#43585f" />
                    <path d="M0-20V20M-19-6 19 6M-12 16 12-16M-12-16 12 16M-19 6 19-6" stroke="#c8d3d2" stroke-width="5" />
                    <circle r="8" fill="#dfe6e3" />
                    <circle r="3" fill="#596f76" />
                </g>
            </svg>
        </div>
        <span class="preview-index">{{ $t("preview.aster.concept01FictionalVehicle") }}</span>
        <span class="preview-arrow" aria-hidden="true">↗</span>
    </div>
</template>
