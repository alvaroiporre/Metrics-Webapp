import React, { useEffect, useRef, useState } from 'react';
import shapes from '../assets/country_shapes.json';
import { getLimits, formData } from '../maps/maps';
import { useSelector } from 'react-redux';

const Map = () => {
  const selectedCountry = useSelector((state) => state.countries.selectedCountry);
  const indexCountrySelected = useSelector((store) => store.countries.countriesIndexes);
  const [index, setIndex] = useState(0 || indexCountrySelected[selectedCountry]);
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

    const data = shapes[index].geo_shape.geometry.coordinates;
    const limits = getLimits(data);
    if (data.length === 1) {
      const polygon = formData(data[0], limits);
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
        const polygon = formData(poly[0], limits);
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
      <canvas ref={canvasRef} width={400} height={400} />
      <button onClick={changeMapBack}>Back</button>
      <button onClick={changeMap}>Next</button>
    </>
  );
};

export default Map;
