//Güncel zamanı alan fonk. sn bir çağırılıyor.
function showTime() {
  var date = new Date();
  var years = date.getFullYear();
  var months = date.getMonth();
  var days = date.getDay();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  years = fixTime(years);
  months = fixTime(months);
  days = fixTime(days);
  hours = fixTime(hours);
  minutes = fixTime(minutes);
  seconds = fixTime(seconds);

  var timeString = hours + ":" + minutes + ":" + seconds;
  var nowTimeString = days + " " + getMonth(months) + " " + years;
  var combinedText = nowTimeString + "\n" + timeString;
  document.getElementById("clock").textContent = combinedText;

  setTimeout(showTime, 1000);
}

//5 = 05 zamanı düzenleyen fonk.
function fixTime(time) {
  return time < 10 ? "0" + time : time;
}

//alarm listesi için dizi tanımlıyor.
var alarmList = [];

//Alarmın kurulduğu fonk.
function setAlarm() {
  var input = document.getElementById("alarmInput"); //inputtan kullanıcının alarm kuracağı saat bilgisini alıyor
  var alarmDate = new Date(input.value);
  var nowTime = new Date(); //güncel zamanı alıyor

  //input bos ise uyarı veriyor
  if (input.value === "") {
    openPopup("Lütfen bir tarih girin.");
    return;
  }

  //kullanıcının girdiği saatin geçmiş zaman ise bu kod bloğu çalışıyor
  if (lastTime(alarmDate)) {
    openPopup("Geçersiz alarm zamanı! Lütfen ileri bir saat seçin.");
    return;
  }

  //gerisayım = countDown
  var countDownTimer = alarmDate - nowTime;
  countDownTimer = Math.floor(countDownTimer / 1000); //alarm saati ile şimdiki saati çıkarıyor ve sn'ye çeviriyor

  alarmList.push({ time: alarmDate, countDownTimer: countDownTimer }); //alarm listesine alarmı ekliyor push()

  var countDownDiv = document.createElement("div"); //geri sayım divi oluşturuyor
  countDownDiv.className = "count-down"; //count-down sınıfını atıyor

  // var deleteTimer = document.createElement("button"); //bir button oluşturuyor
  // deleteTimer.className = "delete-timer";//delete-timer sınıfını atıyor

  // var deleteIcon = document.createElement("img");//img oluşturuyor
  // deleteIcon.className = "delete-icon";//delete-icon sınıfına atıyor

  // var imagePath = "assets/delete.png";//resim yolunu tanımlıyor

  // deleteIcon.setAttribute("src", imagePath);// Oluşturulan img elementine resim yolunu atayor.

  //oluşturulan divin içine alarm listesinde bir alarmı dive ekliyor
  countDownDiv.textContent =
    "Alarm: " +
    formatDateToDDMMYYYYHHMMSS(alarmDate) +
    " Geri Sayım: " +
    (countDownTimer >= 86400 // 1 day in seconds
      ? Math.floor(countDownTimer / 86400) + " gün "
      : "") +
    (countDownTimer >= 3600 // 1 hour in seconds
      ? formatTime(Math.floor((countDownTimer % 86400) / 3600)) + " saat "
      : "") +
    formatTime(Math.floor((countDownTimer % 3600) / 60)) +
    " dakika " +
    formatTime(countDownTimer % 60) +
    " saniye kaldı.";

  // deleteTimer.appendChild(deleteIcon);

  document.getElementById("alarmList").appendChild(countDownDiv);
  //document.getElementById("alarmList").appendChild(deleteTimer);

  //alarm geri sayıyor
  var countDownInterval = setInterval(function () {
    countDownTimer--;
    countDownDiv.textContent =
      "Alarm: " +
      formatDateToDDMMYYYYHHMMSS(alarmDate) +
      " Geri Sayım: " +
      (countDownTimer >= 86400 // 1 day in seconds
        ? Math.floor(countDownTimer / 86400) + " gün "
        : "") +
      (countDownTimer >= 3600 // 1 hour in seconds
        ? formatTime(Math.floor((countDownTimer % 86400) / 3600)) + " saat "
        : "") +
      formatTime(Math.floor((countDownTimer % 3600) / 60)) +
      " dakika " +
      formatTime(countDownTimer % 60) +
      " saniye kaldı.";
    //alarm çalma vakti geldiği zaman bu kod bloğu kontrol sağlıyor
    if (countDownTimer <= 0) {
      clearInterval(countDownInterval);
      alarmList.pop(); //Biten alarmı listeden çıkarıyor pop()
      countDownDiv.textContent =
        "Alarm: " +
        formatTime(alarmDate.getHours()) +
        ":" +
        formatTime(alarmDate.getMinutes()) +
        "(Geri Sayım: 0)";

      // Uyarı mesajı
      var uyari = new Audio("assets/aa.mp3"); // Uyarı ses dosyasının URL'sini belirtin
      uyari.play();
      openPopup("Alarm sona erdi");
    }
  }, 1000);
}

//ay sayısının metinsel karşılığını almamıza yarayan fonk.
function getMonth(monthNumber) {
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else {
    return "Geçersiz ay numarası!";
  }
}
//alarm tarih formatını gun ay yıl olarak düzenleyen fonk.
function formatDateToDDMMYYYYHHMMSS(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).padStart(4, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  //const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
//alarmı 2 basamaklı hale getiriyor ör: 8 = 08   12 = 12
function formatTime(time) {
  return time.toString().padStart(2, "0");
}

//geçmiş tarih girildiğide fonk. uyarı veriyor.
function lastTime(time) {
  const nowTime = new Date();
  return time.getTime() < nowTime.getTime();
}

// Inputun bos olup olmadığını kontrol ediyor
function checkInput() {
  var inputField = document.getElementById("alarmInput");
  var selectedDate = inputField.value;

  if (selectedDate === "") {
    openPopup(" Lütfen bir tarih seçiniz!!");
    return;
  }
  return;
}

//alarm liste kutu açan fonk.
function openAlarmList() {
  document.getElementById("btnAlarm").style.display = "none";
  document.getElementById("btnClose").style.display = "block";
  document.getElementById("openAlarmList").style.display = "block";
  var closeAL = document.getElementById("openAlarmList");
  closeAL.style.display = "block";
}
//alarm liste kutu kapatan fonk.
function closeAlarmList() {
  document.getElementById("btnAlarm").style.display = "block";
  document.getElementById("btnClose").style.display = "none";
  var openAL = document.getElementById("openAlarmList");
  openAL.style.display = "none";
}

/*
** popup'a bir message ifadesi gelecek ve o message 3 farklı message olabilir
-- lütfen bir tarih giriniz
-- lütfen ileri bir tarih seçiniz
-- alarm sona erdi 
*/
function openPopup(message) {
  var popupMessage = document.getElementById("popupMessage");
  popupMessage.textContent = message;
  var overlay = document.getElementById("overlay");
  overlay.classList.add("open"); // Popupı açarken "open" sınıfını ekliyoruz
  overlay.style.display = "flex";
}

function closePopup() {
  var overlay = document.getElementById("overlay");
  overlay.classList.remove("open"); // Popupı kapatırken "open" sınıfını kaldırıyoruz
  overlay.style.display = "none";
}

// const pageSize = 10;
// let currentIndex = 0;
// // "Daha Fazla" butonuna tıklanınca alarmları göster/gizle
// function toggleMoreAlarms() {
//   const countDownDivs = document.getElementsByClassName("count-down");

//   // Daha fazla alarm varsa
//   if (alarmList.length > currentIndex + pageSize) {
//     for (let i = currentIndex; i < currentIndex + pageSize; i++) {
//       // Gizlenmiş olanları görünür hale getir
//       countDownDivs[i].style.display = "block";
//     }
//     // Daha fazla alarm varsa "Daha Fazla" butonunu göster
//     document.getElementById("showMoreButton").style.display = "block";
//     currentIndex += pageSize;
//   } else {
//     // Daha fazla alarm yoksa "Daha Fazla" butonunu gizle
//     document.getElementById("showMoreButton").style.display = "none";
//     // Son kalan alarmları göster
//     for (let i = currentIndex; i < alarmList.length; i++) {
//       countDownDivs[i].style.display = "block";
//     }
//     currentIndex = alarmList.length;
//   }
// }


