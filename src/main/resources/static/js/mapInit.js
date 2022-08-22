var MapInit = function(mapConfig) {

	proj4.defs([
        [
            'EPSG:4326',
            '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
        ],
        [
            'EPSG:3857',
            '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs'
        ],
        [
            'EPSG:5173',
            '+proj=tmerc +lat_0=38 +lon_0=125.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs'
        ],
        [
            'EPSG:5174',
            '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs'
        ],
        [
            'EPSG:5175',
            '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=550000 +ellps=bessel +units=m +no_defs'
        ],
        [
            'EPSG:5176',
            '+proj=tmerc +lat_0=38 +lon_0=129.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs'
        ],
        [
            'EPSG:5177',
            '+proj=tmerc +lat_0=38 +lon_0=131.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs'
        ],
        [
            'EPSG:5178',
            '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs'
        ],
        [
            'EPSG:5179',
            '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        ],
        [
            'EPSG:5180',
            '+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        ],
        [
            'EPSG:5181',
            '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        ],
        [
            'EPSG:5182',
            '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=550000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        ],
        [
            'EPSG:5183',
            '+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        ],
        [
            'EPSG:5184',
            '+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        ],
        [
            'EPSG:5185',
            '+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        ],
        [
            'EPSG:5186',
            '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        ],
        [
            'EPSG:5187',
            '+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        ],
        [
            'EPSG:5188',
            '+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        ]
    ]);

	ol.proj.proj4.register(proj4);

	/*** START: 변수 생성 ***/
	var geoserverDataUrl = mapConfig.geoserverDataUrl;
	var geoserverDataWorkspace = mapConfig.geoserverDataWorkspace;
	var coordinate = mapConfig.coordinate;
	var mapExtent = mapConfig.mapExtent;
	var mapCenter = mapConfig.mapCenter;
	/*** END: 변수 생성 ***/

	/*** START: layer ***/
	// 배경 layer 생성
	var layers = [
		new ol.layer.Tile({
			// https://openlayers.org/en/master/examples/reprojection.html
			source: new ol.source.OSM()
		}),
	];
	/*** END: layer ***/
	

	/*** START: view ***/
	// view 정의
	var view = new ol.View({
		center: mapCenter,
		zoom: 12,
		projection : coordinate
	});
	/*** END: view ***/
	
	// control 정의
	/*** START: control ***/
	var mousePositionControl = new ol.control.MousePosition({
        //coordinateFormat: ol.coordinate.createStringXY(6),	// 소수점 여섯째
		coordinateFormat: function(coordinate) {
            return ol.coordinate.format(coordinate, '{x}, {y}　EPSG:4326', 6);
        },
		projection: ol.proj.get('EPSG:4326'),
		className: 'mousePosition',
		target: document.getElementById('mouse-position'),
		undefinedHTML: ' '
	});
	/*** END: control ***/

	// 맵 생성
	/*** START: map ***/
	var map = new ol.Map({
		controls: ol.control.defaults().extend([
			mousePositionControl // 만든 mouse control
		]),
		interactions: ol.interaction.defaults(), // interaction
		layers: layers, // layer
		view: view,
		target: "map"
	});
	/*** END: map ***/

	/*** START: select ***/
	var selectFilter = false;
	// select interaction
    var select = new ol.interaction.Select({
		condition: ol.events.condition.click,
		toggleCondition: ol.events.condition.shiftKeyOnly,
		filter: function(e, a, b) {
			return selectFilter;
		}
	});
    
    map.addInteraction(select);
    /*** END: select ***/

	/*** START: popup ***/    
    var popupOverlay = new ol.Overlay({
    	id: 'popup-overlay',
    	element: document.getElementById('popup'),
    	autoPan: true,
    	autoPanAnimation: {
    		duration: 250
    	},
    	offset: [0, 0],
    	positioning: 'top'
    });
    
    map.addOverlay(popupOverlay);
	/*** END: popup ***/
    

	/*** START: click event ***/
    // map click 이벤트 추가
	map.on('singleclick', function(event){
		
		popupOverlay.setPosition(null);
		
		var popup = document.getElementById('popup');

		// popup 안의 자식요소 제거
		while (popup.hasChildNodes()) {
			popup.removeChild(popup.firstChild);
	    };

	    // 닫기 버튼 생성 및 popup에 추가
		var closePop = '<button class="button button-clear button-primary" id="ol-popup-closer"></button>';
		popup.innerHTML = closePop;
		
		// 팝업 닫기 이벤트 생성
		$('#ol-popup-closer').on('click', function(){
			popupOverlay.setPosition(null);
		})

		// 추가 된 WMS Layer들의 정보 가져오기
		for(let item of event.target.getLayers().getArray()){
			// WMS, Raster Layer Check 
			if(item.get('title') && (item instanceof ol.layer.Tile || item instanceof ol.layer.Image)){
				var url = item.getSource().getFeatureInfoUrl(
						event.coordinate, map.getView().getResolution(), map.getView().getProjection(),
						{'INFO_FORMAT': 'application/json'}
				);

				// getFeatureInfo
				$.ajax(url)
				.then(
					function(res){
						if(res.features.length==0){
							return false;
						}else{
							// layer 정보를 담을 div element 생성
							var infoTitle = document.createElement('div');
							var infoPop = document.createElement("div");
							
							infoTitle.id = 'identify-title';
							infoPop.id = 'identify-body';
							
							var lyrTitlePopup;
							var lyrInfoPopup;
							var getObKey = res.features[0].properties;
							var keys = Object.keys(getObKey);
							
							// 생성한 element에 정보 입력
							lyrTitlePopup ='';
							if(res.features[0].id){								
								lyrTitlePopup += '<h1 class="title"><font color="black">'+res.features[0].id+'</font></h1>';
							}else{
								lyrTitlePopup += '<h1 class="title"><font color="black">'+item.get('title')+'</font></h1>';
							}
							lyrInfoPopup ='';
							lyrInfoPopup += '<div class=\"inner\"><h4><b></b></h4><table style="width:100%;">';
							for(var i=0; i<keys.length; i++){
								lyrInfoPopup +='<tr><td style=\"padding-left:20px; color:gray;\"><b>' + keys[i] 
								+ '</b><td>' 
								+ getObKey[keys[i]] + '</td></tr>';
							}
							lyrInfoPopup+='</table></div><br>';
														
							infoTitle.innerHTML = lyrTitlePopup;
							infoPop.innerHTML = lyrInfoPopup;
							
							// popup element에 입력한 정보 element 추가
							popup.append(infoTitle);
							popup.append(infoPop);
							
							// 화면상에서 클릭한 지점에 popup element show 
							popupOverlay.setPosition(event.coordinate);
						}
					},function error(err){
						alert(err);
					});
			}
		}

	});
	/*** END: click event ***/
	
	return map;
}