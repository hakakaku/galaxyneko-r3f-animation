import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Texts(props) {
	const cat = useLoader(GLTFLoader, "/models/cat.glb");
	const neko = useLoader(GLTFLoader, "/models/neko.glb");

	return (
		<group name="texts">
			<mesh position={[0, 0.4, 0]}>
				<primitive object={cat.scene.children[0].geometry} />
				<meshNormalMaterial />
			</mesh>
			<mesh position={[0, -0.8, 0]}>
				<primitive object={neko.scene.children[0].geometry} />
				<meshNormalMaterial />
			</mesh>
		</group>
	);
}

export default Texts;
