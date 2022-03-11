const contentTypes = {
  JSON: "application/json",
};

module.exports = class Responses {
  Response_200 = (req, res, obj) => {
    res.writeHead(200, { "Content-type": "application/json" });
    return res.end();
  };
  Response_200_Data =async (req, res, obj) => {
    res.writeHead(200, { "Content-type": "application/json" });
    res.write(JSON.stringify({ obj }));
    return res.end();
  };
  Response_400_Data = (req, res, obj) => {
    res.writeHead(400, { "Content-type": "application/json" });
    res.write(JSON.stringify({ obj }));
    return res.end();
  };
  Response_401_Data = (req, res, obj) => {
    res.writeHead(401, { "Content-type": "application/json" });
    res.write(JSON.stringify({ obj }));
    return res.end();
  };
  Response_500_Data = (req, res, obj) => {
    res.writeHead(500, { "Content-type": "application/json" });
    res.write(JSON.stringify({ obj }));
    return res.end();
  };
  Response_404_Data = (req, res, obj) => {
    res.writeHead(404, { "Content-type": "application/json" });
    res.write(JSON.stringify({ obj }));
    return res.end();
  };
  Response_409_Data = (req, res, obj) => {
    
    res.writeHead(409, { "Content-type": "application/json" });
    res.write(JSON.stringify({ obj }));
    return res.end()
  };
};
