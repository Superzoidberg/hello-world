var submitBtn = document.getElementById("submit");
var utctime = document.getElementsByClassName("utctime");
var table = document.querySelector("table");
var cells = document.querySelectorAll("td");
var sumTime = document.getElementById("sumTime");

var csv = "";



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


 

// cells.forEach(function(cell) {
//     console.log(cell.innerHTML);
//   })
var date1 = new Date('02/11/21, 2:19 PM');
var date2 = new Date('02/11/21, 2:19 PM');
var seq = "v"
totalTime = 0
for(var i=0; i<cells.length; i++) {

    if (cells[i].innerHTML == "start" || cells[i].innerHTML == "stop"){
        seq = cells[i].innerHTML;
        console.log(seq);
    }else{
        if (seq == "start" ){
            date1 = new Date(cells[i].innerHTML);
            console.log("111111111");
            console.log(date1);
        }else if (seq == "stop"){
            date2 = new Date(cells[i].innerHTML);
            console.log("SSSS");
            console.log(date2);
            diffTime = Math.abs(date2 - date1);
            hDiff = diffTime / 3600 / 1000;
            totalTime = totalTime + hDiff
            console.log(totalTime);
            sumTime.textContent = totalTime;
        }
    }
}
