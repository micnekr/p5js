// module aliases
let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Constraint = Matter.Constraint,
  Bodies = Matter.Bodies;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
  element: document.body,
  engine: engine
});

engine.world.gravity.y = 0;


let orbit = Bodies.circle(250, 50, 80, {
  force: {
    x: 0,
    y: 10
  },
  friction: 0,
  frictionAir: 0,
  frictionStatic: 0
});
let ground = Bodies.rectangle(400, 610, 810, 60, {
  isStatic: true
});

var constraint = Constraint.create({
  bodyA: orbit,
  length: 100,
  pointB: {
    x: 350,
    y: 50
  },
  stiffness: 0.2
})

// add all of the bodies to the world
World.add(engine.world, [orbit, ground, constraint]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);