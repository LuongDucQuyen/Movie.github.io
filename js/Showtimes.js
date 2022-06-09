const LogoCinemas = document.querySelector(".LogoCinemas");
const URLThongTinHeThongRap =
  "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap";
fetch(URLThongTinHeThongRap)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    function LogoCinema() {
      const itemList = data.map((item, i) => {
        return `<div class="LogoCinema" id="${item.maHeThongRap}" onclick="handleOnClickAddresses(${item.maHeThongRap})" 
                onmousedown="handleOnMouseDownAddresses(${item.maHeThongRap})">
                  <img src="${item.logo}" alt="">
                </div>`;
      });
      return itemList;
    }
    LogoCinemas.innerHTML = LogoCinema().join().replace(/,/g, "");
  })
  .catch((err) => {
    console.error(err);
  });
