// GÖREV EKLE
function addtask(){

    const input = document.getElementById("task");
    const kategori = document.getElementById("todoopsions").value;
    const error = document.getElementById("errorMessage");

    if(input.value.trim() === ""){
        error.textContent = "Lütfen geçerli bir görev giriniz.";
        return;
    }

    error.textContent = "";

    gorevOlustur(input.value, kategori, false);

    input.value = "";
    gorevleriKaydet();
}



// GÖREV OLUŞTUR
function gorevOlustur(text, kategori, tamamlandi){

    const gorev = document.createElement("div");
    gorev.className = "gorev";

    const span = document.createElement("span");
    span.textContent = text;

    if(tamamlandi){
        span.classList.add("tamamlandi");
    }

    // ✔ TİK BUTONU
    const tikbtn = document.createElement("button");
    tikbtn.textContent ="✔";

    tikbtn.onclick = function(){
        span.classList.toggle("tamamlandi");
        gorevleriKaydet();
    };

    // 🗑 SİL BUTONU
    const silBtn = document.createElement("button");
    silBtn.textContent = "Sil";

    silBtn.onclick = function(){
        gorev.remove();
        gorevleriKaydet();
    };

    gorev.appendChild(span);
    gorev.appendChild(tikbtn);
    gorev.appendChild(silBtn);

    // SEÇİLEN KATEGORİYE EKLE
    document.getElementById(kategori + "gorevler").appendChild(gorev);
}



// LOCAL STORAGE KAYDET
function gorevleriKaydet(){

    const tumGorevler = [];

    document.querySelectorAll(".gorev").forEach(gorev => {

        const text = gorev.querySelector("span").textContent;
        const tamamlandi = gorev.querySelector("span").classList.contains("tamamlandi");

        // HANGİ KATEGORİDE?
        const kategoriDiv = gorev.closest(".kategori").id;

        tumGorevler.push({
            text,
            kategori: kategoriDiv,
            tamamlandi
        });

    });

    localStorage.setItem("gorevler", JSON.stringify(tumGorevler));
}



// SAYFA AÇILINCA GERİ YÜKLE
window.onload = function(){

    const kayitli = JSON.parse(localStorage.getItem("gorevler")) || [];

    kayitli.forEach(veri => {
        gorevOlustur(veri.text, veri.kategori, veri.tamamlandi);
    });

};

document.getElementById("task").addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addtask();
    }
});