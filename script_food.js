document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルトの動作を停止

    // フォームの各要素から値を取得
    const prefecture = document.getElementById('prefecture').value;
    const city = document.getElementById('city').value;
    const cuisine = document.getElementById('cuisine').value;
    const priceRange = document.getElementById('price-range').value;

    // APIエンドポイントとクエリパラメータの構築
    const apiUrl = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"; // ここに実際のAPIのエンドポイントを追加してください
    const queryParams = `?prefecture=${prefecture}&city=${city}&cuisine=${cuisine}&price_range=${priceRange}`;

    // APIリクエストの送信
    fetch(apiUrl + queryParams)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // APIからのレスポンスを処理して、レストランのリストを表示するなどの操作を行う
            console.log(data); // ここではコンソールにAPIからのデータを表示するだけです
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
});

// 都道府県ごとの市区町村のデータ
const citiesByPrefecture = {
    '北海道': ['札幌市', '函館市', '小樽市', '旭川市', '帯広市', '釧路市', '北見市', '夕張市', '岩見沢市', '網走市', '留萌市', '苫小牧市', '稚内市', '美唄市', '芦別市', '江別市', '赤平市', '紋別市', '士別市', '名寄市', '三笠市', '根室市', '千歳市', '滝川市', '砂川市', '歌志内市', '深川市', '富良野市', '登別市', '恵庭市', '伊達市', '北広島市', '石狩市', '北斗市', '当別町', '新篠津村', '松前町', '福島町', '知内町', '木古内町', '七飯町', '鹿部町', '森町'],
    '青森県': ['青森市', '弘前市', '八戸市', '黒石市', '五所川原市', '十和田市', '三沢市', 'むつ市', 'つがる市', '平川市', '平内町', '今別町', '蓬田村', '外ヶ浜町', '鰺ヶ沢町', '深浦町', '西目屋村', '藤崎町', '大鰐町', '田舎館村', '板柳町', '鶴田町', '中泊町', '野辺地町', '七戸町', '六戸町', '横浜町', '東北町', '六ヶ所村', 'おいらせ町'],
    '東京都': ['千代田区', '中央区', '港区', '新宿区', '文京区', '台東区', '墨田区', '江東区', '品川区', '目黒区', '大田区', '世田谷区', '渋谷区', '中野区', '杉並区', '豊島区', '北区', '荒川区', '板橋区', '練馬区', '足立区', '葛飾区', '江戸川区', '八王子市', '立川市', '武蔵野市', '三鷹市', '青梅市', '府中市', '昭島市', '調布市', '町田市', '小金井市', '小平市', '日野市', '東村山市', '国分寺市', '国立市', '福生市', '狛江市', '東大和市', '清瀬市', '東久留米市', '武蔵村山市', '多摩市', '稲城市', '羽村市', 'あきる野市', '西東京市', '西多摩郡瑞穂町', '西多摩郡日の出町', '西多摩郡檜原村', '西多摩郡奥多摩町']
};

// 都道府県セレクトボックスが変更された時の処理
document.getElementById('prefecture').addEventListener('change', function() {
    const selectedPrefecture = this.value;
    const citySelect = document.getElementById('city');
    
    // 選択された都道府県に対応する市区町村のリストを取得
    const cities = citiesByPrefecture[selectedPrefecture] || [];

    // 市区町村のセレクトボックスをリセット
    citySelect.innerHTML = '<option value="">市区町村を選択してください</option>';

    // 取得した市区町村のリストをセレクトボックスに追加
    cities.forEach(function(city) {
        const option = document.createElement('option');
        option.textContent = city;
        option.value = city;
        citySelect.appendChild(option);
    });
});