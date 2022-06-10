function getList() {
    fetch("http://3.213.158.223/Controller/PiPiController.php?act=getAllList")
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            const data = res.data;
            var list_div = document.getElementById("pipilist")
            var insertStr = `<ul class="ul_head">
        <li class="li_1">編號</li>
        <li class="li_2">網址</li>
        <li class="li_3">狀態</li>
        <li class="li_4">操作</li>
        </ul>`;
            data.forEach(item => {
                if (item.deleted_at == null) {
                    item.deleted_at = "存在";
                    insertStr += `<ul>
                <li class="li_1">${item.id}</li>
                <li class="li_2"><a href="${item.web}">${item.web}</a></li>
                <li class="li_3">${item.deleted_at}</li>
                <li class="li_4">
                    <div class="pointer" onclick="pipi_update_btn(${item.id})">更新</div>
                    <div class="pointer" onclick="pipi_del_btn(${item.id})">刪除</div>
                </li>
                </ul>`;
                }
                else {
                    item.deleted_at = "已被刪除";
                    insertStr += `<ul class="dontshow">
                <li class="li_1">${item.id}</li>
                <li class="li_2"><a href="${item.web}">${item.web}</a></li>
                <li class="li_3">${item.deleted_at}</li>
                <li class="li_4">
                    <div>已被刪除，無法進行操作</div>
                </li>
                </ul>`;
                }
            })
            list_div.innerHTML = insertStr;
        })
}
//宣告視窗物件
var msg_box = document.getElementById("blockbg")
//關閉視窗
function close_btn() {
    msg_box.style.display = "none";
    console.log("close")
    document.getElementById("btn01").removeEventListener("click", close_btn, false)
    document.getElementById("btn02").removeEventListener("click", pipi_del, false)
    document.getElementById("btn02").removeEventListener("click", pipi_create, false)
}
//開啟視窗並設定事件
function create_btn() {
    msg_box.style.display = "block";
    document.getElementById("id_show").innerHTML = "暫無";
    document.getElementById("web").value = "";
    document.getElementById("deleted_at").innerHTML = "暫無";
    document.getElementById("code").value = "";

    document.getElementById("btn01").addEventListener("click", close_btn, false)

    //把新的加入
    document.getElementById("btn02").addEventListener("click", pipi_create, false)
}
//移除事件並串接API
function pipi_create() {
    document.getElementById("btn02").removeEventListener("click", pipi_create, false)
    document.getElementById("btn01").removeEventListener("click", close_btn, false)
    var web = document.getElementById("web").value
    var code = document.getElementById("code").value
    fetch("http://3.213.158.223/Controller/PiPiController.php?act=createBroadCast&web=" + web + "&code=" + code)
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            getList();
            close_btn();
        })
}

//開啟視窗並放入資料&設定事件
function pipi_del_btn(id) {
    fetch("http://3.213.158.223/Controller/PiPiController.php?act=getBroadCastById&id=" + id)
        .then(res => res.json())
        .then((res) => {
            if (Number(res.code) == 200) {
                var data = res.data;
                if (data.deleted_at == null) {
                    data.deleted_at = "存在"
                }
                document.getElementById("Title").innerText = "刪除文章"
                document.getElementById("id").value = data.id;
                document.getElementById("id_show").innerText = data.id;
                document.getElementById("web").value = data.web;
                document.getElementById("deleted_at").innerText = data.deleted_at;
                document.getElementById("code").value = "";

                document.getElementById("btn01").addEventListener("click", close_btn, false)

                //把新的加入
                document.getElementById("btn02").addEventListener("click", pipi_del, false)
                msg_box.style.display = "block";
            }
            else {
                console.log(res.code)
            }
        })
}
//取得資料，並穿接API
function pipi_del() {
    document.getElementById("btn02").removeEventListener("click", pipi_del, false)
    document.getElementById("btn01").removeEventListener("click", close_btn, false)
    var webid = document.getElementById("id").value
    var code = document.getElementById("code").value
    fetch("http://3.213.158.223/Controller/PiPiController.php?act=delBroadCast&id=" + webid + "&code=" + code)
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            getList();
            close_btn();
        })
}

//開啟視窗並放入資料
function pipi_update_btn(id) {
    fetch("http://3.213.158.223/Controller/PiPiController.php?act=getBroadCastById&id=" + id)
        .then(res => res.json())
        .then((res) => {
            if (Number(res.code) == 200) {
                var data = res.data;
                if (data.deleted_at == null) {
                    data.deleted_at = "存在"
                }
                document.getElementById("Title").innerText = "更新文章"
                document.getElementById("id").value = data.id;
                document.getElementById("id_show").innerText = data.id;
                document.getElementById("web").value = data.web;
                document.getElementById("deleted_at").innerText = data.deleted_at;
                document.getElementById("code").value = "";

                document.getElementById("btn01").addEventListener("click", close_btn, false)

                //把新的加入
                document.getElementById("btn02").addEventListener("click", pipi_update, false)
                msg_box.style.display = "block";
            }
            else {
                console.log(res.code)
            }
        })
}
function pipi_update() {
    document.getElementById("btn02").removeEventListener("click", pipi_update, false)
    document.getElementById("btn01").removeEventListener("click", close_btn, false)
    var webid = document.getElementById("id").value
    var web = document.getElementById("web").value
    var code = document.getElementById("code").value
    fetch("http://3.213.158.223/Controller/PiPiController.php?act=updateBroadCast&id="+webid+"&web=" + web + "&code=" + code)
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            getList();
            close_btn();
        })
}

getList()