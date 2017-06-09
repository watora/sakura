+function(){
    var debug = false;
    var intervalId = -1, interval = 30;
    window.wallpaperPropertyListener = {
        applyUserProperties: props => {
            if(props.interval){
                interval = parseInt(props.interval.value) || 30;
                showMessage(`set interval to ${interval}`);
                if(intervalId != -1)
                    clearInterval(intervalId);
                intervalId = setInterval(change, interval * 60 * 1000);                
            }
            if(props.backgroundImageFolder){
                showMessage('change folder');                
                change();
            }
            if(props.width){
                width = parseInt(props.width.value);
                document.body.style.backgroundSize = `${width}px ${height}px`;
                document.querySelector('canvas').width = width;
                nodeList = []; //重新初始化
            }
            if(props.height){
                height = parseInt(props.height.value);
                document.body.style.backgroundSize = `${width}px ${height}px`;
                document.querySelector('canvas').height = height;
                nodeList = [];
            }
        }
    }

    var change = () => {
        window.wallpaperRequestRandomFileForProperty('backgroundImageFolder', function(propName, filePath) {
            if(filePath){
                document.body.style.backgroundImage = `url(file:///${filePath})`;
                showMessage(`changed to ${filePath}`);
            }
        });
    }

    var showMessage = message => {
        if(debug)
            document.querySelector('#message').innerHTML += `${message}<br/>`;
    }
}();