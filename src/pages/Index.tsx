
import RotatingCube from "../components/RotatingCube";

const Index = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 to-black">
      <RotatingCube />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Interactive 3D Cube
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Click and drag to rotate • Scroll to zoom
        </p>
      </div>
    </div>
  );
};

export default Index;
