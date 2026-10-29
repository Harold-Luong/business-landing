const menuToggle = document.querySelector('.menu-toggle')
const navigation = document.querySelector('#navigation')
const form = document.querySelector('#quote-form')
const dialog = document.querySelector('#quote-dialog')
const summary = document.querySelector('#quote-summary')
const status = document.querySelector('#copy-status')
const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL || '').trim()

function closeMenu(returnFocus = false) {
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.setAttribute('aria-label', 'Mở menu')
    navigation.classList.remove('is-open')
    if (returnFocus) menuToggle.focus()
}

menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true'
    menuToggle.setAttribute('aria-expanded', String(open))
    menuToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu')
    navigation.classList.toggle('is-open', open)
})

navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu()
})
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu(true)
})
document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu()
})
matchMedia('(min-width: 601px)').addEventListener('change', () => closeMenu())

// Mark the section beneath the sticky header without changing browser history.
const navSections = [...navigation.querySelectorAll('a[href^="#"]')]
    .map((link) => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(({ section }) => section)
let navFrame = 0
let activeNavLink = null

function updateActiveNavigation() {
    navFrame = 0
    const marker = document.querySelector('.nav-wrap').getBoundingClientRect().bottom + 24
    let active = navSections.find(({ section }) => {
        const bounds = section.getBoundingClientRect()
        return bounds.top <= marker && bounds.bottom > marker
    })?.link || null
    // The final section may be too short to reach the header at the page bottom.
    if (Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) {
        const last = navSections.at(-1)
        if (last?.section.getBoundingClientRect().top < window.innerHeight) active = last.link
    }
    if (active === activeNavLink) return
    activeNavLink?.removeAttribute('aria-current')
    active?.setAttribute('aria-current', 'location')
    activeNavLink = active
}

function scheduleNavigationUpdate() {
    if (!navFrame) navFrame = requestAnimationFrame(updateActiveNavigation)
}

window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true })
window.addEventListener('resize', scheduleNavigationUpdate)
window.addEventListener('hashchange', scheduleNavigationUpdate)
window.addEventListener('pageshow', scheduleNavigationUpdate)
window.addEventListener('load', scheduleNavigationUpdate)
new ResizeObserver(scheduleNavigationUpdate).observe(document.body)
document.fonts.ready.then(scheduleNavigationUpdate)
scheduleNavigationUpdate()

document.querySelectorAll('[data-select-plan]').forEach((link) => {
    link.addEventListener('click', () => {
        form.elements.plan.value = link.dataset.selectPlan
    })
})
document.querySelectorAll('[data-concept]').forEach((link) => {
    link.addEventListener('click', () => {
        const message = form.elements.message
        const concept = `Tôi quan tâm đến hướng thiết kế ${link.dataset.concept}.`
        if (!message.value.includes(concept)) message.value = `${message.value.trim()}${message.value.trim() ? '\n' : ''}${concept}`.slice(0, 3000)
    })
})

// Restore the selected service when a visitor returns from its detail page.
const requestedPlan = new URLSearchParams(location.search).get('plan')
if ([...form.elements.plan.options].some((option) => option.value === requestedPlan)) {
    form.elements.plan.value = requestedPlan
}

// Restore the selected template when a visitor returns from the demo.
const selectedConcept = new Map([
    ['aster', 'Aster S5 — Landing page ô tô'],
    ['an-studio', 'An Studio — Kiến trúc & nội thất'],
    ['orbit', 'Orbit — Công nghệ & SaaS'],
    ['sheetflow', 'SheetFlow — Quản lý đơn hàng trên Google Sheets'],
]).get(new URLSearchParams(location.search).get('concept'))
if (selectedConcept) {
    const conceptPlan = new Map([['aster', 'launch'], ['an-studio', 'business'], ['orbit', 'custom'], ['sheetflow', 'apps-script']]).get(new URLSearchParams(location.search).get('concept'))
    if (conceptPlan) form.elements.plan.value = conceptPlan
    const message = form.elements.message
    const concept = `Tôi quan tâm đến hướng thiết kế ${selectedConcept}.`
    if (!message.value.includes(concept)) message.value = `${message.value.trim()}${message.value.trim() ? '\n' : ''}${concept}`.slice(0, 3000)
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    for (const name of ['name', 'message']) {
        const field = form.elements[name]
        field.value = field.value.trim()
        field.setCustomValidity(field.value.length < (name === 'message' ? 10 : 1) ? (name === 'message' ? 'Vui lòng mô tả dự án ít nhất 10 ký tự.' : 'Vui lòng nhập tên của bạn.') : '')
    }
    if (!form.reportValidity()) return
    const values = new FormData(form)
    summary.value = [
        'YÊU CẦU TƯ VẤN DỰ ÁN — CoreBrisk', '',
        `Họ tên: ${values.get('name').trim()}`,
        `Doanh nghiệp: ${values.get('company').trim() || 'Chưa cung cấp'}`,
        `Email: ${values.get('email').trim()}`,
        `Gói quan tâm: ${form.elements.plan.selectedOptions[0].textContent}`,
        `Ngân sách: ${values.get('budget')}`, '',
        'Mô tả dự án:', values.get('message').trim(), '',
        'Mong nhận được tư vấn phạm vi, tiến độ và báo giá chính thức.',
    ].join('\n')
    const emailLink = document.querySelector('#email-quote')
    // Email is an explicit public configuration. Never send data automatically.
    emailLink.hidden = !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(contactEmail)
    if (!emailLink.hidden) {
        emailLink.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent('Yêu cầu tư vấn dự án — ' + values.get('name').trim())}&body=${encodeURIComponent(summary.value)}`
    }
    status.textContent = ''
    dialog.showModal()
})

for (const name of ['name', 'message']) {
    form.elements[name].addEventListener('input', (event) => event.target.setCustomValidity(''))
}

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close())
dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect()
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close()
})
document.querySelector('#copy-quote').addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(summary.value)
        status.textContent = 'Đã sao chép. Bạn có thể dán nội dung vào email hoặc ứng dụng nhắn tin.'
    } catch {
        summary.focus()
        summary.select()
        status.textContent = 'Nội dung đã được chọn. Nhấn Ctrl+C (hoặc ⌘C) để sao chép, hoặc tải file bên dưới.'
    }
})
document.querySelector('#download-quote').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob(['\uFEFF' + summary.value], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'yeu-cau-tu-van-du-an.txt'
    document.body.append(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    status.textContent = 'Đã tạo file yêu cầu để trình duyệt tải xuống. Thông tin chưa được gửi đi.'
})
document.querySelector('#year').textContent = new Date().getFullYear()
// Keep native submission disabled when JavaScript is unavailable.
form.querySelector('button[type="submit"]').disabled = false
