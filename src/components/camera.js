import { PerspectiveCamera } from "@react-three/drei";

function Camera({ bufferSize }) {
	return (
		<>
			<PerspectiveCamera
				makeDefault
				position={[0, 0, 3]}
				fov={105}
				near={0.1}
				far={bufferSize}
			/>
		</>
	);
}

export default Camera;
