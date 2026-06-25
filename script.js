let flashdisks = [];

function tambahData() {

    let nama = document.getElementById("nama").value;
    let harga = parseFloat(document.getElementById("harga").value);
    let kapasitas = parseFloat(document.getElementById("kapasitas").value);
    let kecepatan = parseFloat(document.getElementById("kecepatan").value);
    let garansi = parseFloat(document.getElementById("garansi").value);

    flashdisks.push({
        nama,
        harga,
        kapasitas,
        kecepatan,
        garansi
    });

    tampilkanData();
}

function tampilkanData() {

    let tbody = document.getElementById("dataTable");

    tbody.innerHTML = "";

    flashdisks.forEach((item,index)=>{

        tbody.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.harga}</td>
                <td>${item.kapasitas}</td>
                <td>${item.kecepatan}</td>
                <td>${item.garansi}</td>
                <td class="text-center">
                    <button class="btn btn-danger btn-sm"
                    onclick="hapusData(${index})" title="Hapus Data">
                    <i class="fa-solid fa-trash me-1"></i>Hapus
                    </button>
                </td>
            </tr>
        `;

    });

}

function hapusData(index){

    flashdisks.splice(index,1);

    tampilkanData();

}

function hitungSAW() {

    let minHarga =
        Math.min(...flashdisks.map(x=>x.harga));

    let maxKapasitas =
        Math.max(...flashdisks.map(x=>x.kapasitas));

    let maxKecepatan =
        Math.max(...flashdisks.map(x=>x.kecepatan));

    let maxGaransi =
        Math.max(...flashdisks.map(x=>x.garansi));

    let hasil = [];

    flashdisks.forEach(item=>{

        let rHarga =
            minHarga / item.harga;

        let rKapasitas =
            item.kapasitas / maxKapasitas;

        let rKecepatan =
            item.kecepatan / maxKecepatan;

        let rGaransi =
            item.garansi / maxGaransi;

        let nilai =
            (0.30 * rHarga) +
            (0.30 * rKapasitas) +
            (0.25 * rKecepatan) +
            (0.15 * rGaransi);

        hasil.push({
            nama:item.nama,
            nilai:nilai
        });

    });

    hasil.sort((a,b)=>
        b.nilai-a.nilai
    );

    tampilRanking(hasil);

}

function tampilRanking(data){

    let tbody =
        document.getElementById(
            "rankingTable"
        );

    tbody.innerHTML = "";

    data.forEach((item,index)=>{

        tbody.innerHTML += `
            <tr>
                <td>${index+1}</td>
                <td>${item.nama}</td>
                <td>${item.nilai.toFixed(4)}</td>
            </tr>
        `;

    });

}