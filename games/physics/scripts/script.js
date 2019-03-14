const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const FIELD_WIDTH_PX = window.innerWidth;
const FIELD_HEIGHT_PX = window.innerHeight - document.getElementById('menu').clientHeight;
const GRID_CELL_SIZE_PX = 10;

canvas.style.width = FIELD_WIDTH_PX;
canvas.width = FIELD_WIDTH_PX;
canvas.style.height = FIELD_HEIGHT_PX;
canvas.height = FIELD_HEIGHT_PX;

const families = [
  {
    name: 'Komunay', 
    color: '#FF0000',
    density: 1.2,
    mass: 4
  }, 
  {
    name: 'Neonasi', 
    color: '#00FF00',
    density: 1,
    mass: 10
  },
  {
    name: 'Ankapes', 
    color: '#0000FF',
    density: 3000,
    mass: 40000
  }
];

let cellsNumber = 250;
let tick = 20;
let time = 0;

let cells = getField();

display(cells);

function main() {
  const new_pos = [];
  for (let i = 0; i < cells.length; i++) {

    for (let j = 0; j < cells.length; j++) {
      if (cells[j] != cells[i]) {
        const coeff = 0.002;
        const dist = distance(cells[i].pos, cells[j].pos);
        
        const r = getVector(
          cells[i].pos, 
          cells[j].pos, 
          dist, 
          coeff * cells[j].mass / dist / dist
        );
        
        cells[i].speed.x += r.x;
        cells[i].speed.y += r.y;
      }
    }

    const angle = Math.atan(-cells[i].speed.y / cells[i].speed.x);
    const alpha = cells[i].speed.x < 0 ? Math.PI + angle : angle;
    
    new_pos.push({
      x: cells[i].pos.x + vabs(cells[i].speed) * Math.cos(alpha),
      y: cells[i].pos.y - vabs(cells[i].speed) * Math.sin(alpha)
    })
  }

  // moving
  for (let i = 0; i < cells.length; i++) {
    cells[i].pos = new_pos[i];
    
    // checking borders
    const size = cells[i].mass / cells[i].density;
    if (cells[i].pos.x <= size / 2 || cells[i].pos.x >= FIELD_WIDTH_PX - size / 2) {
      cells[i].pos.x = cells[i].pos.x <= size / 2 ? size / 2 : FIELD_WIDTH_PX - size / 2;
      cells[i].speed.x = -cells[i].speed.x;
    }
    if (cells[i].pos.y <= size / 2 || cells[i].pos.y >= FIELD_HEIGHT_PX - size / 2) {
      cells[i].pos.y = cells[i].pos.y <= size / 2 ? size / 2 : FIELD_HEIGHT_PX - size / 2;
      cells[i].speed.y = -cells[i].speed.y;
    }
  }
  info(time++);
  display(cells);
}

let timer = setInterval(() => main(), tick);