document.documentElement.classList.add('js')
const toggle = document.querySelector('.menu-toggle')
const navigation = document.querySelector('#navigation')
toggle.hidden = false
function closeMenu(focus = false) {
  toggle.setAttribute('aria-expanded', 'false')
  toggle.setAttribute('aria-label', 'Mở menu')
  navigation.classList.remove('is-open')
  if (focus) toggle.focus()
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true'
  toggle.setAttribute('aria-expanded', String(open))
  toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu')
  navigation.classList.toggle('is-open', open)
})
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu() })
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true) })
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu() })
matchMedia('(min-width: 761px)').addEventListener('change', () => closeMenu())
const tabs = [...document.querySelectorAll('[role="tab"]')]
function selectTab(tab) {
  for (const item of tabs) {
    const selected = item === tab
    item.setAttribute('aria-selected', String(selected))
    item.tabIndex = selected ? 0 : -1
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected
  }
  document.querySelector('#view-name').textContent = tab.querySelector('span').textContent
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab))
  tab.addEventListener('keydown', event => {
    let next
    if (event.key === 'ArrowDown') next = (index + 1) % tabs.length
    if (event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = tabs.length - 1
    if (next === undefined) return
    event.preventDefault()
    selectTab(tabs[next])
    tabs[next].focus()
  })
})
document.querySelectorAll('.task input').forEach(input => input.addEventListener('change', () => {
  document.querySelector('#task-count').textContent = `${document.querySelectorAll('.task input:checked').length}/3 hoàn thành`
}))
document.querySelector('.billing').hidden = false
document.querySelectorAll('[data-billing]').forEach(button => button.addEventListener('click', () => {
  const yearly = button.dataset.billing === 'yearly'
  document.querySelectorAll('[data-billing]').forEach(item => item.setAttribute('aria-pressed', String(item === button)))
  document.querySelector('#team-price').textContent = yearly ? '120.000₫' : '150.000₫'
  document.querySelector('#billing-note').textContent = yearly ? '/ người / tháng · 1.440.000₫ thanh toán mỗi năm' : '/ người / tháng · thanh toán hàng tháng'
}))
