function uploadCSV() {
    let upload_btn: HTMLElement = document.querySelector(
        "#file"
    ) as HTMLElement;
    upload_btn.addEventListener("change", (e: any) => {
        let file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = function () {
            var csvData = reader.result;
            console.log(csvData);
        };

        reader.readAsText(file);
    });
    upload_btn.click();
}
const tableData = []
function downloadCSV(filename: string) {
    let csv = "\uFEFF"; //解决乱码问题
    csv += "keyword,replay\n"; //添加表格的头
    for (let index = 0; index < tableData.length; index++) {
        const element = tableData[index];
        // csv += `${element.keyword},${element.reply}\n`;
    }

    var csvFile, downloadLink;

    csvFile = new Blob([csv], { type: "text/csv;charset=utf-8" });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
}