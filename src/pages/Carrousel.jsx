import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useState } from 'react';
import slide_1 from '../assets/horizontal-1.jpg';
import slide_2 from '../assets/horizontal-2.jpg';
import slide_3 from '../assets/horizontal-3.jpg';
import slide_4 from '../assets/horizontal-4.jpg';


function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} style={{ backgroundColor: 'rgb(50, 50, 50)', marginTop: '10px' }}>
      <Carousel.Item >
        <img
          style={{ width: "100%" }}
          className="d-block"
          src={slide_1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item >
        <img
          style={{ width: "100%" }}
          className="d-block w-90"
          src={slide_3}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item >
        <img
          style={{ width: "100%" }}
          className="d-block w-90"
          src={slide_2}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item >
        <img
          style={{ width: "100%" }}
          className="d-block w-90"
          src={slide_4}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;