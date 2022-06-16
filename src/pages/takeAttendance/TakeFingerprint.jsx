import React, { useState } from "react";

import "./takeAttendanceForm.css";
import { capture } from "../../services/scannerServices";

const TakeFingerprint = ({ setFingerprintTemp }) => {
  const [pngImage, setPngImage] = useState();

  const handleCapture = async () => {
    try {
      setPngImage(null);

      const returnPNGImage = true;
      const data = await capture(
        process.env.REACT_APP_SCANNER_API_KEY,
        returnPNGImage
      );
      setPngImage(data.pngImage);

      setFingerprintTemp(data.temp);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="takefingerprint__container">
      <div className="takefingerprint__wrapper">
        <div>
          <h3>Take FingerPrint</h3>
          <p>Place any of your thumbs on the scanner</p>
        </div>
        <div className="takefingerprint__right">
          <div
            style={pngImage && { backgroundImage: `url(${pngImage})` }}
            className="view__capture"
          ></div>
          <button type="button" onClick={handleCapture}>
            Capture
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeFingerprint;
