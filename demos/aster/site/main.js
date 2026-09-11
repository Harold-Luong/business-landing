const versions = { standard: { name: 'S5 Standard', price: 649000000 }, premium: { name: 'S5 Premium', price: 749000000 } }
const colors = { white: { name: 'Trắng ngọc', image: './assets/aster-white.png' }, graphite: { name: 'Xám graphite', image: './assets/aster-graphite.png' } }
const money = value => `${value.toLocaleString('vi-VN')}₫`
const form = document.querySelector('#car-form')
const dialog = document.querySelector('#request-dialog')
const summary = document.querySelector('#request-summary')
const copyStatus = document.querySelector('#request-status')
const menu = document.querySelector('#menu-toggle')
const navigation = document.querySelector('#navigation')
let version = 'standard', color = 'white'
function closeMenu(focus = false) {
  menu.setAttribute('aria-expanded', 'false')
  menu.setAttribute('aria-label', 'Mở menu')
  navigation.classList.remove('is-open')
  if (focus) menu.focus()
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true'
  menu.setAttribute('aria-expanded', String(open))
  menu.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu')
  navigation.classList.toggle('is-open', open)
})
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu() })
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu() })
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true) })
matchMedia('(min-width: 761px)').addEventListener('change', () => closeMenu())
function updateSelection() {
  const selectedVersion = versions[version], selectedColor = colors[color]
  document.querySelectorAll('[data-version]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.version === version)))
  document.querySelectorAll('[data-color]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.color === color)))
  document.querySelector('#stage-version').textContent = version.toUpperCase()
  document.querySelector('#selected-price').textContent = money(selectedVersion.price)
  document.querySelector('#color-name').textContent = selectedColor.name
  const carImage = document.querySelector('#car-image')
  carImage.src = selectedColor.image
  carImage.alt = `Aster S5 giả định màu ${selectedColor.name.toLocaleLowerCase('vi')}`
  form.elements.version.value = version
  form.elements.color.value = color
  document.querySelector('#selection-summary').textContent = `${selectedVersion.name} · ${selectedColor.name}`
  document.querySelector('#form-price').textContent = money(selectedVersion.price)
}
document.querySelectorAll('[data-version]').forEach(button => {
  button.disabled = false
  button.addEventListener('click', () => { version = button.dataset.version; updateSelection() })
})
document.querySelectorAll('[data-color]').forEach(button => button.addEventListener('click', () => { color = button.dataset.color; updateSelection() }))
form.elements.version.addEventListener('change', () => { version = form.elements.version.value; updateSelection() })
form.elements.color.addEventListener('change', () => { color = form.elements.color.value; updateSelection() })
function updatePurpose() {
  form.querySelector('[type="submit"]').textContent = form.elements.purpose.value === 'Lái thử' ? 'Tạo yêu cầu lái thử ↗' : 'Tạo yêu cầu báo giá ↗'
}
document.querySelectorAll('[data-purpose]').forEach(link => link.addEventListener('click', () => { form.elements.purpose.value = link.dataset.purpose; updatePurpose() }))
form.elements.purpose.addEventListener('change', updatePurpose)
for (const name of ['name', 'phone']) form.elements[name].addEventListener('input', () => form.elements[name].setCustomValidity(''))
form.addEventListener('submit', event => {
  event.preventDefault()
  form.elements.name.value = form.elements.name.value.trim()
  const phone = form.elements.phone.value.replace(/[\s().-]/g, '')
  form.elements.name.setCustomValidity(form.elements.name.value ? '' : 'Vui lòng nhập họ tên.')
  form.elements.phone.setCustomValidity(/^(?:0\d{9}|\+84\d{9})$/.test(phone) ? '' : 'Nhập số điện thoại gồm 10 số bắt đầu bằng 0, hoặc +84 và 9 số.')
  if (!form.reportValidity()) return
  const values = new FormData(form)
  summary.value = [
    'YÊU CẦU TƯ VẤN ASTER S5 — BẢN DEMO', '',
    `Nhu cầu: ${values.get('purpose')}`,
    `Họ tên: ${values.get('name')}`,
    `Điện thoại: ${phone}`,
    `Email: ${values.get('email').trim() || 'Không cung cấp'}`,
    `Khu vực: ${values.get('area')}`, '',
    `Phiên bản: ${versions[version].name}`,
    `Màu xe: ${colors[color].name}`,
    `Giá xe minh họa: ${money(versions[version].price)}`,
    'Chưa gồm phí đăng ký, bảo hiểm và các chi phí khác.', '',
    `Ghi chú: ${values.get('note').trim() || 'Không có'}`, '',
    'Xe, thông số và giá là dữ liệu minh họa. Phiếu chưa được gửi.',
  ].join('\n')
  copyStatus.textContent = ''
  dialog.showModal()
  document.body.classList.add('modal-open')
})
document.querySelector('#close-request').addEventListener('click', () => dialog.close())
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'))
document.querySelector('#copy-request').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(summary.value); copyStatus.textContent = 'Đã sao chép phiếu yêu cầu.' }
  catch { summary.focus(); summary.select(); copyStatus.textContent = 'Hãy sao chép phần đã chọn bằng Ctrl+C hoặc chức năng sao chép trên thiết bị.' }
})
document.querySelector('#download-request').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob(['\uFEFF', summary.value], { type: 'text/plain;charset=utf-8' }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'yeu-cau-aster-s5.txt'
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  copyStatus.textContent = 'Đã tạo file phiếu yêu cầu.'
})
document.documentElement.classList.add('js')
menu.hidden = false
document.querySelector('.color-picker').hidden = false
form.querySelector('[type="submit"]').disabled = false
