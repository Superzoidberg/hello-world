var submitBtn = document.getElementById("submit");
var utctime = document.getElementsByClassName("utctime");
var table = document.querySelector("table");
var currentPage = document.querySelector('.current-page').id
var csv = "";

console.log(currentPage)


try{
    submitBtn.classList.add("btn");
}catch{
  //pass
}
try{
    submitBtn.classList.add("btn-success");
}catch{
  //pass
}
try{
    submitBtn.classList.add("btn-block");
}catch{
  //pass
}



setTimeout(function() {
    $("#messageAlert").hide();
}, 5000);



for (i = 0; i < utctime.length; i++ ){
    var val = utctime[i].textContent
    var date = new Date(val);
    var options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' };
    date = date.toLocaleString("en-US", options);
    utctime[i].textContent = date;
}

function downloadCSV(){
    var le = table.rows.length;
    var cnt = 0;
    for (let row of table.rows) {
        for (let cell of row.cells) {
            let value = cell.innerText;
            value = value.replace(/,/g," ");
            value = value.replace(/(?:\r\n|\r|\n)/g, " ");
            if (value == "Last Comment Download"){
                csv = csv + "Last Comment" + ",";
            }else{
                csv = csv + value + ",";
            }
        }
        cnt = cnt +1;
        csv = csv + "\r\n";
    }

    var filename = "data.csv";
    if (cnt == le){
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        // return function (csv, fileName) {
            // var json = JSON.stringify(data),
        var blob = new Blob([csv], { type: "octet/stream" })
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = "data.csv";
        a.click();
        window.URL.revokeObjectURL(url);
        // };
    }
}
