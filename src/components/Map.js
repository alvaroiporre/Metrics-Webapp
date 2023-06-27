import React, { useEffect, useRef, useState } from 'react';
import shapes from '../assets/country_shapes.json';

const formData = (data, limits) => {
  const width = limits.maxX - limits.minX;
  const height = limits.maxY - limits.minY;
  const scale = Math.min(400 / width, 400 / height);
  const r = [];
  data.forEach((element) => {
    r.push({
      x: (element[0] - limits.minX) * scale,
      y: 400 - ((element[1] - limits.minY) * scale),
    });
  });
  return r;
};

const getLimits = (data) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  if (data.length === 1) {
    console.log('entra1');
    data[0].forEach((point) => {
      const x = point[0];
      const y = point[1];
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
  } else {
    console.log('entra2');
    data.forEach((poly) => {
      poly[0].forEach((point) => {
        const x = point[0];
        const y = point[1];
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
    });
  }
  return {
    minX,
    minY,
    maxX,
    maxY,
  };
};

const Map = () => {
  const [index, setIndex] = useState(0);

  const changeMap = () => {
    setIndex(index + 1);
  };

  const changeMapBack = () => {
    setIndex(index - 1);
  };

  const canvasRef = useRef(null);
  const countryName = shapes[index].cntry_name;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 400, 400);

    // Define the polygon vertices
    const data = shapes[index].geo_shape.geometry.coordinates;
    const limits = getLimits(data);
    console.log('data', data);
    if (data.length === 1) {
      const polygon = formData(data[0], limits);
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
    } else {
      data.forEach((poly) => {
        // Start drawing
        const polygon = formData(poly[0], limits);
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
    }
  }, [index]);

  return (
    <>
      <h2>{countryName}</h2>
      <canvas ref={canvasRef} width={400} height={400} />
      <button onClick={changeMapBack}>Back</button>
      <button onClick={changeMap}>Next</button>
    </>
  );
};

export default Map;
