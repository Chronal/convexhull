import { mat4, vec3 } from "gl-matrix";
import { convexHull, face, edge } from "@/lib/convexhull.ts";

export function initWebGL(points: vec3[]) {
    const canvas: HTMLCanvasElement | null = document.querySelector("#glcanvas");

    if (canvas == null) {
        console.error("failed to find the canvas element")
        return;
    }

    const gl = canvas!.getContext("webgl2");

    if (gl == null) {
        console.error("failed to init webgl canvas");
        return;
    }

    gl.disable(gl.CULL_FACE);

    const vsSource = `#version 300 es
        in vec4 pos;
        in vec3 vertColor;
        out vec4 color;

        uniform mat4 view;
        uniform mat4 proj;

        void main() {
            color = vec4(vertColor, 1.0);
            gl_Position = proj * view * pos;
        }`;

    const fsSource = `#version 300 es
        precision mediump float;
        in vec4 color;
        out vec4 col;

        void main() {
            col = color;
        }`;

    let faces: face[] = Array.from(convexHull(points));

    let faceColorGen = [];
    let sum = 0;
    for (let i = 0; i < faces.length; ++i) {
        let r = Math.random();
        let g = Math.random();
        let b = Math.random();

        faceColorGen.push([r, g, b]);
        faceColorGen.push([r, g, b]);
        faceColorGen.push([r, g, b]);
        sum += 9;
    }

    let faceColors = new Float32Array(faceColorGen.flat());
    let chPoints = new Float32Array(
        faces.map((a) => [...a].map((b) => [...b]).flat()).flat(),
    );

    // Positions Buffer
    let posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, chPoints, gl.STATIC_DRAW);

    // Colors Buffer
    let colBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
    gl.bufferData(gl.ARRAY_BUFFER, faceColors, gl.STATIC_DRAW);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    const aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
    const proj = mat4.create();
    mat4.perspective(proj, Math.PI / 2, aspect, 1.0, 10.0);

    const view = mat4.create();
    mat4.translate(view, view, [0.0, 0.0, -3.0]);

    let vertShader = gl.createShader(gl.VERTEX_SHADER);

    if (vertShader == null) {
        console.error("Failed to create a vertShader");
        return;
    }

    gl.shaderSource(vertShader, vsSource);
    gl.compileShader(vertShader);

    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
        console.error(
            `Failed to compile vert shader: ${gl.getShaderInfoLog(vertShader)}`,
        );
        gl.deleteShader(vertShader);
        return;
    }

    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (fragShader == null) {
        console.error("Failed to create a frag shader");
        return;
    }

    gl.shaderSource(fragShader, fsSource);
    gl.compileShader(fragShader);
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
        console.error(
            `Failed to compile frag shader: ${gl.getShaderInfoLog(fragShader)}`,
        );
        gl.deleteShader(fragShader);
        return;
    }

    let program = gl.createProgram();
    if (program == null) {
        console.error("Failed to create a shader program");
        return;
    }
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(
            `Failed to compile shader programme: ${gl.getProgramInfoLog(program)}`,
        );
        return;
    }

    let vertPosAttr = gl.getAttribLocation(program, "pos");
    let colAttr = gl.getAttribLocation(program, "vertColor");
    let viewLoc = gl.getUniformLocation(program, "view");
    let projLoc = gl.getUniformLocation(program, "proj");

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.vertexAttribPointer(vertPosAttr, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertPosAttr);

    gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
    gl.vertexAttribPointer(colAttr, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colAttr);

    gl.disable(gl.CULL_FACE);
    gl.useProgram(program);
    gl.uniformMatrix4fv(viewLoc, false, view);
    gl.uniformMatrix4fv(projLoc, false, proj);

    gl.drawArrays(gl.TRIANGLES, 0, chPoints.length / 3);
}

// Functions to generate some points
export function generateCube() {
    let points = [
        [0.5, 0.5, 0.5],
        [-0.5, 0.5, 0.5],
        [0.5, -0.5, 0.5],
        [-0.5, -0.5, 0.5],

        [0.5, 0.5, -0.5],
        [-0.5, 0.5, -0.5],
        [0.5, -0.5, -0.5],
        [-0.5, -0.5, -0.5],
    ];

    return points.map((p) => vec3.fromValues(p[0], p[1], p[2]));
}

export function generatePyramid() {
    return [
        [2.0, 0.0, 0.0],
        [-1.0, 1.732, 0.0],
        [-1.0, -1.732, 0.0],
        [0.0, 0.0, 2.0],
    ].map((p) => vec3.fromValues(p[0], p[1], p[2]));
}

export function generateRandomPoints(n: number = 7) {
    let points = [];
    for (let i = 0; i < n; i = i + 1) {
        let vec = vec3.create();
        vec3.random(vec, 2);
        points.push(vec);
    }
    return points;
}
