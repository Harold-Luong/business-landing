document.documentElement.classList.add('js')
const menu = document.querySelector('.menu-toggle')
const nav = document.querySelector('#navigation')
menu.hidden = false
function closeMenu() { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false') }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true'
  menu.setAttribute('aria-expanded', String(open))
  nav.classList.toggle('is-open', open)
})
nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu() })
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus() }
})
matchMedia('(min-width: 701px)').addEventListener('change', closeMenu)
document.querySelector('.filters').hidden = false
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)))
  let count = 0
  document.querySelectorAll('.project-card').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter
    if (!card.hidden) count++
  })
  document.querySelector('#filter-status').textContent = `Hiển thị ${count} không gian.`
}))
const dialog = document.querySelector('#project-dialog')
document.querySelector('.project-stories').hidden = true
document.querySelectorAll('[data-project]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault()
  const card = link.closest('.project-card')
  const picture = card.querySelector('img')
  document.querySelector('#dialog-title').textContent = card.querySelector('h3').textContent
  document.querySelector('#dialog-description').textContent = document.getElementById(link.dataset.project).querySelector('p').textContent
  document.querySelector('#dialog-image').src = picture.src
  document.querySelector('#dialog-image').alt = picture.alt
  dialog.showModal()
  document.body.classList.add('modal-open')
}))
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close())
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'))
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect()
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close()
})
