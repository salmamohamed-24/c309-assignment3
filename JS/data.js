const staffRecords = [
  { id: 101, name: 'Ziad Mansour', age: 29, location: 'Giza', specialty: 'DevOps Engineer' },
  { id: 102, name: 'Salma El-Sayed', age: 31, location: 'Cairo', specialty: 'Product Designer' },
  { id: 103, name: 'Karim Nabil', age: 26, location: 'Mansoura', specialty: 'Frontend Developer' },
  { id: 104, name: 'Nouran Ezzat', age: 34, location: 'Alexandria', specialty: 'Security Specialist' },
  { id: 105, name: 'Hazem Soliman', age: 41, location: 'Cairo', specialty: 'Engineering Lead' },
  { id: 106, name: 'Menna Shaker', age: 23, location: 'Zagazig', specialty: 'UI Researcher' },
  { id: 107, name: 'Waleed Samy', age: 38, location: 'Suez', specialty: 'System Admin' },
  { id: 108, name: 'Heba Adel', age: 27, location: 'Port Said', specialty: 'Data Scientist' },
  { id: 109, name: 'Mahmoud Barakat', age: 36, location: 'Cairo', specialty: 'Backend Engineer' },
  { id: 110, name: 'Reem Khairy', age: 24, location: 'Tanta', specialty: 'QA Analyst' }
];


let textFilter = '';
let activeField = null;
let sortDirection = 'asc';


const gridBody = document.getElementById('gridDisplayBody');
const filterInput = document.getElementById('queryBox');
const btnClear = document.getElementById('resetQueryBtn');
const sortNameBtn = document.getElementById('btnSortName');
const sortAgeBtn = document.getElementById('btnSortAge');
const restoreBtn = document.getElementById('btnRestore');
const iconName = document.getElementById('lblSortName');
const iconAge = document.getElementById('lblSortAge');

function sanitize(val) {
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function refreshGrid() {
  const query = textFilter.trim().toLowerCase();

  let visibleRecords = staffRecords.filter(item => {
    if (!query) return true;
    return (
      item.name.toLowerCase().includes(query) ||
      String(item.age).includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.specialty.toLowerCase().includes(query)
    );
  });


  if (activeField) {
    visibleRecords.sort((first, second) => {
      const a = first[activeField];
      const b = second[activeField];
      const comparison = typeof a === 'number' ? a - b : String(a).localeCompare(String(b));
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  
  btnClear.classList.toggle('hide-element', textFilter.length === 0);

 
  gridBody.innerHTML = '';

  if (visibleRecords.length === 0) {
    gridBody.innerHTML = '<tr><td colspan="5" class="empty-cell">No matching entries discovered.</td></tr>';
    return;
  }

  const rowsHtml = visibleRecords.map((person, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${sanitize(person.name)}</td>
      <td>${sanitize(person.age)}</td>
      <td>${sanitize(person.location)}</td>
      <td>${sanitize(person.specialty)}</td>
    </tr>
  `).join('');

  gridBody.innerHTML = rowsHtml;
}

function setSorting(fieldKey) {
  if (activeField === fieldKey) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    activeField = fieldKey;
    sortDirection = 'asc';
  }

 
  sortNameBtn.classList.toggle('btn-selected', activeField === 'name');
  sortAgeBtn.classList.toggle('btn-selected', activeField === 'age');

  iconName.textContent = activeField === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕';
  iconAge.textContent = activeField === 'age' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕';

  refreshGrid();
}


filterInput.addEventListener('input', (e) => {
  textFilter = e.target.value;
  refreshGrid();
});

btnClear.addEventListener('click', () => {
  filterInput.value = '';
  textFilter = '';
  refreshGrid();
  filterInput.focus();
});

sortNameBtn.addEventListener('click', () => setSorting('name'));
sortAgeBtn.addEventListener('click', () => setSorting('age'));

restoreBtn.addEventListener('click', () => {
  filterInput.value = '';
  textFilter = '';
  activeField = null;
  sortDirection = 'asc';
  sortNameBtn.classList.remove('btn-selected');
  sortAgeBtn.classList.remove('btn-selected');
  iconName.textContent = '↕';
  iconAge.textContent = '↕';
  refreshGrid();
});


refreshGrid();