const { printLog } = require("./logger");

let resNotFound = (req, res, errMsg) => {
    printLog(JSON.stringify(req.body), 'request')
    printLog(JSON.stringify(errMsg), 'response')
  return res.status(203).send({ statusCode: "203", statusMessage: "Not Found!!", error: errMsg });
};
let resServerError = (req, res, error) => {
  console.log(error)
    printLog(JSON.stringify(req.body), 'request')
    printLog(JSON.stringify(error), 'response')
    return res.status(500).send({ statusCode: "500", statusMessage: "Server Error!!", error: error });
};
let resDocCreated = (req, res, doc) => {
    printLog(JSON.stringify(req.body), 'request')
    printLog(JSON.stringify(doc), 'response')
  return res.status(200).send({ statusCode: "200", statusMessage: "Document created successfully", data: doc });
};
let resDocUpdated = (req, res, doc) => {
    printLog(JSON.stringify(req.body), 'request')
    printLog(JSON.stringify(doc), 'response')
  return res.status(200).send({ statusCode: "200", statusMessage: "Document updated successfully", data: doc });
};
let resErrorOccured = (req, res, err) => {
    printLog(JSON.stringify(req.body), 'request')
    printLog(JSON.stringify(err), 'response')
  let er = err !== null && err !== undefined && err !== "" ? err : "Error Occured";
  return res.status(203).send({ statusCode: "203", statusMessage: er, error: er });
};
let resAlreadyExists = (req, res, doc) => {
    printLog(JSON.stringify(req.body), 'request')
    printLog(JSON.stringify(doc), 'response')
  return res.status(203).send({ statusCode: "203", statusMessage: "Document already exists", data: doc });
};

let resFound = (req, res, doc) => {
    printLog(JSON.stringify(req.body), 'request')
    printLog(JSON.stringify(doc), 'response')
  return res.status(200).send({ statusCode: "200", statusMessage: "Document Found", data: doc });
};

let resDocDeleted = (req, res, doc) => {
    printLog(JSON.stringify(req.body), 'request')
    printLog(JSON.stringify(doc), 'response')
  return res.status(200).send({ statusCode: "200", statusMessage: "Document successfully deleted ", data: doc });
};

let resDocCancelled = (req, res, doc) => {
    printLog(JSON.stringify(req.body), 'request')
    printLog(JSON.stringify(doc), 'response')
  return res.status(200).send({ statusCode: "200", statusMessage: "Document Cancelled successfully ", data: doc });
};

module.exports = {
  resNotFound,
  resServerError,
  resDocCreated,
  resDocUpdated,
  resAlreadyExists,
  resErrorOccured,
  resFound,
  resDocDeleted,
  resDocCancelled,
};
