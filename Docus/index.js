const yaml= require ('yamljs');
const ss= yaml.load('./Docus/openapi.yaml');
module.exports= ss;