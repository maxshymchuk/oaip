function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPlaces(field, cellSize) {
  const places = [];
  const width = Math.trunc(field.width / cellSize);
  const height = Math.trunc(field.height / cellSize);
  console.log(`Field width: ${width}`);
  console.log(`Field height: ${height}`);
  for (let i = 0; i < width * height; i++) {
    places[i] = {
      x: Math.trunc(i % width) * cellSize + cellSize / 2, 
      y: Math.trunc(i / width) * cellSize + cellSize / 2,
    };
  }
  return places;
}

function getField() {
  const places = getPlaces({
    width: FIELD_WIDTH_PX, 
    height: FIELD_HEIGHT_PX
  }, GRID_CELL_SIZE_PX);
  const cells = [];
  for (let i = 0; i < cellsNumber; i++) {
    const family = families[random(0, families.length - 1)];
    cells[i] = {
      family: family.name,
      color: family.color,
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
      density: family.density,
      mass: family.mass,
    }
  }
  return cells;
}

function display(cells) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < cells.length; i++) {
    const size = cells[i].mass / cells[i].density;
    ctx.fillStyle = '#000000';
    // ctx.beginPath();
    // ctx.moveTo(cells[i].pos.x, cells[i].pos.y);
    // ctx.lineTo(
    //   cells[i].pos.x + cells[i].speed.x * vabs(cells[i].speed),
    //   cells[i].pos.y + cells[i].speed.y * vabs(cells[i].speed)
    // );
    // ctx.stroke();
    ctx.fillStyle = cells[i].color;
    ctx.beginPath();
    ctx.ellipse(
      cells[i].pos.x, 
      cells[i].pos.y, 
      size / 2, 
      size / 2, 
      0, 0, 2 * Math.PI
    );
    ctx.fill();
  };
}

function distance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function info() {
  document.getElementById('label_tick').innerText = time;
}

function vabs(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function getVector(p1, p2, length, value) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const coeff = length != 0 ? value / length : 0;
  return {
    x: dx * coeff,
    y: dy * coeff
  }
}

function restart() {
  console.log('-- RESTART --');
  cellsNumber = document.getElementById('input_cells_count').value;
  tick = document.getElementById('input_delay').value;
  time = 0;
  cells = getField();
  clearInterval(timer);
  display(cells);
  info();
  timer = setInterval(() => main(), tick);
}