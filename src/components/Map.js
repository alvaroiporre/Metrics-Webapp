import React, { useEffect, useRef } from 'react';
import shapes from '../assets/country_shapes.json';

const formData = (data, center) => {
  const r = [];
  data.forEach((element) => {
    r.push({ x: (element[0] - center.lon) * 100 + 100, y: (element[1] - center.lat) * -100 + 100 });
  });
  return r;
};

const Map = () => {
  const canvasRef = useRef(null);
  const index = 120;
  const countryName = shapes[index].cntry_name;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Define the polygon vertices
    const data = shapes[index].geo_shape.geometry.coordinates;
    const center = shapes[index].geo_point_2d;

    data.forEach((poly) => {
      // Start drawing
      const polygon = formData(poly[0], center);
      context.beginPath();
      context.moveTo(polygon[0].x, polygon[0].y);

      // Draw lines between the vertices
      for (let i = 1; i < polygon.length; i += 1) {
        context.lineTo(polygon[i].x, polygon[i].y);
      }

      // Close the path to complete the polygon
      context.closePath();

      // Set the fill and stroke styles
      context.fillStyle = 'rgba(255, 0, 0, 0.5)';
      context.strokeStyle = 'black';

      // Fill and stroke the polygon
      context.fill();
      context.stroke();
    });
  }, []);

  return (
    <>
      <h2>{ countryName }</h2>
      <canvas ref={canvasRef} width={1000} height={1000} />
    </>
  );
};

export default Map;
