let http=require("http");
const httpServer=http.createServer(handleServer);

function handleServer(request,response){
    console.log(request.headers.host);
}