
class XmlHelper {
    getPingRequestXml(message) {
        const str = '<?xml version="1.0"?>' +
            '<methodCall>' +
            '<methodName>ping</methodName>' +
            '<params>' +
            '<param>' +
            `<value><string>${message}</string></value>` +
            '</param>' +
            '</params>' +
            '</methodCall>';
        return str;
    }

    getMathOperationXml(operation, numbers) {
        const XMLSerializer = require('xmldom').XMLSerializer;
        const DOMParser = require('xmldom').DOMParser;
        const getXmlArray = (numbers)=>{
            const doc = new DOMParser().parseFromString('<t />')
            const ray = doc.createElement('array');
            const data = doc.createElement('data');
            ray.appendChild(data);
            numbers.forEach(num =>{
                const v = doc.createElement("value");
                data.appendChild(v);
                const i = doc.createElement("i4");
                v.appendChild(i);
                const n = doc.createTextNode(num);
                i.appendChild(n);
            });
            const serializer = new XMLSerializer();
            return serializer.serializeToString(ray);
        };
        const str = `<?xml version="1.0"?>` +
            `<methodCall>` +
            `<methodName>${operation}</methodName>` +
            `<params>` +
            `<param>` +
            `<value>${getXmlArray(numbers)}</value>` +
            `</param>` +
            `</params>` +
            `</methodCall>`;
        return str;
    }

    getChatterXml(message, count) {
        const str = `<?xml version="1.0"?>` +
            `<methodCall>` +
            `<methodName>chatter</methodName>` +
            `<params>` +
            `<param>` +
            `<value>` +
            '<struct>' +
            '<member>' +
            '<name>message</name>' +
            `<value><string>${message}</string></value>` +
            '</member>' +
            '<member>' +
            '<name>limit</name>' +
            `<value><i4>${count}</i4></value>` +
            '</member>' +
            '</struct>' +
            '</value>' +
            '</param>' +
            '</params>' +
            '</methodCall>';
        return str;
    }
}

module.exports = {XmlHelper};