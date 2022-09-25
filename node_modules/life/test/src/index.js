import update from "../../lib/life"

let world = {
  rule: { birth: [ 3 ], survival: [ 2, 3 ] },
  cells: [ 127, 128, 128, 127, 129, 127, 128, 128, 128, 129 ]
}

let viewport = {
  halfsize: [ 128, 128 ],
  position: [ 0, 0 ]
}

actions: {
    update({ world }) {
      let next = update(world.cells, world.rule)
      world.prev = world.cells
      world.cells = next
    }
  }
}

let canvas = document.createElement("canvas")
let context = canvas.getContext("2d")
canvas.width = state.viewport.halfsize[0] * 2
canvas.height = state.viewport.halfsize[1] * 2

let image = context.getImageData(0, 0, canvas.width, canvas.height)
let view = {
  state: {
    root: canvas,
    context: context,
    image: image
  },
  actions: {
    render({ view }, { world }) {
      render(world.cells, image)
      context.putImageData(image, 0, 0)
    }
  }
}

document.body.appendChild(view.state.root)
requestAnimationFrame(loop)

function loop() {
  world.actions.update(world.state)
  world.cells = update(world.cells, world.rule)
  view.actions.render(view.state, app.state)
  requestAnimationFrame(loop)
}

function render(cells, image) {
  for (let i = 0; i < cells.length; i += 2) {
    let x = cells[i]
    let y = cells[i + 1]
    if (x >= 0 && y >= 0 && x < image.width && y < image.height) {
      let index = (y * image.width + x) * 4
      image.data[index + 0] = 0
      image.data[index + 1] = 0
      image.data[index + 2] = 0
      image.data[index + 3] = 255
    }
  }
}
