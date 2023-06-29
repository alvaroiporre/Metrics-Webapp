import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import shapes from '../assets/country_shapes.json';
import { getLimits, formData } from '../maps/maps';
import iconBack from '../assets/img/icon_back.png';

const Map = () => {
  const selectedCountry = useSelector((state) => state.countries.selectedCountry) || 'BO';
  const selectedCountryInfo = useSelector((state) => state.countries.selectedCountryInfo);
  const indexCountrySelected = useSelector((store) => store.countries.countriesIndexes);
  const index = 0 || indexCountrySelected[selectedCountry];
  const reference = useRef();
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  const canvasRef = useRef(null);

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
      <nav className="navbar-map">
        <Link to="/"><img className="icon-back" src={iconBack} alt="back" /></Link>
        <h2>{selectedCountryInfo.name}</h2>
        <h2>{selectedCountryInfo.flag}</h2>
      </nav>
      <div className="content">
        <div className="map-header">
          <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} />
        </div>
        <div className="country-info">
          <p className="row-info color-1">
            <b>Oficial Name: </b>
            {selectedCountryInfo.oname}
          </p>
          <p className="row-info color-0">
            <b>Capital: </b>
            {selectedCountryInfo.capital[0]}
          </p>
          <p className="row-info color-1">
            <b>Population: </b>
            {selectedCountryInfo.population}
            {' hab.'}
          </p>
          <p className="row-info color-0">
            <b>Area: </b>
            {selectedCountryInfo.area}
            {' m2'}
          </p>
        </div>
      </div>
    </>
  );
};

export default Map;
