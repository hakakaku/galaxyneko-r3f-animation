import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { MathUtils } from "three";

function Controls({ speed, bufferSize }) {
	const pointer = { ishold: false };

	let cameraTargetX = 0;
	let catTargetX = 0;
	let flyingTarget = [0, 0, 0];

	// disable right click
	useEffect(() => {
		window.oncontextmenu = (e) => {
			e.preventDefault();
		};
	}, []);

	function handlePointerHold(e) {
		e.preventDefault();
		if (e.type === "pointerdown") {
			pointer.ishold = true;
		}
		if (e.type === "pointerup") {
			pointer.ishold = false;
		}
	}

	useFrame(({ camera, scene }, delta) => {
		const flying = scene.getObjectByName("flying");
		const texts = scene.getObjectByName("texts");
		const cat = scene.getObjectByName("cat");
		const donuts0 = scene.getObjectByName("donuts0");
		const donuts1 = scene.getObjectByName("donuts1");

		// camera pans following the pointer
		window.addEventListener("pointermove", (e) => {
			cameraTargetX = (e.clientX / window.innerWidth - 0.5) * -0.8;
			catTargetX = (e.clientX / window.innerWidth - 0.5) * -5;
		});
		camera.position.x = MathUtils.damp(
			camera.position.x,
			cameraTargetX,
			10,
			delta
		);
		cat.position.x = MathUtils.damp(cat.position.x, catTargetX, 10, delta);

		// camera and text fly forward when pointer down
		window.addEventListener("pointerdown", handlePointerHold);
		window.addEventListener("pointerup", handlePointerHold);
		if (pointer.ishold) {
			flyingTarget[2] -= speed * delta;

			// camera randomly shake when flying

			camera.position.x = MathUtils.damp(
				camera.position.x,
				(Math.random() - 0.5) * 4,
				0.4,
				delta
			);

			camera.position.y = MathUtils.damp(
				camera.position.y,
				(Math.random() - 0.5) * 4,
				0.4,
				delta
			);

			texts.position.z = MathUtils.damp(
				texts.position.z,
				camera.position.z + 2,
				2,
				delta
			);
			cat.position.z = MathUtils.damp(
				cat.position.z,
				camera.position.z - 5,
				5,
				delta
			);
		}

		if (!pointer.ishold) {
			texts.position.z = MathUtils.damp(
				texts.position.z,
				camera.position.z - 3,
				2,
				delta
			);
			cat.position.z = MathUtils.damp(
				cat.position.z,
				camera.position.z + 2,
				5,
				delta
			);
		}

		flying.position.z = MathUtils.damp(
			flying.position.z,
			flyingTarget[2],
			5,
			delta
		);

		camera.lookAt(flying.position);

		// reuse two buffer areas of donuts to optimise performance
		if (
			0 < donuts0.position.z - flying.position.z &&
			0 < donuts1.position.z - flying.position.z
		) {
			if (donuts0.position.z < donuts1.position.z) {
				donuts1.position.z -= bufferSize * 2;
			} else {
				donuts0.position.z -= bufferSize * 2;
			}
		}
	});

	return <></>;
}

export default Controls;
