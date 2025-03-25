const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

// Configuração do cliente JWKS (substitua pelo seu subdomínio do SFMC)
const client = jwksClient({
  jwksUri: "https://mcd4bm-71n1sb-b50r3-shp8cp94.auth.marketingcloudapis.com/v2/keys", 
});

// Função para obter a chave pública correta
function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err, null);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Middleware para validar JWT
const verifyJwt = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token JWT ausente" });
  }

  jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token JWT inválido" });
    }
    req.jwtData = decoded;
    next();
  });
};

module.exports = verifyJwt;
