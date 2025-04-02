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
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
  }
  
  .search-btn {
    width: 50%;
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
  
  .search-btn:hover, .delete-btn:hover {
    cursor: pointer;
  }
  
  .delete-btn {
    width: 50%;
    height: 28px;
    border-radius: 6px;
    border: 1px solid #1a6ed8;
    background: #fff;
  }
  
  .delete-btn span {
    color: #1a6ed8;
    text-align: center;
    font-size: 12px;
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
            <button onclick="handleIconClick('start', this)">
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
            <button onclick="handleIconClick('end', this)">
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
            ><input type="radio" name="transport" value="foot" checked /><span class="label-text">徒歩</span></label>
          <label><input type="radio" name="transport" value="bike" /><span class="label-text">自転車</span></label>
          <label><input type="radio" name="transport" value="car" /><span class="label-text">自動車</span></label>
        </div>
      </div>
      <div class="search-button-area">
        <button class="search-btn" onclick="searchRoute()"><span>検索</span></button>
        <button class="delete-btn" onclick="deleteRouteAndMarker()"><span>削除</span></button>
      </div>
    </div>
  </div>
  <script>
    async function getRoute(start, end, osrmProfile) {
      const url = "https://router.project-osrm.org/route/v1/" +
              osrmProfile + "/" +
              start + ";" + end +
              "?overview=full&geometries=geojson";
  
      try {
        const res = await fetch(url);
        const data = await res.json();
  
        if (data.code === "Ok") {
          const route = data.routes[0];
  
          const geojson = {
            type: "Feature",
            geometry: route.geometry,
            properties: {
              distance: route.distance,
              duration: route.duration,
            },
          };
  
          return geojson;
        } else {
          throw new Error("ルート取得に失敗しました。");
        }
      } catch (err) {
        console.error("getRoute エラー:", err);
        throw err; // 呼び出し元でキャッチ
      }
    }
  
    function addRouteLayer(geojson) {
      parent.postMessage({
        action: "addRouteLayer",
        geojson: geojson
      }, "*")
    }
  
    async function searchRoute() {
      // 開始点と到着点の座標情報を取得
      const start = document.getElementById("start-point").value.trim();
      const end = document.getElementById("end-point").value.trim();
      // 移動方法を取得
      const osrmProfile = document.querySelector('input[name="transport"]:checked').value;
  
      try {
        const geojson = await getRoute(start, end, osrmProfile);
        addRouteLayer(geojson);
      } catch (error) {
        console.log("ルートの取得に失敗しました。" + error);
      }
    }
  
    let selecting = null;
    let activeButton = null;
  
    function handleIconClick(type, btn) {
      const icon = btn.querySelector("img");
  
      if (selecting === type) {
        // 選択解除
        selecting = null;
        activeButton = null;
        icon.style.filter = "";
      } else {
        // 選択状態切り替え
        selecting = type;
        resetAllIconColors();
        icon.style.filter = "invert(29%) sepia(96%) saturate(7472%) hue-rotate(0deg) brightness(102%) contrast(108%)"; // 赤っぽく
        activeButton = btn;
      }
    }
  
    // アイコン色を元に戻す
    function resetAllIconColors() {
      const icons = document.querySelectorAll("button > img");
      icons.forEach((img) => {
        img.style.filter = "";
      });
    }
  
    function addMarkerLayer(lat, lng, pointName) {
      parent.postMessage(
        {
          action: "addMarkerLayer",
          lat: lat,
          lng: lng,
          pointName: pointName
        },
        "*"
      );
    }

    function deleteRouteAndMarker() {
      // テキストボックスの値をクリア
      document.getElementById("start-point").value = "";
      document.getElementById("end-point").value = "";

      // 選択状態とアイコン色をリセット
      selecting = null;
      resetAllIconColors();
      parent.postMessage(
        {
          action: "deleteRouteAndMarkerLayer",
        },
        "*"
      );
    }
  
    window.addEventListener("message", (e) => {
      const msg = e.data;
      if (msg.type === "position") {
        if (!selecting) return;
        var coordinates = msg.lng.toFixed(6)  + "," + msg.lat.toFixed(6) ;
        if (selecting === "start") {
          document.getElementById("start-point").value = coordinates || "-";
        } else if (selecting === "end") {
          document.getElementById("end-point").value = coordinates || "-";
        }
        addMarkerLayer(msg.lat, msg.lng, selecting);
        selecting = null;
        resetAllIconColors();
      }
    });
  </script>`);
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

reearth.extension.on("message", (msg) => {
  if (msg.action === "addRouteLayer") {
    const routeLayer = {
      type: "simple",
      title: "route",
      data: {
        type: "geojson",
        value: msg.geojson,
      },
      infobox: {
        blocks: [
          {
            pluginId: "reearth",
            extensionId: "propertyInfoboxBetaBlock",
          },
        ],
      },
      polyline: {
        strokeColor: "blue",
        strokeWidth: 2,
      },
    };

    // Re:Earthにルートレイヤを追加する
    reearth.layers.add(routeLayer);
  } else if (msg.action === "addMarkerLayer") {
    // 開始点または到達点のマーカーレイヤがすでに追加されている場合は、座標を更新する
    const markerLayer = reearth.layers.find((layer) => layer.title === msg.pointName);
    if (markerLayer) {
      reearth.layers.override(markerLayer.id, {
        data: {
          type: "geojson",
          value: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  coordinates: [msg.lng, msg.lat],
                  type: "Point",
                },
              },
            ],
          },
        },
      });
      // 開始点または到達点のマーカーレイヤが追加されていない場合は、レイヤを追加する
    } else {
      const markerLayer = {
        type: "simple",
        title: msg.pointName,
        data: {
          type: "geojson",
          value: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  coordinates: [msg.lng, msg.lat],
                  type: "Point",
                },
              },
            ],
          },
        },
        marker: {
          pointColor: "blue",
          pointSize: 12,
          style: "point",
        },
      };
      reearth.layers.add(markerLayer);
    }
  } else if (msg.action === "deleteRouteAndMarkerLayer") {
    // ルートレイヤを検索する
    const routeLayers = reearth.layers.findAll((layer) => layer.title === "route");
    if (routeLayers.length) {
      const routeLayerIds = routeLayers.map((layer) => layer.id);
      reearth.layers.delete(...routeLayerIds);
    }
    // 開始点のマーカーレイヤを検索する
    const startMarkerLayer = reearth.layers.find((layer) => layer.title === "start");
    if (startMarkerLayer) {
      reearth.layers.delete(startMarkerLayer.id);
    }
    // 到達点のマーカーレイヤを検索する
    const endMarkerLayer = reearth.layers.find((layer) => layer.title === "end");
    if (endMarkerLayer) {
      reearth.layers.delete(endMarkerLayer.id);
    }
  }
});

reearth.viewer.on("click", (event) => {
  const { lat, lng } = event;

  reearth.ui.postMessage({
    type: "position",
    lat: lat,
    lng: lng,
  });
});
