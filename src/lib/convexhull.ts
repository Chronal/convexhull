import { vec3 } from "gl-matrix";

export type edge = [vec3, vec3];
export type face = vec3[];

export function convexHull(points: vec3[]): Set<face> {
	points.sort((p0, p1) => p0[0] - p1[0]);

	let faces: Set<face> = new Set();
	let initFace = findInitialFace([...points]);
	let faceQueue = [initFace];

	let exhaustedEdges: edge[] = [];

	let edgePool = edgesFromTriangle(initFace!);

	while (faceQueue.length != 0) {
		let face = faceQueue.shift() as face;
		let edges = edgesFromTriangle(face);
		for (let e of edges) {
			if (!contains(edgePool, e, compareEdges)) {
				continue;
			}

			let searchPoints = points.filter(
				(point) => !contains(face, point, compareVec3),
			);

			let v1 = vec3.create();
			let v2 = vec3.create();
			let insidePoint = vec3.create();
			let faceNormal = vec3.create();

			// p0p1
            vec3.sub(v1, face[1], face[0]);
			// p0p2
            vec3.sub(v2, face[2], face[0]);

			vec3.sub(insidePoint, searchPoints[0], face[0]);
			vec3.cross(faceNormal, v1, v2);

			if (vec3.dot(faceNormal, insidePoint) < 0) {
				// Flip normal direction if normal points inside
				vec3.cross(faceNormal, v2, v1);
			}

			let edgeVec = vec3.create();
			vec3.sub(edgeVec, e[1], e[0]);

			let refVec = vec3.create();
			vec3.cross(refVec, faceNormal, edgeVec);
			vec3.normalize(refVec, refVec);

			let p3 = findPointWithMaxAngle(searchPoints, e[0], refVec);
			let newFace: vec3[] = [e[0], e[1], p3]
            newFace.sort(compareVec3);

			let newEdges = edgesFromTriangle(newFace);

			let edgesToAdd = newEdges.filter(
				(edge: edge) =>
					!contains(edgePool, edge, compareEdges) &&
					!contains(exhaustedEdges, edge, compareEdges),
			);
			edgePool = edgePool.filter(
				(edge: edge) => !contains(newEdges, edge, compareEdges),
			);

			let exhausted = edgePool.filter((edge: edge) =>
				contains(newEdges, edge, compareEdges),
			);

			edgePool.push(...edgesToAdd);
			exhaustedEdges.push(...exhausted);
			faceQueue.push(newFace);
		}
		faces.add(face);
	}
	return faces;
}

// Assumes sorted input w.r.t. first co-ord
function findInitialFace(points: vec3[]) : vec3[] {
	// point with min x co-ordinate will be
	// part of a face on the convexhull
	let p1 = points.shift();

	// First plane is normal to n1
	let n1 = vec3.fromValues(1.0, 0.0, 0.0);

	// a2 is orthogonal to n1 and [0,1,0]
	let a2 = vec3.create();
	vec3.cross(a2, vec3.fromValues(0.0, 1.0, 0.0), n1);
	vec3.normalize(a2, a2);

	let p2 = findPointWithMaxAngle(points, p1!, a2);
	points = points.filter((a) => !vec3.equals(a, p2));

	let v = vec3.create();
	vec3.sub(v, p2, p1!);

	let a3 = vec3.create();
	vec3.cross(a3, vec3.fromValues(0.0, 0.0, 1.0), v);
	vec3.normalize(a3, a3);
	let p3 = findPointWithMaxAngle(points, p1!, a3);

    let face: vec3[] = [p1!, p2, p3]
	face.sort(compareVec3);

    return face;
}

function findPointWithMaxAngle(points:vec3[], refPoint: vec3, refVec: vec3) {
	let maxAngle = -Infinity;
	let ret = points[0];

	for (let p of points) {
		let v = vec3.create();
		vec3.sub(v, p, refPoint);
		let angle = vec3.angle(v, refVec);
		if (angle > maxAngle) {
			maxAngle = angle;
			ret = p;
		}
	}
	return ret;
}

function compareVec3(a: vec3, b: vec3): number {
	let r0 = a[0] - b[0];
	let r1 = a[1] - b[1];
	let r2 = a[2] - b[2];

	if (r0 != 0.0) {
		return r0;
	} else if (r1 != 0.0) {
		return r1;
	} else {
		return r2;
	}
}

function edgesFromTriangle(tri: vec3[]) : edge[] {
	let edges: edge[] = [
		[tri[0], tri[1]],
		[tri[0], tri[2]],
		[tri[1], tri[2]],
	];

    for (const e of edges) {
        e.sort(compareVec3);
    }

    edges.sort(compareEdges);
    return edges;
}

function compareEdges(e1: edge, e2:edge): number {
	e1.sort(compareVec3);
	e2.sort(compareVec3);
	let r1 = compareVec3(e1[0], e2[0]);
	let r2 = compareVec3(e1[1], e2[1]);
	if (r1 != 0.0) {
		return r1;
	}
	return r2;
}

function contains(arr: any[], elem: any, cmp: (arg1: any, arg2: any) => number): boolean {
	let ret = false;
	for (let a of arr) {
		if (cmp(a, elem) == 0) {
			ret = true;
			break;
		}
	}
	return ret;
}
