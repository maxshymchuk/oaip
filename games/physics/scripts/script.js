const FIELD_WIDTH_PX = 500;
const FIELD_HEIGHT_PX = 500;
const GRID_CELL_SIZE_PX = 10;
const CELLS_NUMBER = 20;
const TICK = 20;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.style.width = FIELD_WIDTH_PX;
canvas.width = FIELD_WIDTH_PX;
canvas.style.height = FIELD_HEIGHT_PX;
canvas.height = FIELD_HEIGHT_PX;

let cells = [];

const places = getField({width: FIELD_WIDTH_PX, height: FIELD_HEIGHT_PX}, GRID_CELL_SIZE_PX);

for (let i = 0; i < CELLS_NUMBER; i++) {
  const family = Object.keys(IFamilies)[random(0, Object.keys(IFamilies).length - 1)];

  cells[i] = {
    family: family,
    color: IFamilies[family].color,
    speed: {
      x: 0,
      y: 0
    },
    pos: (() => {
      const pos = random(0, places.length - 1);
      const res = places[pos];
      places.splice(pos, 1);
      return res;
    })(),
    density: IFamilies[family].density,
    mass: IFamilies[family].mass,
    responseRadius: IFamilies[family].responseRadius,
    //angle: random(0, 360) * Math.PI / 180,
  }
}
console.log(cells);

display(cells);

let gen = 0;
const timer = setInterval(() => {
  info(gen++, TICK);

  const new_pos = [];
  for (let i = 0; i < cells.length; i++) {

    // Angle method
    //
    // i.pos.x += i.speed * Math.cos(i.angle);
    // i.pos.y -= i.speed * Math.sin(i.angle);
    // if (i.pos.x <= i.size / 2 
    //   || i.pos.x >= FIELD_WIDTH_PX - i.size / 2
    //   || i.pos.y <= i.size / 2 
    //   || i.pos.y >= FIELD_HEIGHT_PX - i.size / 2) {
    //     i.angle = i.angle <= Math.PI ? 2 * Math.PI - i.angle : Math.PI - i.angle;
    //   }
    // 
    // Slower than using vectors

    for (let j = 0; j < cells.length; j++) {
      if (cells[j] != cells[i]) {
        const coeff = .02;
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

    //normalize(cells[i].speed.vector);
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
  display(cells);
}, TICK);
// clearInterval(timer);