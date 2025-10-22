import { Bloom } from './Components/Camera/MainCamera/PostProcess/Bloom/index.ts';
import { Blur } from './Components/Camera/MainCamera/PostProcess/Blur/index.ts';
import { ColorGrading } from './Components/Camera/MainCamera/PostProcess/ColorGrading/index.ts';
import { FXAA } from './Components/Camera/MainCamera/PostProcess/FXAA/index.ts';
import { Finalize } from './Components/Camera/MainCamera/PostProcess/Finalize/index.ts';
import { Glitch } from './Components/Camera/MainCamera/PostProcess/Glitch/index.ts';
import { OverlayMixer } from './Components/Camera/MainCamera/PostProcess/OverlayMixer/index.ts';
import { PixelSort } from './Components/Camera/MainCamera/PostProcess/PixelSort/index.ts';
import { MainCamera } from './Components/Camera/MainCamera/index.ts';
import { MizuBall } from './Components/Demo4/Common/MizuBall/index.ts';
import { ShaderMotionGraphics } from './Components/Demo4/Common/ShaderMotionGraphics/index.ts';
import { Shari } from './Components/Demo4/Common/Shari/index.ts';
import { SkyBox } from './Components/Demo4/Common/SkyBox/index.ts';
import { Maguro } from './Components/Demo4/Maguro/Maguro/index.ts';
import { Sashimi } from './Components/Demo4/Maguro/Sashimi/index.ts';
import { Music } from './Components/Demo4/Music/index.ts';
import { TruchetSushiLane } from './Components/Demo4/TruchetSushiLane/index.ts';
import { ShakeViewer } from './Components/ObjectControls/CameraShake/index.ts';
import { LookAt } from './Components/ObjectControls/LookAt/index.ts';
import { ObjectRotate } from './Components/ObjectControls/ObjectRotate/index.ts';
import { TextureGenerator } from './Components/Texture/TextureGenerator/index.ts';
import { BLidgeClient } from './Components/Utilities/BLidgeClient/index.ts';
import { UniformControls } from './Components/Utilities/UniformsControls/index.ts';
import { OrbitControls } from './Components/_DevOnly/OrbitControls/index.ts';
import { RaymarchCube } from './Components/_Samples/RaymarchCube/index.ts';
import { RaymarchMesh } from './Components/_Templates/RaymarchMesh/index.ts';
import { ShaderMesh } from './Components/_Templates/ShaderMesh/index.ts';

export const COMPONENTLIST: {[key: string]: any} = {
	Camera: {
		MainCamera,
	},
	Demo4: {
		Common: {
			MizuBall,
			ShaderMotionGraphics,
			Shari,
			SkyBox,
		},
		Maguro: {
			Maguro,
			Sashimi,
		},
		Music,
		TruchetSushiLane,
	},
	ObjectControls: {
		ShakeViewer,
		LookAt,
		ObjectRotate,
	},
	Texture: {
		TextureGenerator,
	},
	Utilities: {
		BLidgeClient,
		UniformControls,
	},
	_DevOnly: {
		OrbitControls,
	},
	_Samples: {
		RaymarchCube,
	},
	_Templates: {
		RaymarchMesh,
		ShaderMesh,
	},
};
