const members = [
  { id: 'ma', name: 'Minh Anh', initials: 'MA', role: 'Product designer', color: 'lavender' },
  { id: 'lt', name: 'Linh Trần', initials: 'LT', role: 'Brand designer', color: 'peach' },
  { id: 'hn', name: 'Hà Nguyễn', initials: 'HN', role: 'Product manager', color: 'lime' },
  { id: 'qd', name: 'Quang Đỗ', initials: 'QĐ', role: 'Frontend developer', color: 'blue' },
]
const projects = [
  { id: 'website', name: 'Website launch', description: 'Thiết kế và triển khai website giới thiệu sản phẩm.', color: 'green', icon: '↗', background: 'lime' },
  { id: 'brand', name: 'Brand refresh', description: 'Cập nhật logo, màu sắc và hướng dẫn sử dụng thương hiệu.', color: 'purple', icon: '✳', background: 'lavender' },
  { id: 'mobile', name: 'Orbit mobile', description: 'Thiết kế các màn hình quản lý công việc trên điện thoại.', color: 'orange', icon: '◉', background: 'peach' },
]
const statuses = { todo: 'Cần làm', doing: 'Đang làm', done: 'Hoàn thành' }
const pages = {
  overview: ['Tổng quan', 'Tổng quan công việc', 'Tiến độ dự án và các việc cần xử lý của Studio workspace.'],
  tasks: ['Công việc', 'Bảng công việc', 'Tìm công việc, mở chi tiết hoặc tạo một việc mới để dùng thử.'],
  projects: ['Dự án', 'Dự án của đội', 'Theo dõi số việc hoàn thành và mở bảng công việc của từng dự án.'],
  team: ['Thành viên', 'Thành viên workspace', 'Vai trò và số công việc đang được giao cho từng người.'],
}
const dateOffset = days => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
const tasks = [
  { id: 1, title: 'Thiết kế trang dịch vụ', project: 'website', owner: 'ma', status: 'doing', priority: 'high', due: dateOffset(1), description: 'Hoàn thiện bố cục nội dung và giao diện desktop, mobile.' },
  { id: 2, title: 'Lập trình form liên hệ', project: 'website', owner: 'qd', status: 'todo', priority: 'high', due: dateOffset(2), description: 'Thêm trường thông tin, kiểm tra dữ liệu và trạng thái phản hồi.' },
  { id: 3, title: 'Thống nhất cấu trúc website', project: 'website', owner: 'hn', status: 'done', priority: 'normal', due: dateOffset(-1), description: 'Xác nhận danh sách trang và luồng điều hướng với đội sản phẩm.' },
  { id: 4, title: 'Đề xuất bảng màu thương hiệu', project: 'brand', owner: 'lt', status: 'doing', priority: 'normal', due: dateOffset(1), description: 'Chuẩn bị hai phương án bảng màu và ví dụ ứng dụng.' },
  { id: 5, title: 'Hoàn thiện hướng dẫn logo', project: 'brand', owner: 'lt', status: 'todo', priority: 'normal', due: dateOffset(4), description: 'Quy định kích thước tối thiểu, khoảng cách và các phiên bản logo.' },
  { id: 6, title: 'Khảo sát nhận diện hiện tại', project: 'brand', owner: 'hn', status: 'done', priority: 'normal', due: dateOffset(-2), description: 'Tổng hợp các tài liệu và điểm cần cập nhật trong bộ nhận diện.' },
  { id: 7, title: 'Thiết kế màn hình công việc', project: 'mobile', owner: 'ma', status: 'doing', priority: 'high', due: dateOffset(2), description: 'Bổ sung trạng thái trống và bộ lọc công việc cho màn hình nhỏ.' },
  { id: 8, title: 'Review luồng tạo dự án', project: 'mobile', owner: 'hn', status: 'todo', priority: 'normal', due: dateOffset(3), description: 'Kiểm tra các bước nhập thông tin và mời thành viên vào dự án.' },
  { id: 9, title: 'Chuẩn bị component mobile', project: 'mobile', owner: 'qd', status: 'done', priority: 'normal', due: dateOffset(-1), description: 'Thiết lập button, input và thẻ công việc cho bản mẫu.' },
]
const content = document.querySelector('#app-content')
const dialog = document.querySelector('#task-dialog')
const form = document.querySelector('#task-form')
const statusMessage = document.querySelector('#app-status')
const sidebar = document.querySelector('#app-navigation')
const menu = document.querySelector('#sidebar-toggle')
let view = 'overview', layout = 'board', search = '', projectFilter = '', ownerFilter = '', opener
const activity = [{ owner: 'hn', text: 'Hà Nguyễn đã tạo workspace mẫu.', detail: 'Studio workspace · Dữ liệu minh họa' }]
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const memberFor = id => members.find(member => member.id === id)
const projectFor = id => projects.find(project => project.id === id)
const avatar = id => { const member = memberFor(id); return `<span class="avatar ${member.color}" title="${member.name}" aria-label="${member.name}">${member.initials}</span>` }
const projectSymbol = project => `<span class="project-symbol ${project.background}" aria-hidden="true">${project.icon}</span>`
const priorityTag = priority => `<span class="tag ${priority === 'high' ? 'high' : ''}">${priority === 'high' ? 'Ưu tiên cao' : 'Bình thường'}</span>`
const formatDate = date => new Date(`${date}T12:00:00`).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
function projectStats(id) {
  const items = tasks.filter(task => task.project === id)
  const done = items.filter(task => task.status === 'done').length
  return { total: items.length, done, percent: items.length ? Math.round(done / items.length * 100) : 0 }
}
function todayRow(task) {
  return `<div class="today-row"><input type="checkbox" data-complete="${task.id}" ${task.status === 'done' ? 'checked' : ''} aria-label="Hoàn thành: ${escapeHtml(task.title)}"><div><button class="task-link ${task.status === 'done' ? 'completed' : ''}" data-edit="${task.id}">${escapeHtml(task.title)}</button><small>${projectFor(task.project).name} · Hạn ${formatDate(task.due)}</small></div>${priorityTag(task.priority)}${avatar(task.owner)}</div>`
}
function renderOverview() {
  const done = tasks.filter(task => task.status === 'done').length
  const doing = tasks.filter(task => task.status === 'doing').length
  const activeProjects = projects.filter(project => projectStats(project.id).percent < 100).length
  const pending = tasks.filter(task => task.status !== 'done').sort((a, b) => a.due.localeCompare(b.due)).slice(0, 4)
  content.innerHTML = `<div class="metrics">
    <article class="metric"><div class="metric-label">Dự án đang chạy <span aria-hidden="true">▤</span></div><strong>${activeProjects}</strong><small>Trong ${projects.length} dự án của đội</small></article>
    <article class="metric"><div class="metric-label">Tổng công việc <span aria-hidden="true">☷</span></div><strong>${tasks.length}</strong><small>Trong tất cả dự án</small></article>
    <article class="metric"><div class="metric-label">Đang thực hiện <span aria-hidden="true">◷</span></div><strong>${doing}</strong><small>${tasks.length - done - doing} công việc chưa bắt đầu</small></article>
    <article class="metric highlight"><div class="metric-label">Đã hoàn thành <span aria-hidden="true">✓</span></div><strong>${done}<small> / ${tasks.length}</small></strong><small>${Math.round(done / tasks.length * 100)}% tổng số công việc</small></article>
  </div><div class="overview-grid"><div class="overview-left">
    <section class="panel"><div class="panel-heading"><div><h2>Tiến độ dự án</h2><p>Cập nhật từ trạng thái công việc</p></div><a href="#projects">Xem tất cả ↗</a></div>${projects.map(project => {
      const stats = projectStats(project.id)
      return `<a class="project-row" href="#tasks" data-project-link="${project.id}">${projectSymbol(project)}<div><strong>${project.name}</strong><p>${stats.done}/${stats.total} công việc hoàn thành</p></div><div class="project-progress"><small>${stats.percent}%</small><div class="progress-track"><i style="width:${stats.percent}%"></i></div></div></a>`
    }).join('')}</section>
    <section class="panel"><div class="panel-heading"><div><h2>Công việc sắp đến hạn</h2><p>Đánh dấu hoàn thành hoặc mở chi tiết</p></div><a href="#tasks">Xem bảng ↗</a></div>${pending.length ? pending.map(todayRow).join('') : '<p class="empty">Không còn công việc cần xử lý.</p>'}</section>
  </div><div class="overview-right"><section class="focus-panel"><span class="focus-orbit" aria-hidden="true"></span><p class="eyebrow">CÔNG VIỆC CỦA BẠN</p><h2>${tasks.filter(task => task.owner === 'ma' && task.status !== 'done').length} công việc<br>đang chờ xử lý.</h2><p>Minh Anh · Product designer<br>Xem phân công và cập nhật trạng thái.</p><a href="#tasks" data-owner-link="ma">Mở danh sách của tôi →</a></section>
    <section class="panel"><div class="panel-heading"><h2>Hoạt động gần đây</h2><span class="tag">Trong phiên demo</span></div><div class="activity">${activity.slice(0, 5).map(item => `<div class="activity-item">${avatar(item.owner)}<div><p>${escapeHtml(item.text)}</p><small>${escapeHtml(item.detail)}</small></div></div>`).join('')}</div></section>
    <section class="panel"><div class="panel-heading"><div><h2>Thành viên workspace</h2><p>4 thành viên mẫu</p></div><a href="#team">Xem ↗</a></div><div class="activity">${members.map(member => `<div class="activity-item">${avatar(member.id)}<div><p>${member.name}</p><small>${member.role}</small></div></div>`).join('')}</div></section>
  </div></div>`
}
function filteredTasks() {
  const query = search.trim().toLocaleLowerCase('vi')
  return tasks.filter(task => (!projectFilter || task.project === projectFilter) && (!ownerFilter || task.owner === ownerFilter) && (!query || `${task.title} ${task.description}`.toLocaleLowerCase('vi').includes(query)))
}
function taskCard(task) {
  const project = projectFor(task.project)
  return `<button class="task-card" data-edit="${task.id}" aria-label="Mở công việc: ${escapeHtml(task.title)}"><small><i class="project-dot ${project.color}"></i>${project.name}</small><h3>${escapeHtml(task.title)}</h3><p>${escapeHtml(task.description || 'Chưa có mô tả.')}</p>${priorityTag(task.priority)}<div class="task-card-bottom"><time datetime="${task.due}">◷ ${formatDate(task.due)}</time>${avatar(task.owner)}</div></button>`
}
function renderTaskResults() {
  const items = filteredTasks()
  document.querySelector('#result-count').textContent = `${items.length} / ${tasks.length} công việc`
  const results = document.querySelector('#task-results')
  if (layout === 'board') {
    results.className = 'board'
    results.innerHTML = Object.entries(statuses).map(([status, label]) => {
      const column = items.filter(task => task.status === status)
      return `<section class="board-column" aria-label="${label}"><h2 class="column-title"><i class="project-dot ${status === 'todo' ? 'orange' : status === 'doing' ? 'purple' : 'green'}"></i>${label} <b>${column.length}</b><button data-add-status="${status}" aria-label="Thêm công việc: ${label}">＋</button></h2>${column.length ? column.map(taskCard).join('') : '<p class="empty">Không có công việc phù hợp.</p>'}</section>`
    }).join('')
  } else {
    results.className = 'panel'
    results.innerHTML = items.length ? items.map(task => `<div class="list-row"><button class="task-link" data-edit="${task.id}">${escapeHtml(task.title)}</button><span>${projectFor(task.project).name}</span><span class="tag">${statuses[task.status]}</span>${avatar(task.owner)}</div>`).join('') : '<p class="empty">Không tìm thấy công việc. Thử đổi từ khóa hoặc bộ lọc.</p>'
  }
}
function renderTasks() {
  content.innerHTML = `<div class="toolbar"><label class="search"><span aria-hidden="true">⌕</span><input id="task-search" type="search" aria-label="Tìm công việc" placeholder="Tìm theo tên hoặc mô tả…" value="${escapeHtml(search)}"></label>
    <select id="project-filter" aria-label="Lọc theo dự án"><option value="">Tất cả dự án</option>${projects.map(project => `<option value="${project.id}" ${projectFilter === project.id ? 'selected' : ''}>${project.name}</option>`).join('')}</select>
    <select id="owner-filter" aria-label="Lọc theo thành viên"><option value="">Tất cả thành viên</option>${members.map(member => `<option value="${member.id}" ${ownerFilter === member.id ? 'selected' : ''}>${member.name}</option>`).join('')}</select>
    <div class="view-switch" role="group" aria-label="Cách hiển thị"><button data-layout="board" aria-pressed="${layout === 'board'}">▦ Bảng</button><button data-layout="list" aria-pressed="${layout === 'list'}">☷ Danh sách</button></div></div>
    <p class="result-count" id="result-count" role="status"></p><div id="task-results"></div>`
  renderTaskResults()
}
function renderProjects() {
  content.innerHTML = `<div class="projects-grid">${projects.map(project => {
    const stats = projectStats(project.id)
    return `<article class="project-card"><div class="project-card-top">${projectSymbol(project)}<span class="tag">${stats.percent === 100 ? 'Hoàn thành' : 'Đang thực hiện'}</span></div><h2>${project.name}</h2><p>${project.description}</p><div class="project-detail"><span>${stats.done}/${stats.total} hoàn thành</span><strong>${stats.percent}%</strong></div><div class="progress-track"><i style="width:${stats.percent}%"></i></div><a class="button" href="#tasks" data-project-link="${project.id}">Mở bảng công việc ↗</a></article>`
  }).join('')}</div>`
}
function renderTeam() {
  content.innerHTML = `<div class="team-grid">${members.map(member => {
    const assigned = tasks.filter(task => task.owner === member.id)
    const pending = assigned.filter(task => task.status !== 'done').length
    return `<article class="member-card">${avatar(member.id)}<h2>${member.name}</h2><p>${member.role}</p><span class="tag">Thành viên mẫu</span><div class="member-work"><strong>${pending}</strong> việc đang mở · ${assigned.length} việc được giao</div><a class="button" href="#tasks" data-owner-link="${member.id}">Xem công việc ↗</a></article>`
  }).join('')}</div>`
}
function render() {
  const page = pages[view]
  document.querySelector('#breadcrumb-name').textContent = page[0]
  document.querySelector('#page-title').textContent = page[1]
  document.querySelector('#page-description').textContent = page[2]
  document.querySelector('#page-eyebrow').textContent = `WORKSPACE / ${view.toUpperCase()}`
  document.querySelector('#nav-task-count').textContent = tasks.length
  document.title = `${page[0]} — Orbit demo`
  document.querySelectorAll('[data-view]').forEach(link => {
    if (link.dataset.view === view) link.setAttribute('aria-current', 'page')
    else link.removeAttribute('aria-current')
  })
  ;({ overview: renderOverview, tasks: renderTasks, projects: renderProjects, team: renderTeam })[view]()
}
function closeSidebar(returnFocus = false) {
  sidebar.classList.remove('is-open')
  menu.setAttribute('aria-expanded', 'false')
  menu.setAttribute('aria-label', 'Mở điều hướng')
  if (returnFocus) menu.focus()
}
function navigate() {
  const next = location.hash.slice(1)
  view = Object.hasOwn(pages, next) ? next : 'overview'
  render()
  closeSidebar()
}
function openTask(id, initialStatus = 'todo') {
  opener = document.activeElement
  form.reset()
  const task = tasks.find(item => item.id === Number(id))
  document.querySelector('#dialog-title').textContent = task ? 'Chi tiết công việc' : 'Tạo công việc'
  form.elements.id.value = task?.id || ''
  const values = task || { project: projectFilter || 'website', owner: ownerFilter || 'ma', status: initialStatus, priority: 'normal', due: dateOffset(1), title: '', description: '' }
  for (const name of ['project', 'owner', 'status', 'priority', 'due', 'title', 'description']) form.elements[name].value = values[name]
  form.elements.title.setCustomValidity('')
  dialog.showModal()
  document.body.classList.add('modal-open')
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true'
  sidebar.classList.toggle('is-open', open)
  menu.setAttribute('aria-expanded', String(open))
  menu.setAttribute('aria-label', open ? 'Đóng điều hướng' : 'Mở điều hướng')
})
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !dialog.open && menu.getAttribute('aria-expanded') === 'true') closeSidebar(true)
})
matchMedia('(min-width: 901px)').addEventListener('change', () => closeSidebar())
document.addEventListener('click', event => {
  const project = event.target.closest('[data-project-link]')
  const owner = event.target.closest('[data-owner-link]')
  if (project || owner) {
    projectFilter = project?.dataset.projectLink || ''
    ownerFilter = owner?.dataset.ownerLink || ''
    search = ''
    if (view === 'tasks') renderTasks()
  }
  const nav = event.target.closest('[data-view]')
  if (nav) {
    projectFilter = ''; ownerFilter = ''; search = ''
    if (location.hash === nav.hash) { render(); closeSidebar() }
  }
  const edit = event.target.closest('[data-edit]')
  if (edit) openTask(edit.dataset.edit)
  const add = event.target.closest('[data-add-status]')
  if (add) openTask(null, add.dataset.addStatus)
  const mode = event.target.closest('[data-layout]')
  if (mode) {
    layout = mode.dataset.layout
    document.querySelectorAll('[data-layout]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.layout === layout)))
    renderTaskResults()
  }
})
content.addEventListener('input', event => {
  if (event.target.id === 'task-search') { search = event.target.value; renderTaskResults() }
})
content.addEventListener('change', event => {
  if (event.target.id === 'project-filter') { projectFilter = event.target.value; renderTaskResults() }
  if (event.target.id === 'owner-filter') { ownerFilter = event.target.value; renderTaskResults() }
  if (event.target.matches('[data-complete]')) {
    const task = tasks.find(item => item.id === Number(event.target.dataset.complete))
    task.status = event.target.checked ? 'done' : 'todo'
    recordActivity(task, 'Cập nhật')
    render()
    document.querySelector('#new-task').focus({ preventScroll: true })
    statusMessage.textContent = `Đã cập nhật “${task.title}”: ${statuses[task.status]}.`
  }
})
function recordActivity(task, action) {
  activity.unshift({ owner: task.owner, text: `${action}: ${task.title}`, detail: `${projectFor(task.project).name} · ${statuses[task.status]}` })
}
document.querySelector('#new-task').addEventListener('click', () => openTask())
for (const id of ['close-dialog', 'cancel-dialog']) document.getElementById(id).addEventListener('click', () => dialog.close())
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open')
  const replacement = form.elements.id.value && document.querySelector(`[data-edit="${Number(form.elements.id.value)}"]`)
  const target = opener?.isConnected ? opener : replacement || document.querySelector('#new-task')
  target.focus({ preventScroll: true })
})
form.elements.title.addEventListener('input', () => form.elements.title.setCustomValidity(''))
form.addEventListener('submit', event => {
  event.preventDefault()
  const title = form.elements.title.value.trim()
  form.elements.title.setCustomValidity(title ? '' : 'Vui lòng nhập tên công việc.')
  if (!form.reportValidity()) return
  const values = Object.fromEntries(new FormData(form))
  const existing = tasks.find(task => task.id === Number(values.id))
  const task = { id: existing?.id || Math.max(...tasks.map(item => item.id)) + 1, title, description: values.description.trim(), project: values.project, owner: values.owner, status: values.status, priority: values.priority, due: values.due }
  if (existing) Object.assign(existing, task)
  else tasks.unshift(task)
  recordActivity(task, existing ? 'Cập nhật' : 'Tạo công việc')
  render()
  dialog.close()
  statusMessage.textContent = `Đã ${existing ? 'cập nhật' : 'tạo'} “${title}”. Thay đổi chỉ có trong phiên demo này.`
})
window.addEventListener('hashchange', navigate)
document.documentElement.classList.add('js')
menu.hidden = false
document.querySelector('#new-task').hidden = false
navigate()
