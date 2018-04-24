
function getQueryString( name ) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*(&|$)");
    if(r != null ){
        return decodeURI(r[2]);
    }
    return null;
}