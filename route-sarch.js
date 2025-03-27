reearth.ui.show(`
<style>
body,
h2,
h3 {
  margin: 0;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  width: 290px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  border: 1px solid #8b8b8b;
  background: #fff;
}

.label-text {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

/* header */

.header {
  display: flex;
  padding: 12px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-text {
  color: #000;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}

.close-button {
  width: 16px;
  height: 16px;
}

/* form */
.form-area {
  display: flex;
  padding: 8px 8px 12px 8px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
}

/* form select-point */
.select-point-section {
  display: flex;
  padding: 8px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
  align-self: stretch;
}

.point-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
}

.input-wrapper {
  display: flex;
  width: 163.649px;
  height: 28px;
  padding: 0 6px;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #8b8b8b;
}

.input-wrapper button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.location-input {
  border: none;
  outline: 0;
}

/* form select-move */
.select-move-section {
  display: flex;
  padding: 12px 16px;
  align-items: flex-start;
  gap: 43px;
}

.radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

input[type="radio"] {
  margin-right: 5px;
}

/* form search-button-area */
.search-button-area {
  display: flex;
  padding: 8px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
}

.search-btn {
  width: 100%;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #1a6ed8;
  background: #1a6ed8;
}

.search-btn span {
  color: #fff;
  text-align: center;
  font-size: 12px;
}

.search-btn:hover {
  cursor: pointer;
}
</style>
<div class="container">
  <div class="header">
    <div class="header-title">
      <img src="https://api.visualizer.reearth.io/assets/01jq5jw37s3n31dn3r894vhbrx.svg" width="20" height="20" />
      <h2 class="title-text">経路検索</h2>
    </div>
    <div class="close-button">
      <img src="https://api.visualizer.reearth.io/assets/01jq5jwamr4j1psx403yfzg3yq.svg" width="20" height="20" />
    </div>
  </div>
  <div class="form-area">
    <div class="select-point-section">
      <div class="point-group">
        <span class="label-text" for="destination">開始点</span>
        <div class="input-wrapper">
          <input class="location-input" id="start-point" type="text" placeholder="場所を入力" />
          <button>
            <img
              src="https://api.visualizer.reearth.io/assets/01jq5k03t33w70121atw85n2ed.svg"
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>
      <div class="point-group">
        <span class="label-text" for="destination">到着点</span>
        <div class="input-wrapper">
          <input class="location-input" id="end-point" type="text" placeholder="場所を入力" />
          <button>
            <img
              src="https://api.visualizer.reearth.io/assets/01jq5k03t33w70121atw85n2ed.svg"
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="select-move-section">
      <span class="label-text" for="move">移動方法</span>
      <div class="radio-group">
        <label
          ><input type="radio" name="transport" value="foot" checked /><span class="label-text">徒歩</span></label
        >
        <label><input type="radio" name="transport" value="bike" /><span class="label-text">自転車</span></label>
        <label><input type="radio" name="transport" value="car" /><span class="label-text">自動車</span></label>
      </div>
    </div>
    <div class="search-button-area">
      <button class="search-btn" onclick="searchRoute()"><span>検索</span></button>
    </div>
  </div>
</div>
`);

// 初期カメラ位置を新宿周辺に設定
reearth.camera.setView({
  lat: 35.68426,
  lng: 139.71043,
  height: 2000,
  heading: 0,
  pitch: -0.785,
  roll: 0,
});

// 避難所レイヤ追加
const shelterLayer = {
  type: "simple",
  data: {
    type: "csv",
    url: "https://api.visualizer.reearth.io/assets/01jq5wz8aycw1b2xrajnv5t2ym.csv",
    csv: {
      // 緯度経度の列名を指定する
      lngColumn: "経度",
      latColumn: "緯度",
    },
  },
  marker: {
    // スタイルの設定
    imageColor: "red",
    label: true,
    labelBackground: true,
    labelBackgroundColor: "#6c6c6cff",
    labelPosition: "top",
    labelText: {
      expression: "${施設名}",
    },
    labelTypography: {
      color: "#FFFFFF",
      fontSize: 10,
    },
    style: "image",
  },
};

reearth.layers.add(shelterLayer);
