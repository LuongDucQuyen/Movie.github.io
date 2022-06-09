var cinemaId = "BHDStar";
const addressCinemas = document.querySelector(".addressCinemas");
const LogoCinemas = document.querySelector(".LogoCinemas");
const Showtimes = document.querySelector(".Showtimes");
var data = [];
var addressCinemaId = 0;
const handleOnClickAddresses = (e) => {
  cinemaId = e.attributes.id.nodeValue;
  ShowDetails(cinemaId);
  LogoCinemas.querySelector(`#${cinemaId}`).style.borderRight =
    "2px solid rgba(0, 172, 77, 1)";
};
const handleOnMouseDownAddresses = () => {
  LogoCinemas.querySelector(`#${cinemaId}`).style.borderRight =
    "0px solid rgba(0, 172, 77, 0)";
  addressCinemas.style.overflowY = "none";
};
var index = 0;
const handleClickShowTime = (i) => {
  index = i;
  addressCinemas.querySelector(`#a${addressCinemaId}`).style.borderRight =
    "0px solid rgba(0, 172, 77, 0)";
  addressCinemaId = i;
  addressCinemas.querySelector(`#a${addressCinemaId}`).style.borderRight =
    "2px solid rgba(0, 172, 77, 1)";
  ShowDetailsTimer(index);
};
const ShowDetailsTimer = (index) => {
  if (data !== []) {
    const detailTimer = data[0].lstCumRap[index].danhSachPhim.map((item, i) => {
      const DayAndTime = item.lstLichChieuTheoPhim.map((DateTime) => {
        var day = DateTime.ngayChieuGioChieu.split("T")[0];
        var time = DateTime.ngayChieuGioChieu.split("T")[1];
        return `<div><a href='https://tcdtist-tix-clone.vercel.app/purchase/${DateTime.maLichChieu}'><p class='day'>${day}</p> ~ <p class='time'>${time}</p></a></div>`;
      });
      return `<div class="MovieTimer">
              <img src="${item.hinhAnh}">
              <div class="movieDetail">
                <h4><span>C18</span>${item.tenPhim}</h4>
                <div class="timer">${DayAndTime}</div>
              </div>
            </div>`;
    });
    Showtimes.innerHTML = detailTimer.join().replace(/,/g, "");
    var ShowTimeChildren = Array.from(
      Showtimes.querySelectorAll(".MovieTimer")
    );
    if (
      Showtimes.clientHeight <
      ShowTimeChildren.length * ShowTimeChildren[0].clientHeight
    ) {
      Showtimes.style.overflowY = "scroll";
    } else {
      Showtimes.style.overflowY = "hidden";
    }
  }
};
const ShowDetails = (id) => {
  const URLLichChieu = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${id}&maNhom=GP09`;

  fetch(URLLichChieu)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      data = res;
      const itemAddress = res[0].lstCumRap.map((item, i) => {
        return `<div class="addressCinema" id="a${i}" onclick="handleClickShowTime(${i})">
                            <h4>${item.tenCumRap}</h4>
                            <p>${item.diaChi}</p>
                            <span>[Chi Tiết]</span>
                        </div>`;
      });
      ShowDetailsTimer(index);
      addressCinemas.innerHTML = itemAddress.join().replace(/,/g, "");
      var arrChildren = Array.from(
        addressCinemas.querySelectorAll(".addressCinema")
      );
      if (
        addressCinemas.clientHeight <
        arrChildren.length * arrChildren[0].clientHeight
      ) {
        addressCinemas.style.overflowY = "scroll";
      } else {
        addressCinemas.style.overflowY = "hidden";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

var rotateX = 0;
var rotateY = 0;
var isRotate = 0;
const UnderLine = document.querySelector("#Unline");
const Mattress = document.querySelector(".Mattress");
const tabNameList = Array.from(document.querySelectorAll(".tabName"));
const NewDetailTab = () => {
  tabNameList.map((tabName, i) => {
    tabName.onmousedown = (e) => {
      tabNameList.map((item) => {
        item.classList.remove("choose");
      });
    };
    tabName.onmouseup = (e) => {
      tabName.classList.add("choose");
      UnderLine.style.left = `calc(((100%-165px)/2) - 247.5px + 165px*${i})`;
      if (i != isRotate) {
        rotateY = rotateY - 120 * (i - isRotate);
        Mattress.style.transform = `rotateY(${rotateY}deg)`;
        isRotate = i;
      }
      NewDetails.style.height = "705px";
      btnNewstext = "Rút Gọn";
      btnNews.innerHTML = btnNewstext;
      ShowNews = false;
      rotateX = rotateX + 180;
      UnderLine.style.transform = `rotateX(${rotateX}deg)`;
    };
  });
};
const URLDataDienAnh = `https://60b9f19280400f00177b744b.mockapi.io/ArticlesDienAnh02`;
const dienanhDetails = document.querySelector("#DA");
const reviewDetails = document.querySelector("#RV");
const KhuyenMaiDetails = document.querySelector("#KM");
fetch(URLDataDienAnh)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    const DAHotNews = `<div class="HotNewsItem">
                          <a href="${res[0].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[0].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[0].title}</h4>
                              <p>${res[0].text}</p>
                            </div>
                          </a>
                      </div>
                      <div class="HotNewsItem">
                          <a href="${res[1].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[1].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[1].title}</h4>
                              <p>${res[1].text}</p>
                            </div>
                          </a>
                      </div>
                      `;
    const DANewItem = `<div class="HotNewsItem">
                          <a href="${res[2].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[2].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[2].title}</h4>
                              <p>${res[2].text}</p>
                            </div>
                          </a>
                      </div>
                      <div class="HotNewsItem">
                          <a href="${res[3].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[3].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[3].title}</h4>
                              <p>${res[3].text}</p>
                            </div>
                          </a>
                      </div>`;
    const remaining = res.slice(4);
    const DAremaining = remaining.map((item) => {
      return `<div class = "remainingItem">
                <a href="${item.url}">
                  <img src="${item.img}">
                  <p>${item.title}</p>
                </a>
              </div>`;
    });
    dienanhDetails.querySelector(".HotNews").innerHTML = DAHotNews;
    dienanhDetails.querySelector(".NewItem").innerHTML = DANewItem;
    dienanhDetails.querySelector(".remaining").innerHTML =
      DAremaining.join().replace(/,/g, "");
  })
  .catch((err) => {
    console.log("dienanh:" + err);
  });

const URLDataReview = `https://60babc8f42e1d0001761ff84.mockapi.io/ArticlesReview02`;

fetch(URLDataReview)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    const RVHotNews = `<div class="HotNewsItem">
                          <a href="${res[0].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[0].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[0].title}</h4>
                              <p>${res[0].text}</p>
                            </div>
                          </a>
                      </div>
                      <div class="HotNewsItem">
                          <a href="${res[1].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[1].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[1].title}</h4>
                              <p>${res[1].text}</p>
                            </div>
                          </a>
                      </div>
                      `;
    const RVNewItem = `<div class="HotNewsItem">
                          <a href="${res[2].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[2].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[2].title}</h4>
                              <p>${res[2].text}</p>
                            </div>
                          </a>
                      </div>
                      <div class="HotNewsItem">
                          <a href="${res[3].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[3].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[3].title}</h4>
                              <p>${res[3].text}</p>
                            </div>
                          </a>
                      </div>`;
    const remaining = res.slice(4);
    const RVremaining = remaining.map((item) => {
      return `<div class = "remainingItem">
                <a href="${item.url}">
                  <img src="${item.img}">
                  <p>${item.title}</p>
                </a>
              </div>`;
    });
    reviewDetails.querySelector(".HotNews").innerHTML = RVHotNews;
    reviewDetails.querySelector(".NewItem").innerHTML = RVNewItem;
    reviewDetails.querySelector(".remaining").innerHTML =
      RVremaining.join().replace(/,/g, "");
  })
  .catch((err) => {
    console.log("Review:" + err);
  });
const URLDataKhuyenMai = `https://60babc8f42e1d0001761ff84.mockapi.io/ArticlesKhuyenMai02`;

fetch(URLDataKhuyenMai)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    const KMHotNews = `<div class="HotNewsItem">
                          <a href="${res[0].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[0].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[0].title}</h4>
                              <p>${res[0].text}</p>
                            </div>
                          </a>
                      </div>
                      <div class="HotNewsItem">
                          <a href="${res[1].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[1].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[1].title}</h4>
                              <p>${res[1].text}</p>
                            </div>
                          </a>
                      </div>
                      `;
    const KMNewItem = `<div class="HotNewsItem">
                          <a href="${res[2].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[2].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[2].title}</h4>
                              <p>${res[2].text}</p>
                            </div>
                          </a>
                      </div>
                      <div class="HotNewsItem">
                          <a href="${res[3].url}">
                            <div class="HotNewsItemImg">
                              <img src="${res[3].img}">
                            </div>
                            <div class="HotNewsItemDetail">
                              <h4>${res[3].title}</h4>
                              <p>${res[3].text}</p>
                            </div>
                          </a>
                      </div>`;
    const remaining = res.slice(4);
    const KMremaining = remaining.map((item) => {
      return `<div class = "remainingItem">
                <a href="${item.url}">
                  <img src="${item.img}">
                  <p>${item.title}</p>
                </a>
              </div>`;
    });
    KhuyenMaiDetails.querySelector(".HotNews").innerHTML = KMHotNews;
    KhuyenMaiDetails.querySelector(".NewItem").innerHTML = KMNewItem;
    KhuyenMaiDetails.querySelector(".remaining").innerHTML =
      KMremaining.join().replace(/,/g, "");
  })
  .catch((err) => {
    console.log("URLDataKhuyenMai:" + err);
  });
var ShowNews = true;
var btnNewstext = "Xem Thêm";
const btnNews = document.querySelector(".btnNews");
const NewDetails = document.querySelector(".NewDetails");
btnNews.innerHTML = btnNewstext;
btnNews.onclick = () => {
  if (!ShowNews) {
    btnNewstext = "Xem Thêm";
    btnNews.innerHTML = btnNewstext;
    ShowNews = true;
    NewDetails.style.height = "0px";
  } else {
    btnNewstext = "Rút Gọn";
    btnNews.innerHTML = btnNewstext;
    ShowNews = false;
    NewDetails.style.height = "705px";
  }
};
/*=====handleSliderHearder =======*/
const SliderbtnLeft = document.querySelector(".SliderbtnLeft");
const SliderbtnRight = document.querySelector(".SliderbtnRight");
const SliderGroup = document.querySelector(".SliderGroup");
const SliderInput1 = document.querySelector("#SliderInput1");
const SliderInput2 = document.querySelector("#SliderInput2");
const SliderInput3 = document.querySelector("#SliderInput3");
var SliderGroupRotate = 0;
const activeSlider = (x) => {
  if (x == -120 || x == 240) {
    SliderInput2.classList.add("activeSlider");
    SliderInput1.classList.remove("activeSlider");
    SliderInput3.classList.remove("activeSlider");
  } else if (x == -0 || x == 0) {
    SliderInput2.classList.remove("activeSlider");
    SliderInput1.classList.add("activeSlider");
    SliderInput3.classList.remove("activeSlider");
  } else if (x == 120 || x == -240) {
    SliderInput2.classList.remove("activeSlider");
    SliderInput1.classList.remove("activeSlider");
    SliderInput3.classList.add("activeSlider");
  }
};
var setIntervalId = 0;
const AutoSlider = () => {
  setIntervalId = setInterval(() => {
    SliderGroupRotate = SliderGroupRotate - 120;
    SliderGroup.style.transform = `rotateY(${SliderGroupRotate}deg)`;
    activeSlider(SliderGroupRotate % 360);
  }, 8000);
};
AutoSlider();
SliderbtnLeft.onclick = () => {
  clearInterval(setIntervalId);
  SliderGroupRotate = SliderGroupRotate + 120;
  SliderGroup.style.transform = `rotateY(${SliderGroupRotate}deg)`;
  activeSlider(SliderGroupRotate % 360);
  AutoSlider();
};
SliderbtnRight.onclick = () => {
  clearInterval(setIntervalId);
  SliderGroupRotate = SliderGroupRotate - 120;
  SliderGroup.style.transform = `rotateY(${SliderGroupRotate}deg)`;
  activeSlider(SliderGroupRotate % 360);
  AutoSlider();
};
const SliderItem1 = document.querySelector(".SliderItem1");
const SliderItem2 = document.querySelector(".SliderItem2");
const SliderItem3 = document.querySelector(".SliderItem3");
const translateZ = SliderItem1.clientWidth / 2 / Math.tan((60 * Math.PI) / 180);
SliderItem1.style.transform = `translateZ(${translateZ}px)`;
SliderItem2.style.transform = `rotateY(120deg) translateZ(${translateZ}px)`;
SliderItem3.style.transform = `rotateY(240deg) translateZ(${translateZ}px)`;

const VideoHeaderContainer = document.querySelector(".VideoHeaderContainer");
const SliderbtnCenter = document.querySelector(".SliderbtnCenter");
const VideoHeaderClose = document.querySelector(".VideoHeaderClose");
var Urlvideohearder = "";
const handleShowVideoHeader = (Urlvideohearder) => {
  const VideoHeaderGroup = `<div class="VideoHeaderGroup">
                            <div class="VideoHeaderClose"></div>
                            <iframe width="940" height="530" src="https://www.youtube.com/embed/${Urlvideohearder}?autoplay=1&amp;cc_load_policy=1&amp;controls=1&amp;disablekb=0&amp;enablejsapi=0&amp;fs=1&amp;iv_load_policy=1&amp;loop=0&amp;rel=0&amp;showinfo=1&amp;start=0&amp;wmode=transparent&amp;theme=dark&amp;mute=0" "
                              title="YouTube video player" frameborder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowfullscreen>
                            </iframe>
                          </div>`;
  return VideoHeaderGroup;
};
SliderbtnCenter.onclick = () => {
  if (SliderGroupRotate % 360 == 0 || SliderGroupRotate % 360 == -0) {
    Urlvideohearder = "kBY2k3G6LsM";
    VideoHeaderContainer.innerHTML = handleShowVideoHeader(Urlvideohearder);
  } else if (
    SliderGroupRotate % 360 == -120 ||
    SliderGroupRotate % 360 == 240
  ) {
    Urlvideohearder = "uqJ9u7GSaYM";
    VideoHeaderContainer.innerHTML = handleShowVideoHeader(Urlvideohearder);
  } else if (
    SliderGroupRotate % 360 == 120 ||
    SliderGroupRotate % 360 == -240
  ) {
    Urlvideohearder = "JNZv1SgHv68";
    VideoHeaderContainer.innerHTML = handleShowVideoHeader(Urlvideohearder);
  }
  VideoHeaderContainer.style.right = "0";
  VideoHeaderContainer.style.height = "100%";
  clearInterval(setIntervalId);
};
VideoHeaderContainer.onclick = () => {
  VideoHeaderContainer.style.right = "-100%";
  VideoHeaderContainer.style.height = "0%";
  VideoHeaderContainer.innerHTML = "";
  AutoSlider();
};

/*====Product */
var dataUrl = {};
var urlProduct = "";
const ShowTraiLerProducts = document.querySelector(".ShowTraiLerProduct");
const ShowHandlesTrailer = (url) => {
  var ShowTrailerProduct = `<div class="ProductTrailer">
                              <div class="ProductTrailerGroup">
                              <div class="ProductTrailerClose"></div>
                              <iframe width="940" height="530" src="https://www.youtube.com/embed/${url}?autoplay=1&amp;cc_load_policy=1&amp;controls=1&amp;disablekb=0&amp;enablejsapi=0&amp;fs=1&amp;iv_load_policy=1&amp;loop=0&amp;rel=0&amp;showinfo=1&amp;start=0&amp;wmode=transparent&amp;theme=dark&amp;mute=0" "
                                title="YouTube video player" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                              </iframe>
                              </div>
                            </div>`;
  ShowTraiLerProducts.innerHTML = ShowTrailerProduct;
};

const handleShowTrailer = (id) => {
  ShowTraiLerProducts.style.top = "0%";
  urlProduct = dataUrl[id];
  ShowHandlesTrailer(urlProduct);
};
ShowTraiLerProducts.onclick = () => {
  ShowTraiLerProducts.style.top = "-100%";
  urlProduct = "";
  ShowHandlesTrailer(urlProduct);
};
const URLdanhSachPhim =
  "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09";
const Floor = document.querySelector(".Floor");
fetch(URLdanhSachPhim)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    const limit = 8;
    const ArrayNumbers = Math.ceil(res.length / limit);
    var ArrayPages = [];
    for (let i = 0; i < ArrayNumbers; i++) {
      const Page = res.slice(limit * i, limit * (i + 1));
      ArrayPages.push(Page);
    }
    const componentShowProducts = () => {
      const OnClick = (id, url) => {
        let i = url.lastIndexOf("watch?v=");
        let k = "";
        if (i !== -1) {
          k = url.slice(i + 8);
          dataUrl[id] = k;
        } else {
          k = url.slice(17);
          dataUrl[id] = k;
        }
      };
      // tránh vỡ layout khi data tăng
      const RotateYProductTab = 360 / ArrayPages.length;
      const translateZProductTab =
        Floor.clientWidth /
        2 /
        Math.tan(((RotateYProductTab / 2) * Math.PI) / 180);
      //======================================
      const productList = ArrayPages.map((page, i) => {
        const ProductItem = page.map((item) => {
          return `<div class="product">
                  <div class="Picture" id='${item.maPhim}' 
                    ${OnClick(item.maPhim, item.trailer)}
                    onclick=handleShowTrailer(${item.maPhim})>
                    <img
                      src="${item.hinhAnh}"
                      alt=""
                    />
                    <div class="cushion">
                      <div class="player">
                        <img src="./static/img/tải xuống.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="detail">
                    <h4 class="detailTitle">
                      <span>C18</span>
                      ${item.biDanh}
                    </h4>
                    <p class="detailText">
                      ${item.moTa}
                    </p>
                    <div class="buy"><p>Mua Vé</p></div>
                  </div>
                </div>`;
        });

        return `<div class="productList" 
        style="transform: rotateY(${i * RotateYProductTab}deg) translateZ(${translateZProductTab}px)">
                  ${ProductItem}
                </div>`;
      });
      return productList;
    };
    Floor.innerHTML = componentShowProducts().join().replace(/,/g, "");
  });
const btnProduct1 = document.querySelector("#btnProduct1");
const btnProduct2 = document.querySelector("#btnProduct2");
const btnProduct3 = document.querySelector("#btnProduct3");
btnProduct1.onclick = () => {
  Floor.style.transform = "rotateY(0deg)";
  btnProduct1.style.backgroundColor = "#fb4226";
  btnProduct2.style.backgroundColor = "#757575";
  btnProduct3.style.backgroundColor = "#757575";
};
btnProduct2.onclick = () => {
  Floor.style.transform = "rotateY(-120deg)";
  btnProduct1.style.backgroundColor = "#757575";
  btnProduct2.style.backgroundColor = "#fb4226";
  btnProduct3.style.backgroundColor = "#757575";
};
btnProduct3.onclick = () => {
  Floor.style.transform = "rotateY(-240deg)";
  btnProduct1.style.backgroundColor = "#757575";
  btnProduct3.style.backgroundColor = "#fb4226";
  btnProduct2.style.backgroundColor = "#757575";
};
NewDetailTab();
ShowDetails(cinemaId);
