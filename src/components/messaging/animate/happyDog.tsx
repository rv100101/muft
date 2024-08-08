import Lottie from "lottie-react";
import animationData from "@/assets/messages/animation/happydog.json";

const AnimationComponent = () => (
  <Lottie
    options={{
      loop: true,
      autoplay: true,
      animationData: animationData,
    }}
    height={50}
    width={50}
  />
);

export default AnimationComponent;
