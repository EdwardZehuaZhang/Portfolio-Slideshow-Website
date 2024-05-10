const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

const engine = Engine.create();
const world = engine.world;

engine.gravity.y = 0.8; 

const render = Render.create({
    element: document.getElementById("matter-container"),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false
    }
});

Engine.run(engine);
Render.run(render);

const ground = Bodies.rectangle(
    window.innerWidth ,
    window.innerHeight ,

    {
        isStatic: true,
        friction: 1.2, 
        restitution: 0.1, 
        render: {
            visible: false
        }
    }
);
World.add(world, ground);

function addFallingImage() {
    const imageWidth = 2; 
    const imageHeight = 2;

    const imageBody = Bodies.rectangle(
        Math.random() * window.innerWidth,
        -50,
        imageWidth,
        imageHeight,
        {
            angle: Math.random() * Math.PI * 2,
            restitution: 0.2,
            friction: 1.2,
            frictionAir: 0.15,
            density: 0.001,
            angularDamping: 0.99, 
            render: {
                sprite: {
                    texture: "assets/长江奶茶.png",
                    xScale: imageWidth / 80,
                    yScale: imageHeight / 80
                }
            }
        }
    );

    Matter.Body.setAngularVelocity(imageBody, 0.03);

    World.add(world, imageBody);
}
