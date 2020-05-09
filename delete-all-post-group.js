# Go to group you want delete
# f12
# paste code 

var group_id = prompt("Nhập group id cần xóa bài", '');
var user_id = prompt("Nhập user id của bạn", '');
var delay = prompt("Nhập delay xóa bài (giây)", '2');
var fb_dtsg = '';

var inputs = document.getElementsByName('fb_dtsg');
for (var i = 0; i < inputs.length; i++) {
    if (inputs[i] && inputs[i].value) {
        fb_dtsg = inputs[i].value;
        break;
    }
}

async function deletePost(story_dom_id) {
    return new Promise((resolve, reject) => {
        var regex = /mall_post_(\d+):6:0/gm;
        var match = regex.exec(story_dom_id);
        var content_id = '';
        if (match !== null) {
            content_id = match[1];
        }

        var objQuery = {
            group_id: group_id,
            content_id: content_id,
            story_dom_id: story_dom_id,
            source: 'group_mall'
        };

        var objData = {
            jazoest: '22180',
            fb_dtsg: fb_dtsg,
            admin_notes: '',
            __user: user_id,
            __a: '1',
            __dyn: '7AgNe-4amaWxd2u6aJGi9FxqeCwKyaF3ozGFQAjFGUqxe2qdwIhEpyA4WCHxC7oG5VEc8yGDyUJu9xK5WAxamqnKaxeAcUeWDxqfx138S6UhAAhfzLxe4469V8FecGdCDgO8gpx25UnGVoyaxG4o4O5k2eq9CJ4geJ3UWeCxryo4ueDBgeUryFFEy2haUhKFprzooAmfxKq9BQnjG3tummfx-bKq58CcBAyoGi1uUkBzXHxeU98kx67t3kumcAUG2HXxKiQhxfyopAx3zoOmVoKufxi2iaypqAzohwyyaxuE9EKfAmF48K-quV8ycx6bxm4UGWzU4uVQXGmu48y22UsVoC9zFAdxp2UtGi9zm7EsyUy4ErxG1fx6fAwDxy5qxNDxe12x6i8z9Uy_wzzUuybCAx6Vob89Ebawi8e8',
            __csr: '',
            __req: '1f',
            __beoa: '0',
            __pc: 'PHASED:DEFAULT',
            dpr: '2',
            __rev: '1001569503',
            __s: 'y8qg1r:3hpxnt:5k3w5c',
            __hsi: '6774972484597518501-0',
            __spin_r: '1001569503',
            __spin_b: 'trunk',
            __spin_t: '1577416946'
        };

        var queryString = serialize(objQuery);

        var http = new XMLHttpRequest();
        var url = 'https://www.facebook.com/groups/content/remove/?' + queryString;
        var params = serialize(objData);
        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4) {
                if (http.status == 200) {
                    try {
                        // console.log(http.responseText);
                        var regex = /__html":"(.*?)"}/;
                        var x = http.responseText.match(regex)[1];
                        var r = /\\u([\d\w]{4})/gi; 
                        x = x.replace(r, function (match, grp) {
                        return String.fromCharCode(parseInt(grp, 16)); } );
                        var div = document.createElement('div');
                        div.innerHTML = x;
                        console.log(div.innerText);
                    } catch (e) {
                        console.log(e.message);
                    }
                }
                resolve();
            }
        }
        http.send(params);

        function serialize (obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        }
    });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

for (var i = 0; i < 1000; i++) {
    var listgroupEles = document.getElementsByClassName('_4-u2 mbm _4mrt _5jmm _5pat _5v3q _7cqq _4-u8');
    for (var groupEle of listgroupEles) {
        if (!groupEle.getAttribute('done')) {
            var id = groupEle.getAttribute('id');
            groupEle.setAttribute('done', 'true');
            await deletePost(id);
            await sleep(parseInt(delay) * 1000);
        }
    }
    window.scrollTo(0,document.body.scrollHeight);
    await sleep(5000);
}
