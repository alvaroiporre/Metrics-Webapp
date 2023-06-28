import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import shapes from '../assets/country_shapes.json';
import { getLimits, formData } from '../maps/maps';

const Country = ({ id }) => {
  const indexCountrySelected = useSelector((store) => store.countries.countriesIndexes);
  const index = 0 || indexCountrySelected[id];

  const reference = useRef();

  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

  const canvasRef = useRef(null);
  // const countryName = id;

  useEffect(() => {
    if (reference.current) {
      setDimensions({
        width: reference.current.offsetWidth,
        height: reference.current.offsetHeight,
      });
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, dimensions.height, dimensions.width);

    let data = shapes[index]?.geo_shape?.geometry?.coordinates;
    if (data === undefined) {
      data = [[[1, 0], [1, 1], [0, 0], [0, 1]]];
    }
    const limits = getLimits(data);
    if (data.length === 1) {
      const polygon = formData(data[0], limits, dimensions);
      context.beginPath();
      context.moveTo(polygon[0].x, polygon[0].y);

      for (let i = 1; i < polygon.length; i += 1) {
        context.lineTo(polygon[i].x, polygon[i].y);
      }

      context.closePath();

      context.fillStyle = 'rgba(45, 69, 115, 0.8)';
      context.strokeStyle = '#2d4572';

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

        context.fillStyle = 'rgba(45, 69, 115, 0.8)';
        context.strokeStyle = '#2d4572';

        context.fill();
        context.stroke();
      });
    }
  }, [index, dimensions]);

  return (
    <>
      <canvas ref={canvasRef} width={100} height={100} />
    </>
  );
};

Country.propTypes = {
  id: PropTypes.string.isRequired,
  // country: PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   id: PropTypes.string.isRequired,
  //   currency: PropTypes.string.isRequired,
  //   capital: PropTypes.string.isRequired,
  //   region: PropTypes.string.isRequired,
  //   languages: PropTypes.string.isRequired,
  //   area: PropTypes.number.isRequired,
  //   flag: PropTypes.string.isRequired,
  //   population: PropTypes.number.isRequired,
  // }),
};

export default Country;
