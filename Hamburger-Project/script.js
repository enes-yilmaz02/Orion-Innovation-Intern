function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const stock = {
  Marul: 5,
  Turşu: 5,
  "Paket Sos": 5,
  Soğan: 5,
  Domates: 5,
  Ekmek: 5,
  Patates: 5,
  Cola: 5,
  Köfte: 5,
  Tavuk: 5,
};
async function askUserInput(message) {
  return new Promise((resolve) => {
    const userInput = prompt(message);
    resolve(userInput);
  });
}
async function stockKontrol(product) {
  if (stock[product] > 0) {
    stock[product] -= 1;
    console.log(`${product} stoktan çıkarıldı, kalan: ${stock[product]}`);
    await sleep(3000);
    return true;
  } else {
    console.log(`Stokta yeterli ${product} yok! Sipariş iptal ediliyor.`);
    return false;
  }
}
async function checkDegree(chicken, cookingDegree) {
  await sleep(chicken ? 3000 : 4000);
  if (chicken) {
    console.log("Tavuk " + cookingDegree);
  } else {
    console.log("Köfte " + cookingDegree);
  }
}
async function askMeatType() {
  console.log(" Köfte mi? - Tavuk mu? sorgusu (1 Saniye)");
  await sleep(1000);

  const request = await askUserInput("Köfte mi (K) - Tavuk mu (T) seçin: ");
  return request.toLowerCase() === "k" ? "Köfte" : "Tavuk";
}
async function checkMeatStock(meatType) {
  if (stock[meatType] > 0) {
    stock[meatType] -= 1;
    console.log(`${meatType} için  stok kontrolü (3 saniye)`);
    await sleep(3000);
    console.log(`${meatType} stoktan çıkarıldı, kalan: ${stock[meatType]}`);
    return true;
  } else {
    console.log(`Stokta yeterli ${meatType} yok! Sipariş iptal ediliyor.`);
    return false;
  }
}
async function askSelectedProducts() {
  const products = [
    "Marul",
    "Turşu",
    "Paket Sos",
    "Soğan",
    "Domates",
    "Ekmek",
    "Patates",
    "Cola",
  ];

  const selectedProducts = await askUserInput(
    "Lütfen sipariş vermek istediğiniz malzemeyi seçin (örn: 1 3 6).\n" +
      products.map((product, index) => `${index + 1}. ${product}`).join("\n")
  );

  const orderProducts = selectedProducts
    .split(" ")
    .map(Number)
    .map((index) => products[index - 1]);
  return orderProducts;
}
async function startHamburgerPreparation() {
  const meatType = await askMeatType();
  console.log("Seçilen et türü:", meatType);
  await sleep(2000);
  if (!(await checkMeatStock(meatType, 5))) {
    console.log(`Stokta ${meatType} yetersiz! Sipariş iptal ediliyor.`);
    return;
  }
  console.log(" Sipariş al (1 Saniye)");
  await sleep(1000);
  const orderProducts = await askSelectedProducts();
  console.log("Sipariş edilen ürünler:", orderProducts);

 

  for (const product of orderProducts) {
    console.log(` ${product} için stok kontrolü (3 Saniye)`);
    await sleep(3000);

    if (!(await stockKontrol(product, 5))) {
      console.log(`Stokta ${product} yetersiz! Sipariş iptal ediliyor.`);
      return;
    }
   
  }

  if (meatType === "Köfte") {
    console.log(" Pişme derecesi kontrolü");
    await sleep(1000);

    const cookingDegree = await askUserInput(
      "Pişirme derecesini seçin (örn: 1 2 3).\n" +
        "1. Az Pişmiş\n" +
        "2. Orta Pişmiş\n" +
        "3. Çok Pişmiş"
    );
    await checkDegree(
      false,
      ["Az Pişmiş", "Orta Pişmiş", "Çok Pişmiş"][cookingDegree - 1]
    );
    console.log(" Hamburger Yapımı (2 Saniye)");
    await sleep(2000);
    console.log(
      "Köfte(1), Marul(1), Domates(1), Turşu(1), Soğan(1) hamburger ekmeğiyle birleştirildi"
    );
  } else {
    console.log(" Tavuk Pişir (3 Saniye)");
    await sleep(3000);

    const cookingDegree = await askUserInput(
      "Pişirme derecesini seçin (örn: 1 2 3).\n" +
        "1. Az Pişmiş\n" +
        "2. Orta Pişmiş\n" +
        "3. Çok Pişmiş"
    );
    await checkDegree(
      true,
      ["Az Pişmiş", "Orta Pişmiş", "Çok Pişmiş"][cookingDegree - 1]
    );
    console.log(" Hamburger Yapımı (2 Saniye)");
    await sleep(2000);
    console.log(
      "Tavuk(1 ), Marul(1 ), Domates(1 ), Turşu(1 ), Soğan(1 ) hamburger ekmeğiyle birleştirildi"
    );
  }

  console.log(" Patatesleri Kızart (5 Saniye)");
  await sleep(5000);
  console.log("Patatesler kızartıldı");

  console.log(" İçeçeği Hazırla (2 Saniye)");
  await sleep(2000);
  console.log("İçecek hazırlandı");

  console.log(" Sosları ve Ürünleri Servis Tepsisine Koy (1 Saniye)");
  await sleep(1000);

  console.log(" Müşteriye Servis Et (1 Saniye)");
  await sleep(1000);
  console.log("Hamburger servis edildi. İşlem tamamlandı.");
}

