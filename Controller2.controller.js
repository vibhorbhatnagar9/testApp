sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, MessageToast, DateFormat, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.table.sample.TableFreeze.Controller2", {
		
				onInit : function () {
	var oModel = new sap.ui.model.json.JSONModel({
        book: [{
                        "City": "New York ",
                        "Cost": 295584.81,
                        "Item Category": "Action Movies",
                        "Profit": 173793.31,
                        "Revenue": 469378.12,
                        "Unit Price": 1240.79,
                        "Units Available": 17336,
                        "Units Sold": 57571
                    }, {
                        "City": "New York ",
                        "Cost": 115132.04,
                        "Item Category": "Audio Equipment",
                        "Profit": 56994.34,
                        "Revenue": 172126.37,
                        "Unit Price": 763.21,
                        "Units Available": 11248,
                        "Units Sold": 37303
                    }, {
                        "City": "New York ",
                        "Cost": 171742.42,
                        "Item Category": "Cameras",
                        "Profit": 81093.4,
                        "Revenue": 252835.82,
                        "Unit Price": 1143.57,
                        "Units Available": 14917,
                        "Units Sold": 51664
                    }, {
                        "City": "New York ",
                        "Cost": 331033.94,
                        "Item Category": "Comedy Movies",
                        "Profit": 150465.23,
                        "Revenue": 481499.18,
                        "Unit Price": 2268.02,
                        "Units Available": 22449,
                        "Units Sold": 69005
                    }]
    });
    this.getView().setModel(oModel);
		}

		
});

});