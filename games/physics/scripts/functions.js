function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getField(field, cellSize) {
  const places = [];
  const width = Math.trunc(field.width / cellSize);
  const height = Math.trunc(field.height / cellSize);
  console.log(width);
  console.log(height);
  for (let i = 0; i < width * height; i++) {
    places[i] = {
      x: Math.trunc(i % width) * cellSize + cellSize / 2, 
      y: Math.trunc(i / height) * cellSize + cellSize / 2,
    };
  }
  console.log(places);
  return places;
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

function info(...params) {
  params.forEach((v, i) => {
    const elem = document.getElementById(`menu_line${i}`);
    elem.innerText = v;
  });
}

function normalize(v) {
  while (v.x < -1 || v.x > 1 || v.y < -1 || v.y > 1) {
    v.x /= 10;
    v.y /= 10;
  }
  return v;
}

function vabs(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function getVector(p1, p2, length, value) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const coeff = value / length;
  return {
    x: dx * coeff,
    y: dy * coeff
  }
}