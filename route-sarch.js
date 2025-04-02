reearth.ui.show(`
  <style>
  /* Generic styling system that provides consistent UI components and styling across all plugins */

  @import url("https://reearth.github.io/visualizer-plugin-sample-data/public/css/preset-ui.css");
  </style>
  <div class="rounded-sm secondary-background" style="width: 290px">
    <div class="display-flex flex-between p-16" style="height: 48px">
      <div class="display-flex align-center gap-8">
        <img src="https://api.visualizer.reearth.io/assets/01jq5jw37s3n31dn3r894vhbrx.svg" width="20" height="20" />
        <h2 class="text-md">経路検索</h2>
      </div>
      <div>
        <img src="https://api.visualizer.reearth.io/assets/01jq5jwamr4j1psx403yfzg3yq.svg" width="20" height="20" />
      </div>
    </div>
    <div class="flex-column p-8">
      <div class="flex-column gap-8 p-16">
        <div class="flex-between" style="gap: 0">
          <label class="font-bold" for="start-point">開始点</label>
          <div class="display-flex" style="width: 180px; height: 30px; border-radius: 4px; border: 1px solid #8b8b8b">
            <input id="start-point" type="text" placeholder="場所を入力" style="border: none; outline: 0" />
            <button class="icon-btn" onclick="handleIconClick('start', this)">
              <img
                src="https://api.visualizer.reearth.io/assets/01jq5k03t33w70121atw85n2ed.svg"
                width="20"
                height="20"
              />
            </button>
          </div>
        </div>
        <div class="flex-between" style="gap: 0">
          <label class="font-bold" for="end-point">到着点</label>
          <div class="display-flex" style="width: 180px; height: 30px; border-radius: 4px; border: 1px solid #8b8b8b">
            <input id="end-point" type="text" placeholder="場所を入力" style="border: none; outline: 0" />
            <button class="icon-btn" onclick="handleIconClick('end', this)">
              <img
                src="https://api.visualizer.reearth.io/assets/01jq5k03t33w70121atw85n2ed.svg"
                width="20"
                height="20"
              />
            </button>
          </div>
        </div>
      </div>

      <div class="display-flex p-16" style="align-items: flex-start; gap: 43px">
        <label class="font-bold">移動方法</label>
        <div class="flex-column gap-4">
          <div class="display-flex">
            <label><input type="radio" name="transport" value="foot" checked style="width: 13px" /> 徒歩</label>
          </div>
          <label><input type="radio" name="transport" value="bike" style="width: 13px" />自転車</label>
          <label><input type="radio" name="transport" value="car" style="width: 13px" />自動車</label>
        </div>
      </div>

      <div class="display-flex gap-8 p-8">
        <button class="btn-primary button-padding w-full text-sm" onclick="searchRoute()">検索</button>
        <button class="btn-neutral button-padding w-full text-sm" onclick="deleteRouteAndMarker()">削除</button>
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
