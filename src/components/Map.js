import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shapes from '../assets/country_shapes.json';
import { getLimits, formData } from '../maps/maps';

const Map = () => {
  const selectedCountry = useSelector((state) => state.countries.selectedCountry);
  const indexCountrySelected = useSelector((store) => store.countries.countriesIndexes);
  const index = 0 || indexCountrySelected[selectedCountry];

  const reference = useRef();
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  const canvasRef = useRef(null);
  const countryName = shapes[index].cntry_name;

  useEffect(() => {
    if (reference.current) {
      setDimensions({
        width: reference.current.offsetWidth,
        height: reference.current.offsetHeight,
      });
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, dimensions.width, dimensions.height);

    const data = shapes[index].geo_shape.geometry.coordinates;
    const limits = getLimits(data);
    if (data.length === 1) {
      const polygon = formData(data[0], limits, dimensions);
      context.beginPath();
      context.moveTo(polygon[0].x, polygon[0].y);

      for (let i = 1; i < polygon.length; i += 1) {
        context.lineTo(polygon[i].x, polygon[i].y);
      }

      context.closePath();

      context.fillStyle = 'rgba(255, 0, 0, 0.5)';
      context.strokeStyle = 'black';

      context.fill();
      context.stroke();
    } else {
      data.forEach((poly) => {
        const polygon = formData(poly[0], limits, dimensions);
        context.beginPath();
        context.moveTo(polygon[0].x, polygon[0].y);
        for (let i = 1; i < polygon.length; i += 1) {
          context.lineTo(polygon[i].x, polygon[i].y);
        }

        context.closePath();

        context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        context.strokeStyle = 'black';

        context.fill();
        context.stroke();
      });
    }
  }, [index]);

  return (
    <>
      <h2>{countryName}</h2>
      <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} />
    </>
  );
};

export default Map;
