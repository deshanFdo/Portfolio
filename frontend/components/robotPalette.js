// Use Spline's public material-layer API. Geometry, video eyes and events stay intact.
export function applyRobotPalette(app, palette) {
  if (palette !== "ferrari") return;

  for (const object of app.getAllObjects()) {
    const layers = object.material?.layers;
    if (!layers) continue;

    const color = layers.find(layer => layer.type === "color");
    const light = layers.find(layer => layer.type === "light");
    if (!color || !light) continue;

    const face = layers.some(layer => layer.type === "video");
    const shell = !face && light.category === "phong";
    color.color = face ? "#edcf4c" : shell ? "#c82230" : "#202026";

    // Reduce the original oil-slick and mirror effects so the painted livery reads.
    // Keep a little matcap reflection and the existing light layer for depth.
    for (const layer of layers) {
      if (layer.type === "rainbow") layer.alpha = 0;
      if (layer.type === "matcap") layer.alpha = face ? 0.3 : shell ? 0.65 : 0.35;
      if (face && layer.type === "video") layer.alpha = 0.82;
    }

    if (light.category === "phong") light.alpha = face ? 0.7 : 0.65;
    if (light.category === "physical") {
      light.metalness = 0.55;
      light.roughness = 0.32;
    }
  }
}
