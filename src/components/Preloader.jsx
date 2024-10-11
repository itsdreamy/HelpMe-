import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const Preloader = ({ loading }) => {

  return (
    <div className="preloader">
      <HashLoader color={"#e0e0e0"} loading={loading} size={50} />
    </div>
  );
};

export default Preloader;
