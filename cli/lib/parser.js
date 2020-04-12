const convert = require('xml-js');

const getJson = (xml ) => {
    return JSON.parse(convert.xml2json(xml, {compact: true, spaces: 1}));
};

class SimpleXmlRpcParser {
    constructor() {
    }
    parseMathOperation(xml) {
        const result = getJson(xml);
        return Number(result.methodResponse.params.param.value.double._text)
    }

    parsePing(xml) {
        const result = getJson(xml);
        return result.methodResponse.params.param.value.string._text
    }

    parseChatter(xml) {
        const result = getJson(xml);
        const arr = [];
        result.methodResponse.params.param.value.array.data.value.forEach(item => {
             const message = item.struct.member[0].value.string._text;
             const count = item.struct.member[1].value.int._text
            arr.push({message, count})
        });
        return arr;
    }
}

module.exports = {SimpleXmlRpcParser};