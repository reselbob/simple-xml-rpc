function MathOp() {
    const getXmlArray = (numbers) => {
        const ray = document.createElement('array');
        const data = document.createElement('data');
        ray.appendChild(data);
        numbers.forEach(num =>{
            const v = document.createElement("value");
            data.appendChild(v);
            const i = document.createElement("i4");
            v.appendChild(i);
            const n = document.createTextNode(num);
            i.appendChild(n);
        });
        const serializer = new XMLSerializer();
        return serializer.serializeToString(ray);
    };

    const getMathOpXml = (operation, numbers ) =>{
        const xml = getXmlArray(numbers);
        const str = '<?xml version="1.0"?>' +
            '<methodCall>' +
            `<methodName>${operation}</methodName>` +
            '<params>' +
            '<param>' +
            `<value>${getXmlArray(numbers)}</value>` +
            '</param>' +
            '</params>' +
            '</methodCall>';
        return str;
    };


    this.post = (operation, numbers, url, successFunc) => {
        const xml  = getMathOpXml(operation, numbers);
        $.ajax({
            url: url,
            data: xml,
            type: 'POST',
            contentType: "text/xml",
            contentLength: xml.length,
            dataType: "text",
            success : successFunc,
            error : function (xhr, ajaxOptions, thrownError){
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    };
}