var errorType = { CAMS_SCANNER_NOT_INSTALLED: "-201" };
var scanner = {};

scanner.installerLocation =
  "https://developer.camsunit.com/fp/cams-downloads.html";

export async function capture(apiKey, isImageRequired) {
  let image;

  const res = await fetch(
    `http://localhost:13124/cams/fp-scanner/capture?sendimage=${
      isImageRequired === true ? "1" : "0"
    }&apikey=${apiKey}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!res || res.status === 404) {
    var ScannerErrorObj = {};
    var ScannerError = {};
    ScannerError.operation = "Capture";
    ScannerError.errorCode = errorType.CAMS_SCANNER_NOT_INSTALLED;
    ScannerError.errorString =
      "Scanner is not installed. Install from <a target='blank' href='" +
      scanner.installerLocation +
      "'>" +
      scanner.installerLocation +
      "></a>";
    ScannerErrorObj.ScannerError = ScannerError;
    onFailure(JSON.stringify(ScannerErrorObj));
  } else {
    const data = await res.json();

    if (isSuccess(data)) {
      image = onSuccess(data);
      return image;
    } else {
      return onFailure(data);
    }
  }
}

export async function compare(apiKey, template1, template2) {
  let score;

  const res = await fetch(
    `http://localhost:13124/cams/fp-scanner/compare?apikey=${apiKey}&tmpl1=${template1}&tmpl2=${template2}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!res || res.status === 404) {
    var ScannerErrorObj = {};
    var ScannerError = {};
    ScannerError.operation = "Capture";
    ScannerError.errorCode = errorType.CAMS_SCANNER_NOT_INSTALLED;
    ScannerError.errorString =
      "Scanner is not installed. Install from <a target='blank' href='" +
      scanner.installerLocation +
      "'>" +
      scanner.installerLocation +
      "></a>";
    ScannerErrorObj.ScannerError = ScannerError;
    onFailure(ScannerErrorObj);
  } else {
    const data = await res.json();

    if (isSuccess(data)) {
      score = onSuccess(data);
      return score;
    } else {
    
      return onFailure(data);
    }
  }
}

function isEmpty(value) {
  return (
    (typeof value == "string" && !value.trim()) ||
    typeof value == "undefined" ||
    value === null
  );
}

function isSuccess(data) {
  try {
    if (isEmpty(data)) return false;

    var scannerError = data["ScannerError"];
    if (scannerError.errorCode !== "0") {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
}

function hasKey(obj, key) {
  var keyExists = false;
  var value = eval("obj." + key);
  if (typeof value != "undefined" || value != null) {
    keyExists = true;
  }
  return keyExists;
}

export function getScannerSuccessData(data) {
  let resObj = {};

  resObj.serviceTagId = getValue(data, "ServiceTagId");
  resObj.errorCode = getValue(data, "ScannerError.errorCode");
  resObj.errorString = getValue(data, "ScannerError.errorString");
  resObj.authToken = getValue(data, "ApiRequestInfo.AuthToken");
  resObj.operation = getValue(data, "ApiRequestInfo.Operation");
  resObj.operationTime = getValue(data, "ApiRequestInfo.OperationTime");
  resObj.template = getValue(
    data,
    "ApiRequestInfo.OperationData.Signature[0].Template"
  );
  resObj.qualityScore = getValue(
    data,
    "ApiRequestInfo.OperationData.Signature[0].QualityScore"
  );
  resObj.image = getValue(
    data,
    "ApiRequestInfo.OperationData.Signature[0].Image"
  );
  resObj.type = getValue(
    data,
    "ApiRequestInfo.OperationData.Signature[0].Type"
  );
  resObj.matchScore = getValue(data, "ApiRequestInfo.OperationData.Score");
  return resObj;
}

export function getScannerFailureData(data) {
  var resObj = {};

  resObj.serviceTagId = getValue(data, "ServiceTagId");
  resObj.operation = getValue(data, "ApiRequestInfo.Operation");
  resObj.operationTime = getValue(data, "ApiRequestInfo.OperationTime");
  resObj.errorCode = getValue(data, "ScannerError.errorCode");
  resObj.errorString = getValue(data, "ScannerError.errorString");
  return resObj;
}

function getValue(jsonObj, key) {
  var value = "";
  try {
    if (hasKey(jsonObj, key)) {
      value = eval("jsonObj." + key);
    }
  } catch (err) {
    console.log(key + " is missing");
  }
  return value;
}

function onSuccess(data) {
  let plainData = data;
  //write the program to decrypt if security key is set in API monitor for the scanner

  const successData = getScannerSuccessData(plainData);

  if (successData.operation === "Capture") {
    const pngImage = "data:image/png;base64," + successData.image;

    const temp = successData.template;

    return { temp, pngImage };
  } else if (successData.operation === "Compare") {
    return parseInt(successData.matchScore);
  }
}

function onFailure(data) {
  var failureData = getScannerFailureData(data);

  alert(`${failureData.errorCode}, ${failureData.errorString}`);
}
