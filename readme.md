# simple-xml-rpc
A project the demonstrates the fundamentals for developing a xml-rpc server and client

## Running the project on Katacoda

You can use the [Katacoda interactive learning environment](katacode.com) run examples of the Simple XML-RPC CLI Tool against the Simple XML-RPC server. To run this project against on Katacoda do the following steps

**Step 1:** Go the Ubuntu playground on Katacoda:

[`https://katacoda.com/courses/ubuntu/playground`](https://katacoda.com/courses/ubuntu/playground)

**Step 2:** In there terminal window execute the following command to clone the project source code from GitHub.

`git clone https://github.com/reselbob/simple-xml-rpc.git`

**Step 3:** Install the server

`cd simple-xml-rpc/server/`

`npm install`

**Step 4:** Start the Simple XML-RPC server

`node server.js`

You'll get output similar to the following:

`XML-RPC server listening on port 9090 at Sun Apr 12 2020 20:01:03 GMT+0000 (UTC)`

**Step 5:** Open a new terminal window in Katacoda.

**Step 6:** In the new terminal, navigate to the CLI directory in the source code

`cd simple-xml-rpc/cli/`

**Step 7:** Install the CLI tool global so that it can be used as a command line program

`npm install -g`

**Step 8:** Call the online help documentation

 `xmlrpc -h`
 
You'll get output as follows

```
Usage: xmlrpc -o [string] - d [array] -m [string] -c 100 [num] -v [verbose]

Options:
  --version           Show version number                              [boolean]
  -o, --operation     The operation to perform. Choose from the operations: add,
                      subtract, multiply, divide, chatter, ping       [required]
  -d, --data          The array of numbers to process. Used with the operations,
                      add, subtract, multiply, divide
  -m, --message       Used with the operation, chatter and ping. The message to
                      transit.
  -c, --count         Used with the operation, chatter. Indicates the number of
                      messages to return in the stream.
  -h, --host, --help  Show help                 [boolean] [default: "localhost"]
  -p, --port          The xml-rpc server port.                   [default: 9090]
  -v, --verbose       Verbose response including requestXML and responseXML

Examples:
  xmlrpc -o add -d [4,5,6,7]                Sums up the numbers in the array
                                            [[4,5,6,7]]
  xmlrpc -o chatter -m "I have a secret"    returns the messages, "I have a
  -c 100                                    secret" in an array of 100 messages
  xmlrpc -o ping -m I want to see verbose   returns the message, "I want to see
  results -v                                verbose result" along with
                                            requestXML and responseXML
  xmlrpc -o add -d [1,1,1,1,8] -v           Sums up the numbers in the array
                                            [4,5,6,7] and displays the
                                            requestXML and responseXML

copyright 2020
```

**Step 8:** Use the CLI tool to call the `add` method on the Simple XML-RPC server.

`xmlrpc -o add -d [1,1,1,1,8] -v`

You'll get output similar to the following:

```
{
  "data": 12,
  "requestXml": "<?xml version=\"1.0\"?><methodCall><methodName>add</methodName><params><param><value><array><data><value><i4>1</i4></value><value><i4>1</i4></value><value><i4>1</i4></value><value><i4>1</i4></value><value><i4>8</i4></value></data></array></value></param></params></methodCall>",
  "responseXml": "<?xml version=\"1.0\"?><methodResponse><params><param><value><int>12</int></value></param></params></methodResponse>"
}
```

**Congratulations!** You're up and running with Simple XML-RPC Server and CLI Tool.

## Server

You can find the documentation for the Simple XML-RPC server [here](./server/readme.md).

## CLI

You can find the documentation for the Simple XML-RPC CLI Tool that will allow you to interact with the server [here](./cli/readme.md).