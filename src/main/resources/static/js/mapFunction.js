// 레이어 추가 이벤트
function addLayer(layerName, type, wpsAnalysis) {
	
	// 추가 레이어 중복 확인
//	for(var i=0; i< Mango.GIS.getLayers().getArray().length; i++){
//		var layer = Mango.GIS.getLayers().getArray()[i];
//		if(layer.get('title') && layer.get('title') === layerName){
//			alert('"' + layerName + '"은 이미 추가된 레이어입니다.');
//			return;
//		}
//	}
	var source = null;
	var layer = null;
	if(type === 'WMS'){
		
		source = new ol.source.TileWMS({
			url: Mango.Policy.geoserverDataUrl + '/wms',
			params: {
				'LAYERS': Mango.Policy.geoserverDataWorkspace + ':' + layerName,
				'VERSION': '1.3.0',
				'FORMAT': 'image/png',
				'TRANSPARENT': 'true',
				'SRS': Mango.Policy.coordinate
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous'
		});
		
		layer = new ol.layer.Tile({
			  title : layerName,
			  source: source,
		      visible : true
			});
		
	}else if(type === 'RASTER'){
		
		source = new ol.source.ImageWMS({
			url: Mango.Policy.geoserverDataUrl + '/wms',
			params: {
				'LAYERS': Mango.Policy.geoserverDataWorkspace + ':' + layerName,
				'TILED': true,
				'VERSION': '1.3.0',
				'FORMAT': 'image/png',
				'TRANSPARENT': 'true',
				'SRS': Mango.Policy.coordinate
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous'
		});
		
		layer = new ol.layer.Image({
			  title : layerName,
			  source: source,
		      visible : true
			});
		
	} else if(type === 'WFS'){
		source = new ol.source.Vector({
			format: new ol.format.GeoJSON(),
			url: function(extent){
				var url = Mango.Policy.geoserverDataUrl + "/ows?service=WFS&version=1.1.0&request=GetFeature&typename=" + Mango.Policy.geoserverDataWorkspace + ':' + layerName
                + "&outputFormat=application/json&srsname=" + Mango.Policy.coordinate + "&bbox=" + extent.join(',') + "," + Mango.Policy.coordinate;
                return url;
			},
			strategy: ol.loadingstrategy.bbox,
			format: new ol.format.GeoJSON()
		})
		
		layer = new ol.layer.Vector({
			title: layerName+'_wfs',
			source: source,
			style: new ol.style.Style({
		        stroke: new ol.style.Stroke({
		            color: 'rgba(255, 255, 0, 1.0)',
		            width: 4
		        }),
		        fill: new ol.style.Fill({
		            color: 'rgba(255,0,0,0.4)'
		        })
		    })
		})
	}else if(type === 'SERVER'){
		$.ajax({
			url : '/knut-webgis/block',
			type : 'GET'
		}).then(function(res){
			var geoJson = JSON.parse(res);
			source = new ol.source.Vector({});
			layer = new ol.layer.Vector({
				title: layerName + '_wps',
	            source: source,
	            style: new ol.style.Style({
	            	image: new ol.style.Circle({
	            	       radius: 10,
	            	       fill: new ol.style.Fill({
	            	         color: 'black',
	            	       }),
	            	       stroke: new ol.style.Stroke({
	            	         color: 'white'
	            	       }),
	            	     }),
	            	     fill: new ol.style.Fill({
	            	         color: 'blue',
	            	       }),
	            	       stroke: new ol.style.Stroke({
	            	         color: 'white'
	            	       }),
	            	     
	            })
			});
			var features = (new ol.format.GeoJSON()).readFeatures(geoJson);

			layer.getSource().addFeatures(features);
			
			Mango.GIS.addLayer(layer);
		}, function(err){
			console.log(err);
		})
	}else if(type === 'WPS'){
		var url = Mango.Policy.geoserverDataUrl + '/wps';
		var xml;
		if(wpsAnalysis === 'centroid'){			
			xml = '<?xml version="1.0" encoding="EUC-KR"?>'
				+ '<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">'
				+ '<ows:Identifier>gs:Centroid</ows:Identifier>'
				+ '<wps:DataInputs>'
				+ '<wps:Input>'
				+    '<ows:Identifier>features</ows:Identifier>'
				+   '<wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">'
				+     '<wps:Body>'
				+        '<wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:seoul="mangosystem.com">'
				+         '<wfs:Query typeName="' + Mango.Policy.geoserverDataWorkspace + ':' + layerName + '" srsName="' + Mango.Policy.coordinate + '"/>'
				+       '</wfs:GetFeature>'
				+     '</wps:Body>'
				+   '</wps:Reference>'
				+  '</wps:Input>'
				+ '</wps:DataInputs>'
				+ '<wps:ResponseForm>'
				+ '<wps:RawDataOutput mimeType="application/json">'
				+    '<ows:Identifier>result</ows:Identifier>'
				+ '</wps:RawDataOutput>'
				+ '</wps:ResponseForm>'
				+ '</wps:Execute>';
		} else if(wpsAnalysis === 'simplify'){
			xml = '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">'
				+ '<ows:Identifier>gs:Simplify</ows:Identifier>'
				+ '<wps:DataInputs>'
				+ '<wps:Input>'
				+   '<ows:Identifier>features</ows:Identifier>'
				+   '<wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">'
				+     '<wps:Body>'
				+       '<wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:seoul="mangosystem.com">'
				+         '<wfs:Query typeName="' + Mango.Policy.geoserverDataWorkspace + ':' + layerName + '" srsName="' + Mango.Policy.coordinate + '"/>'
				+       '</wfs:GetFeature>'
				+     '</wps:Body>'
				+   '</wps:Reference>'
				+ '</wps:Input>'
				+ '<wps:Input>'
				+   '<ows:Identifier>distance</ows:Identifier>'
				+  '<wps:Data>'
				+    '<wps:LiteralData>100</wps:LiteralData>'
				+   '</wps:Data>'
				+ '</wps:Input>'
				+ '<wps:Input>'
				+   '<ows:Identifier>preserveTopology</ows:Identifier>'
				+   '<wps:Data>'
				+     '<wps:LiteralData>false</wps:LiteralData>'
				+  '</wps:Data>'
				+ '</wps:Input>'
				+ '</wps:DataInputs>'
				+ '<wps:ResponseForm>'
				+ '<wps:RawDataOutput mimeType="application/json">'
				+  '<ows:Identifier>result</ows:Identifier>'
				+ '</wps:RawDataOutput>'
				+ '</wps:ResponseForm>'
				+ '</wps:Execute>';
		}

		$.ajax({
			url: url,
			method: 'POST',
			data: xml,
			headers: { 
				"Content-Type": "text/xml; charset=utf-8"
					}
		}).then(
			function(res){
				source = new ol.source.Vector({});
				layer = new ol.layer.Vector({
					title: layerName + '_wps',
		            source: source,
		            style: new ol.style.Style({
		            	image: new ol.style.Circle({
		            	       radius: 10,
		            	       fill: new ol.style.Fill({
		            	         color: 'blue',
		            	       }),
		            	       stroke: new ol.style.Stroke({
		            	         color: 'white'
		            	       }),
		            	     }),
		            	     fill: new ol.style.Fill({
		            	         color: 'blue',
		            	       }),
		            	       stroke: new ol.style.Stroke({
		            	         color: 'white'
		            	       }),
		            	     
		            })
				});
				var features = (new ol.format.GeoJSON()).readFeatures(res);

				layer.getSource().addFeatures(features);
				
				Mango.GIS.addLayer(layer);
			}, function(err){
				console.log(err);
			})
	}

	
	//wmsLayer.setZIndex(Mango.GIS.getLayers().getArray().length - 1);

	if(type !== 'WPS' && type !== 'SERVER'){
		Mango.GIS.addLayer(layer);
	}
}
