import { useFrame } from "@react-three/fiber";
import { MeshNormalMaterial, TorusGeometry } from "three";
import { useMemo, useRef } from "react";

function Donuts({ donutsNumber, donutSize, bufferSize, position, name }) {
	const donuts = useMemo(
		() => generateDonuts(donutsNumber, bufferSize),
		[donutsNumber, bufferSize]
	);
	const material = new MeshNormalMaterial();
	const geometry = new TorusGeometry(donutSize, donutSize / 5, 16, 45);

	return (
		<group position={position} name={name}>
			{donuts.map((donut, index) => (
				<Donut
					key={index}
					geometry={geometry}
					material={material}
					position={donut.position}
					rotation={donut.rotation}
					scale={donut.scale}
				/>
			))}
		</group>
	);
}

function Donut({ ...prop }) {
	const donutRef = useRef();
	useFrame((state, delta) => {
		donutRef.current.rotation.x += Math.random() * 0.5;
	});

	return <mesh {...prop} ref={donutRef}></mesh>;
}

function generateDonuts(num, bufferSize) {
	const donuts = [];
	for (let i = 0; i < num; i++) {
		const donut = {};
		const scale = Math.pow(Math.random(), 2) + 2;
		donut.position = [
			(Math.random() - 0.5) * 200,
			(Math.random() - 0.5) * 200,
			-Math.random() * bufferSize,
		];
		donut.rotation = [Math.random() * Math.PI, Math.random() * Math.PI, 0];
		donut.scale = [scale, scale, scale];
		donuts.push(donut);
	}
	return donuts;
}

export default Donuts;
