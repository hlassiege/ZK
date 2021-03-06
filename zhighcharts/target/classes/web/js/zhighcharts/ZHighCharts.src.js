(function () {

	
	
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {    
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    },
    rep;


	function quote(string,bracketsOn) {
	
	
	
	
	
	
		var b = '"';
		if(!bracketsOn)
			b = '';
	
	    escapable.lastIndex = 0;
	    var result = escapable.test(string) ? b + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + b : b + string + b;
	    return result;
	}


	function str(key, holder) {
	
	
	
	    var i,          
	        k,          
	        v,          
	        length,
	        mind = gap,
	        partial,
	        value = holder[key];
	
	
	
	    if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
	        value = value.toJSON(key);
	    }
	
	
	
	
	    if (typeof rep === 'function') {
	        value = rep.call(holder, key, value);
	    }
	
	
	
	    switch (typeof value) {
	    case 'string':
	    	
			if(key == "formatter"){
				return quote(value,false);
			}
			else return quote(value,true);
		
	    case 'function':
	    	return value;
	    
	    case 'number':
	
	
	
	        return isFinite(value) ? String(value) : 'null';
	
	    case 'boolean':
	    case 'null':
	
	
	
	
	
	        return String(value);
	
	
	
	
	    case 'object':
	
	
	
	
	        if (!value) {
	            return 'null';
	        }
	
	
	
	        gap += indent;
	        partial = [];
	
	
	
	        if (Object.prototype.toString.apply(value) === '[object Array]') {
	
	
	
	
	            length = value.length;
	            for (i = 0; i < length; i += 1) {
	                partial[i] = str(i, value) || 'null';
	            }
	
	
	
	
	            v = partial.length === 0 ? '[]' : gap ?
	                '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
	                '[' + partial.join(',') + ']';
	            gap = mind;
	            return v;
	        }
	
	
	
	        if (rep && typeof rep === 'object') {
	            length = rep.length;
	            for (i = 0; i < length; i += 1) {
	                k = rep[i];
	                if (typeof k === 'string') {
	                    v = str(k, value);
	                    if (v) {
	                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                    }
	                }
	            }
	        } else {
	
	
	
	            for (k in value) {
	                if (Object.prototype.hasOwnProperty.call(value, k)) {
	                    v = str(k, value);
	                    if (v) {
	                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                    }
	                }
	            }
	        }
	
	
	
	
	        v = partial.length === 0 ? '{}' : gap ?
	            '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
	            '{' + partial.join(',') + '}';
	        gap = mind;
	        return v;
	    }
	}
	
	
	MyStringify = function (value, replacer, space) {
	
	
	
	
	
	
	
	        var i;
	        gap = '';
	        indent = '';
	
	
	
	
	        if (typeof space === 'number') {
	            for (i = 0; i < space; i += 1) {
	                indent += ' ';
	            }
	
	
	
	        } else if (typeof space === 'string') {
	            indent = space;
	        }
	
	
	
	
	        rep = replacer;
	        if (replacer && typeof replacer !== 'function' &&
	                (typeof replacer !== 'object' ||
	                typeof replacer.length !== 'number')) {
	            throw new Error('MyJSON.stringify');
	        }
	
	
	
	
	        return str('', {'': value});
	    };
	    
    
	
	
	function merge_options(obj1,obj2){
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    return obj3;
	}

	function _renderPopupData(popup, data, obj) {
		popup.firstChild.setValue(data.name 
									+ " : " + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', obj.options.from)
									+ " -> " + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', obj.options.to));
		while (popup.lastChild.$oid != popup.firstChild.$oid) {
			popup.removeChild(popup.lastChild);
		}
		var rows = new zul.grid.Rows(),
			grid = null,
			html = null,
			lv = null, 
			lk = null;
		for (var key in data) {
			
			if (key == "html" && data[key] != undefined) {
				html = new zul.wgt.Html();
				html.setStyle("width: 100%;");
				html.setSclass('chartPopupHtml');
				html.setContent(data[key]);
			} else if (key != "name" && key != "html" 
				&& data[key] != undefined) { 
				var row = new zul.grid.Row();
				row.setHflex("1");
				lk = new zul.wgt.Label();
				lk.setValue(key);
				lv = new zul.wgt.Label();
				lv.setValue(data[key]);
				row.appendChild(lk);
				row.appendChild(lv);
				rows.appendChild(row);
			}
		} 
		if (rows.nChildren > 0) {
			if (html){
				popup.appendChild(html);
			}
			grid = new zul.grid.Grid();
			grid.setHflex("1");
			grid.setSclass("chartPopupGrid");
			grid.appendChild(rows);
			popup.appendChild(grid);
			rows = null;
		} else {
			rows = null;
			if (html)
				popup.appendChild(html);
		}
		popup.open(popup.parent, [0,0],'after_pointer');
	}

zhighcharts.ZHighCharts = zk.$extends(zul.wgt.Div, {
	_options: null, 
	_plotOptions: null, 
	_type: 'line',
	_tooltipFormatter: null,
	_labels: null,
	_lang: null,
	_legend: null,
	_subtitle: null,
	_title: null, 
	_tooltip: null, 
	_tooltipOptions: null, 
	_xAxisTitle: null, 
	_yAxisTitle: null, 
	_xPlotBands: null, 
	_yPlotBands: null, 
	_series: null,
	_pane: null, 
	_pointClickCallback: null,
	_clickCallback: null,
	
	updateGaugeValue: function (series,val) {
		this.chart.series[series].data[0].update(val);
	},
	
	
	zoomOut: function () {
		if (!this.chart)
			return;
		var extremes = this.chart.xAxis[0].getExtremes();
		this.chart.xAxis[0].setExtremes(extremes.dataMin,extremes.dataMax);
	},

	zoom: function (min,max) {
		if (!this.chart)
			return;
		var extremes = this.chart.xAxis[0].getExtremes();
		if (min < extremes.dataMin)
			min = extremes.dataMin;
		if (max > extremes.dataMax)
			max = extremes.dataMax;
		this.chart.xAxis[0].setExtremes(min,max);
	},

	
	addPoint: function (series,data) {
		var dataObj=null;
		if (typeof data === 'string') {
			try {
				dataObj = jq.evalJSON(data);
			} catch (err){
				console.error('ZHighCharts addPoint evalJSON data: %o error: %s',data,err);
				zk.error('ZHighCharts addPoint evalJSON data: ' + data 
						+ '\r\nfailed reason: ' + err);
			}
		} else if (data instanceof Object)
			dataObj = data;
		if (this.chart && dataObj) {
			for (i = 0;i < this.chart.series.length; i++) {
				var tseries = this.chart.series[i];
				if (tseries.name == series) {
					tseries.addPoint(dataObj, true);
					break;
				}
			}
		}
	},
	
	addPoints: function (data, shift) {
		var dataObj, point, series, max= 0, axis, inverted, extremes,tmp,name;
		
		if (typeof data === 'string') {
			try {
				dataObj = jq.evalJSON(data);
			} catch (err){
				console.error('addPoints evalJSON data: %o error: %s',data,err);
				zk.error('ZHighCharts addPoints evalJSON data :' 
						+ data + '\r\nfailed reason: ' + err);
			}
		} else if (data instanceof Object)
			dataObj = data;
		if (this.chart && dataObj) {
			inverted = this.chart.inverted;
			if (inverted)
				axis = this.chart.yAxis[0];
			else
				axis = this.chart.xAxis[0];
			
			for (j=0;j < dataObj.length; j++) {
				point = new Object()
				for (var key in dataObj[j]) {
					if (key != 'series')
						point[key] = dataObj[j][key];
					else
						name = dataObj[j][key];  
				}
				
				for (i = 0;i < this.chart.series.length; i++) {
					var tseries = this.chart.series[i];
					if (tseries.name == name) {
						if (inverted) {
							tmp = point.y;
							point.y = point.x;
							point.x = tmp;
							
							tseries.addPoint(point, false, shift);
							if (point.y > max)
								max = point.y 
						} else {
							tseries.addPoint(point, false, shift);
							if (point.x > max)
								max = point.x 
						}
					}
				}
			}
			extremes = axis.getExtremes();
			if (max > extremes.max) {
				axis.setExtremes(extremes.min, max, false);
			}
			this.chart.redraw();
		}
	}, 

	
	changePoint: function (series,data) {
		var dataObj=null,id,tseries,point,i,type='',isLine;
		if (typeof data === 'string') {
			try {
				dataObj = jq.evalJSON(data);
			} catch (err){
				console.error('ZHighCharts changePoint evalJSON data: %o error: %s',data,err);
				zk.error('ZHighCharts changePoint evalJSON data: ' + data + '\r\nfailed reason: ' + err);
			}
		} else if (data instanceof Object)
			dataObj = data;
		if (this.chart && dataObj) {

			for (i = 0;i < this.chart.series.length; i++) {
				tseries = this.chart.series[i];				
				if (tseries.name == series) {
					type = '' + tseries.options.type;
					if (type)
						isLine = tseries.options.type.indexOf('line') + 1;
					id = tseries.name + dataObj.x;
					point = this.chart.get(id);
					if (!point) {
						
						if (dataObj.index >=0)
							point = tseries.points[dataObj.index];
					}
					if (point) {
						
						
						if (dataObj.marker && dataObj.marker.symbol && !isLine) {
							point.remove();
							tseries.addPoint(dataObj);
						} else 
							point.update(dataObj);
					} else {
						zk.error('ZHighCharts.changePoint() point not found for data: x=' + dataObj.x
								+ ', y=' + dataObj.y + ', id=<'+ dataObj.id + '> !!!');
					}
				}
			}
		}
	}, 
	
	changePoints: function (data) {
		var dataObj, point, series, max= 0, axis, inverted, extremes,tmp,name,index,tseries,i,isLine,type,foundbyindex;
		
		if (typeof data === 'string') {
			try {
				dataObj = jq.evalJSON(data);
			} catch (err){
				console.error('changePoints evalJSON data: %o error: %s',data,err);
				zk.error('ZHighCharts changePoints evalJSON data: ' + data + '\r\nfailed reason: ' + err);
			}
		} else if (data instanceof Object)
			dataObj = data;
		if (this.chart && dataObj) {
			inverted = this.chart.inverted;
			if (inverted)
				axis = this.chart.yAxis[0];
			else
				axis = this.chart.xAxis[0];
			
			for (j=0;j < dataObj.length; j++) {
				point = new Object()
				for (var key in dataObj[j]) {
					if (key != 'series')
						point[key] = dataObj[j][key];
					else
						name = dataObj[j][key];  
				}
				
				for (i = 0;i < this.chart.series.length; i++) {
					tseries = this.chart.series[i];
					type = this.chart.series[i].options.type
					if (type)
						isLine = type.indexOf('line') + 1;
					
					foundbyindex=false;
					if (tseries.name == name) {
						id = tseries.name + point.x;
						tmp = this.chart.get(id);
						if (!tmp) {
							
							index = point.index;
							if (index)
								tmp = this.chart.series[i].points[index];
							foundbyindex=true;
						}
						if (tmp) { 
							if (point.marker && point.marker.symbol && !foundbyindex && !isLine) {
								tmp.remove();
								tseries.addPoint(point);
							} else
								tmp.update(point,false);
						}
					}
				}
			}

			this.chart.redraw();
		}
	}, 
	
	removePoints: function (series,data) {
		if (!this.chart)
			return;
		var dataObj = null, id, seriesA= null,pointIds = [],id, index= -1,i,seriesKey;
		if (typeof data === 'string') {
			try {
				dataObj = jq.evalJSON (data);
			} catch (err){
				console.error('ZHighCharts removePoint evalJSON data: %o error: %s',data,err);
				zk.error('ZHighCharts removePoints evalJSON data: ' + data + '\r\nfailed reason: ' + err);
			}
		} else if (data instanceof Object)
			dataObj = data;
		
		if (typeof series === 'string') {
			try {
				seriesA = jq.evalJSON (series);
			} catch (err){
				console.error('ZHighCharts removePoint evalJSON series: %o error: %s',series,err);
				zk.error('ZHighCharts removePoints evalJSON series: ' 
						+ series + '\r\nfailed reason: ' + err);
			}
		} else
			seriesA = series;
		
		if(seriesA && dataObj && dataObj.startIdx != undefined && dataObj.endIdx != undefined) {
			for(var k=0;k < seriesA.length;k++) {
				seriesKey = seriesA[k];
				index = -1;
				for (var j = 0;j < this.chart.series.length;j++) {
					if (seriesKey == this.chart.series[j].name) {
						index = j;
						break;
					}
				}
				if (index >= 0) {
					id = null;
					pointIds = [];
					for (i=dataObj.startIdx;i<=dataObj.endIdx;i++){
						try {
							id = this.chart.series[index].points[i].id;
							if (id) {pointIds.push(id);}
						} catch(err) {
							console.error('removePoint failed accessing series index: %d point index: %d', index, i);
						}
					}
					
					for (i=0;i<pointIds.length;i++) {
						this.chart.get(pointIds[i]).remove(false);
					}
				}
			}
		}
		this.chart.redraw();
	},

	getPointAtIndex: function(seriesIdx,pointIdx) {
		if (!this.chart || !this.chart.series 
			|| seriesIdx >= this.chart.series.length
			|| pointIdx >= this.chart.series[seriesIdx].data.length)
			return null;
		return this.chart.series[seriesIdx].points[pointIdx];
	},
	
	getPoint: function(id) {
		if (this.chart)
			return this.chart.get(id);
		return null;
	},
	
	getSeriesPointAtIndex: function(series,pointIdx) {
		var seriesIdx=-1; 
		if (!this.chart ||!this.chart.series)
			return null;
		for (var i=0;i < this.chart.series.length;i++) {
			if (series == this.chart.series[i].name) {
				seriesIdx = i;
				break;
			}
		}
		if (seriesIdx >= 0 && pointIdx >= 0 
				&& pointIdx < this.chart.series[seriesIdx].data.length)
			return this.chart.series[seriesIdx].data[pointIdx];
	},
	getSeriesLength: function(series) {
		var seriesIdx=-1; 
		if (!this.chart ||!this.chart.series)
			return null;
		for (var i=0;i < this.chart.series.length;i++) {
			if (series == this.chart.series[i].name) {
				seriesIdx = i;
				break;
			}
		}
		if (seriesIdx >= 0 && this.chart.series[seriesIdx] 
			&& this.chart.series[seriesIdx].data)
			return this.chart.series[seriesIdx].data.length;
		return 0;
	},
	
	
	addBand: function (series,data, isYBand) {
		var dataObj,axis,extremes, max;
		if (typeof data === 'string') {
			try {
				dataObj = jq.evalJSON (data);
			} catch (err){
				console.error('ZHighCharts addBand evalJSON data: %o error: %s',data,err);
				zk.error('ZHighCharts addBand evalJSON data: ' + data 
						+ '\r\nfailed reason: ' + err);
			}
		} else if (data instanceof Object)
			dataObj = data;
		if (this.chart && dataObj) {
			this._addEventToBand(dataObj);
			if (!isYBand) {
				extremes = this.chart.xAxis[0].getExtremes();		
				if (dataObj.to && dataObj.to > extremes.max)
					max = dataObj.to;
				else
					max = extremes.max;
				this.chart.xAxis[0].setExtremes(extremes.min, max, false);
				this.chart.xAxis[0].addPlotBand(dataObj);
			} else {
				this.chart.yAxis[0].addPlotBand(dataObj);
			}
			this.chart.redraw();
		}
	}, 
	
	changeBand: function (series, data, isYBand) {
		var dataObj,axis,extremes, max;
		if (typeof data === 'string')
			dataObj = jq.evalJSON (data);
		else if (data instanceof Object)
			dataObj = data;
		
		if (dataObj) {
			this._addEventToBand(dataObj);
			if (!isYBand) {
				axis = this.chart.xAxis[0];
				extremes = axis.getExtremes();		
				if (dataObj.to && dataObj.to > extremes.max)
					max = dataObj.to;
				else
					max = extremes.max;
				axis.setExtremes(extremes.min, max, false);
			} else
				axis = this.chart.yAxis[0];
			if (axis) {
				
				axis.removePlotBand(dataObj.id);
				axis.addPlotBand(dataObj);
				this.chart.redraw();
			}
		}
	}, 
	
	removeBand: function (series,data, isYBand) {
		var dataObj,axis,extremes, max;
		if (typeof data === 'string')
			dataObj = jq.evalJSON (data);
		else if (data instanceof Object)
			dataObj = data;
		if (dataObj) {
			if (!isYBand)
				axis = this.chart.xAxis[0];
			else
				axis = this.chart.yAxis[0];
			if (axis) {
				
				axis.removePlotBand(dataObj.id);
			}
		}
	}, 
	
	clearBands: function (isYBand) {
		var ids = [];
		if (!isYBand)
			axis = this.chart.xAxis[0];
		else
			axis = this.chart.yAxis[0];
		if (axis) {
			
			for (var i=0;i<axis.plotLinesAndBands.length;i++) {
				ids.push(axis.plotLinesAndBands[i].id);
			}
			for (var i=0;i<ids.length;i++) {
				axis.removePlotBand(ids[i]);
			}
		}
	},
	
	getBandById: function(id, isYBand) {
		var axis;
		if (!isYBand)
			axis = this.chart.xAxis[0];
		else
			axis = this.chart.yAxis[0];
		if (axis) {
			for (var i=0;i<axis.plotLinesAndBands.length;i++) {
				if (axis.plotLinesAndBands[i].id == id) {
					return axis.plotLinesAndBands[i];
				}
			}
		}
		return null;
	},
	
	getBandAtIndex: function(idx, isYBand) {
		var axis;
		if (!isYBand)
			axis = this.chart.xAxis[0];
		else
			axis = this.chart.yAxis[0];
		if (axis && axis.plotLinesAndBands 
				&& idx < axis.plotLinesAndBands.length)
				return axis.plotLinesAndBands[i];
		return null;
	},

	
	
	$init: function () {
		this.$supers('$init', arguments);
	},
	
	$define: {
		options: function() { 
			if (this._options) {
				try {
					this.chartOptions = 
						merge_options(this.chartOptions,jq.evalJSON (MyStringify(jq.evalJSON(this._options))));
				} catch (err){
					console.error('ZHighCharts evalJSON chart options error: '+ err);
					zk.error('ZHighCharts addBand evalJSON chart options: ' + this._options 
							+ '\r\nfailed reason: ' + err);
				}
			}
			if(this.desktop && this.chart) {
				
			}
		},
		
		
		
		type: function() { 
		},
		series: function() {
			if(this.desktop && this.chart && this._series) {
				
			}
		},
		xPlotBands: function() {
		},
		yPlotBands: function() {
		},
		xAxisTitle: function() {
		},
		yAxisTitle: function() {
		},
		xAxisOptions: function() {
		},
		yAxisOptions: function() {
		},
		tooltipFormatter: function() {
		},
		tooltipOptions: function() {
		},	
		plotOptions: function() {
		},	
		pane: function() {
		},	
		labels: function() {
			if(this.desktop && this.chart) {
				
			}
		},
		legend: function() {
			if(this.desktop && this.chart) {
				
			}
		},
		title: function() { 
			if(this.desktop && this.chart) {
				
				this.chart.title.text = this._title;
			}
		},
		subtitle: function() { 
			if(this.desktop && this.chart) {
				
				this.chart.subtitle.text = this._subtitle;
				this.chart.redraw();
			}
		},
		pointClickCallback: function() {
			
		},
		clickCallback: function() {
			
		}

	},
	
	bind_: function () {
		this.$supers(zhighcharts.ZHighCharts,'bind_', arguments);
				
		
		
		var strfun = null,series,xPlotBands,yPlotBands,xAxis,yAxis,tooltipOptions,
			legend = {},
			pane = {},
			plotOptions = {},
			strdlf;
		
		try {
			series = jq.evalJSON(MyStringify(jq.evalJSON(this._series)));
		} catch (err) {
			console.error('evalJSON series failed reason: ' + err);
			zk.error('ZHighCharts evalJSON series failed reason: ' + err);
		}
		try {
			xPlotBands = jq.evalJSON(MyStringify(jq.evalJSON(this._xPlotBands)));
		} catch (err) {
			console.error('evalJSON xPlotBands failed reason: ' + err);
			zk.error('ZHighCharts evalJSON xPlotBands failed reason: ' + err);
		}
		try {
			yPlotBands = jq.evalJSON(MyStringify(jq.evalJSON(this._yPlotBands)));
		} catch (err) {
			console.error('evalJSON yPlotBands failed reason: ' + err);
			zk.error('ZHighCharts evalJSON yPlotBands failed reason: ' + err);
		}
		try {
			xAxis = jq.evalJSON(MyStringify(jq.evalJSON(this._xAxisOptions)));
		} catch (err) {
			console.error('evalJSON xAxis options: ' + this._xAxisOptions 
					+' failed reason: ' + err);
			zk.error('evalJSON xAxis options:' + this._xAxisOptions 
					+' failed reason: ' + err);
		}
		
		try {
			yAxis = jq.evalJSON(MyStringify(jq.evalJSON(this._yAxisOptions)));
		} catch (err) {
			console.error('evalJSON yAxis options: ' + this._yAxisOptions 
					+' failed reason: ' + err);
			zk.error('evalJSON yAxis options: ' + this._yAxisOptions 
					+' failed reason: ' + err);
		}
		try {
			tooltipOptions = jq.evalJSON(MyStringify(jq.evalJSON(this._tooltipOptions)));
		} catch (err) {
			console.error('evalJSON tooltipOptions failed reason: ' + err);
			zk.error('evalJSON yAxis tooltipOptions: ' + this._yAxisOptions 
					+' failed reason: ' + err);
		}

		
		if (xAxis == undefined)
			xAxis = new Object();
		if (yAxis == undefined)
			yAxis = new Object();
		if (xAxis && xPlotBands) {
			xAxis.plotBands = xPlotBands;
		}
		if (xAxis) {
			xAxis.title = {text: this._xAxisTitle};
		}
		if (yAxis && yPlotBands) {
			yAxis.plotBands = yPlotBands;
		}
		if (yAxis) {
			yAxis.title = {text: this._yAxisTitle};
		}
		if (this._plotOptions) {
			try {
				plotOptions = jq.evalJSON(MyStringify(jq.evalJSON(this._plotOptions)));
			} catch (err) {
				console.error('ZHighCharts evalJSON plotOptions failed reason: ' + err);
				zk.error('evalJSON plotOptions: ' + this._plotOptions 
						+' failed reason: ' + err);
			}
		}
		if (this._legend) {
			try {
				legend = jq.evalJSON(MyStringify(jq.evalJSON(this._legend)));
			} catch (err) {
				console.error('ZHighCharts evalJSON legend failed reason: ' + err);
				zk.error('evalJSON legend: ' + this._legend 
						+' failed reason: ' + err);
			}
		}
		
		if (this._pane) {
			try {
				pane = jq.evalJSON(MyStringify(jq.evalJSON(this._pane)));
			} catch (err) {
				console.error('ZHighCharts evalJSON pane failed reason: ' + err);
				zk.error('evalJSON pane: ' + this._pane 
						+' failed reason: ' + err);
			}
		}

		
		if (this._tooltipFormatter){
			strfun = this._tooltipFormatter;
			try {
				eval(strfun);
			} catch (err){
				console.error('ZHighCharts eval formatTooltip error: '+ err);
				zk.error('eval tooltipFormatter: ' + this._tooltipFormatter 
						+' failed reason: ' + err);
			}
		}
		
		if (tooltipOptions == null ){
			tooltipOptions = new Object();
		}
		if(this._tooltipFormatter)
			tooltipOptions.formatter = function() { 
		    	 	return formatTooltip(this);
		};
		    
	    
	    if (this._pointClickCallback) {
	    	if (this._pointClickCallback.indexOf('function pointClick') >= 0) {
				try {
					eval(this._pointClickCallback);
					var click = function() {
						return pointClick(this);
					};

					plotOptions.series.point = {events:{click: click}};
					
				} catch (err){
					console.error('ZHighCharts eval pointClickCallback error: '+ err);
					zk.error('eval pointClickCallback: ' + this._pointClickCallback 
							+' failed reason: ' + err);
				}
	    	} else
	    		zk.error('bad pointClickCallback: ' + this._pointClickCallback 
	    				+ 'must contain "function pointClick"'); 
		}
		
		
		if (this.getTooltip())
			this.bPopup = this.$f(this.getTooltip());
		
		if (!this.chartOptions) {
			this.chartOptions = new Object();
		}
		if (this.chartOptions.mapComp){
			var comp = this.$f(this.chartOptions.mapComp,true);
			if (comp)
				this.chartOptions.mapComp = comp;
		}
		
		this.chartOptions.renderTo = this.$n();
		if (this._type) {
			this.chartOptions.defaultSeriesType = this._type;
		}
		
	    
	    if (this._clickCallback) {
	    	if (this._clickCallback.indexOf('function chartClick') >= 0) {
				try {
					eval(this._clickCallback);
					var click = function() {
						return chartClick(this);
					};

					this.chartOptions.events = {click: click};
					
				} catch (err){
					console.error('ZHighCharts eval clickCallback error: '+ err);
					zk.error('eval clickCallback: ' + this._clickCallback 
							+' failed reason: ' + err);
				}
	    	} else
	    		zk.error('bad clickCallback: ' + this._clickCallback 
	    				+ 'must contain "function chartClick"'); 
		}
		
		if(series && series.length > 0)
			for (i = 0; i < series.length;i++) {
				if (series[i].gauge) {
					var name = series[i].gauge,
					wgt = this.$f(name);
					if (wgt)
						series[i].gauge = wgt;
				}
			}
		
		this.chartOptions.parentWidget = this;
		
		
		this._addBandEvents(xPlotBands);
		
		this._addBandEvents(yPlotBands);
		
		
		this.chart = new Highcharts.Chart({
			credits: { enabled: false
			},
			chart: this.chartOptions,
			title: {
				text: this._title
			},
			subtitle: {
				text: this._subtitle
			},
			xAxis: xAxis,
			
			yAxis: yAxis,
			
			pane : pane,
			
			tooltip: tooltipOptions,
		    legend: legend,
			plotOptions: plotOptions,
			series: series
			});
				
	},
	
	unbind_: function () {
	
		this.$supers(zhighcharts.ZHighCharts,'unbind_', arguments);
	},
	
	
	_addBandEvents: function(plotBands) {
		if (plotBands == null)
			return;
		
		
		for (var i = 0; i < plotBands.length; i++) {
			
			this._addEventToBand(plotBands[i]);
		}
		
	},
	
	_addEventToBand: function (band) {
		var allow = true;
		if (band.noMouseEvents)
			allow = false;
		if (band.data && allow) {
			var 
			popup = this.bPopup,
			events = {
		        	mouseover: function(e) {
		                
			            var popup = this.options.popup,
		                data = this.options.data;
		                if (popup) {
		                	if (data.name) {
			            		popup.firstChild.setValue(data.name 
										+ " : " + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.options.from)
										+ " -> " + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.options.to));
			            		if (popup.lastChild.$oid != popup.firstChild.$oid) {
			            			popup.removeChild(popup.lastChild);
			            		}
			                	popup.setSclass("chartPopup");
			                	popup.open(popup.parent, [0,0],'after_pointer');
		                	} 
		                }
		            },
		            mouseout: function(e) {
		            	var popup = this.options.popup;
		            	if (popup) {
		            		popup.firstChild.setValue("");
		            		if (popup.lastChild.$oid != popup.firstChild.$oid) {
		            			popup.removeChild(popup.lastChild);
		            		}
		            		popup.setSclass("chartPopupClosed");
		            		popup.close();
		            	}
		            },
		            click: function(e) {

		                var popup = this.options.popup,
		                data = this.options.data;
		                if (popup) {
		                	_renderPopupData(popup, data, this)
		                }
		            }
		        };
			band.events = events;
			band.popup = popup;
		}
	},
	
	getZclass: function () {
		return this._zclass != null ? this._zclass: "z-ZHighCharts";
	},
	
});
})();
