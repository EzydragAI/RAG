"use client";

import { useEffect, useState } from "react";

export function useScenePlayer(sceneCount: number, msPerScene = 2200) {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || sceneCount <= 1) return;
    const id = window.setTimeout(() => {
      setScene((current) => (current + 1) % sceneCount);
    }, msPerScene);
    return () => window.clearTimeout(id);
  }, [msPerScene, playing, scene, sceneCount]);

  return {
    scene,
    playing,
    setScene,
    play: () => setPlaying(true),
    pause: () => setPlaying(false),
    replay: () => {
      setScene(0);
      setPlaying(true);
    },
  };
}
