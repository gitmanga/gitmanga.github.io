function GetQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return '';
}

function AjaxGet(url, func_ok) {
    var xhr = function(){
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }else{
            return new ActiveObject('Micrsorf.XMLHttp');
        }
    }();

    xhr.onreadystatechange = function(){
        switch(xhr.readyState){
            case 0 : 
                console.log(0, url + ' 未初始化....');
                break;
            case 1 : 
                console.log(1,url + ' 请求参数已准备，尚未发送请求...');
                break;
            case 2 : 
                console.log(2,url + ' 已经发送请求,尚未接收响应');
                break;
            case 3 : 
                console.log(3,url + ' 正在接受部分响应.....');
                break;
            case 4 : 
                console.log(4,url + ' 响应全部接受完毕');
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    func_ok(xhr.responseText)
                }else{
                    console.log(4,url + ' error:' + xhr.status)
                }
                break;
        }
    }
    xhr.open('get', url, false);
    xhr.send(null);
}

function LoadManga(vm) {
    var registries = GetQueryVariable('github').split(',')
    
    var github = `https://raw.githubusercontent.com/${registries[0]}/master`

    AjaxGet(`${github}/meta.yml`, function(response) {
        vm.meta = jsyaml.load(response)
    })

    AjaxGet(`${github}/toc.yml`, function(response) {
        vm.toc = jsyaml.load(response)
    })

    AjaxGet(`${github}/${Object.values(vm.toc[0])[0]}`, function(response) {
        var pages = jsyaml.load(response)
        for (var i in pages) {
            var page = pages[i]
            var item = []
            for (var j in page) {
                var layer = page[j]
                if (typeof(layer) == 'string') {
                    _layer = {}
                    _layer[`${github}/${layer}`] = 'normal'
                    layer = _layer
                } else {
                    _layer = {}
                    _layer[`${github}/${Object.keys(layer)[0]}`] = Object.values(layer)[0]
                    layer = _layer
                }
                item.push(layer)
            }
            vm.data.oneside.push(item)
        }
        vm.data.twoside.push(vm.data.oneside[0])
        for (i = 1; i < vm.data.oneside.length; i=i+2) {
            vm.data.twoside.push([vm.data.oneside[i], vm.data.oneside[i+1]])
        }
    })

    if (registries.length <= 1) return

    for (var i = 1; i < registries.length; ++i) {
        var github = `https://raw.githubusercontent.com/${registries[i]}/master`

        var toc = []
        AjaxGet(`${github}/toc.yml`, function(response) {
            toc = jsyaml.load(response)
        })

        AjaxGet(`${github}/${Object.values(toc[0])[0]}`, function(response) {
            var pages = jsyaml.load(response)

            for (var i in pages) {
                var page = pages[i]
                if (page) {
                    for (var j in page) {
                        var layer = page[j]
                        
                        _layer = {}
                        _layer[`${github}/${Object.keys(layer)[0]}`] = Object.values(layer)[0]
                        layer = _layer
                        vm.data.oneside[i].push(layer)
                    }
                }
            }
        })
    }
}