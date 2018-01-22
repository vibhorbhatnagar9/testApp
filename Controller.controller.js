sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, MessageToast, DateFormat, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.table.sample.TableFreeze.Controller", {

		onInit : function () {
			// set explored app's demo model on this sample
			var oView = this.getView();
			var oJSONModel = this.initSampleDataModel();
			this.getView().setModel(oJSONModel);
		oView.setModel(new JSONModel({
				globalFilter: "",
				availabilityFilterOn: false,
				cellFilterOn: false
			}), "ui");
			
			this._oGlobalFilter = null;
			this._oPriceFilter = null;
			oView.byId("multiheader").setHeaderSpan([5,1,1]);
			oView.byId("multiheader1").setHeaderSpan([3,1,1]);
			oView.byId("multiheader2").setHeaderSpan([3,1,1]);
		},
		
		_filter : function () {
			var oFilter = null;
			
			if (this._oGlobalFilter && this._oPriceFilter) {
				oFilter = new sap.ui.model.Filter([this._oGlobalFilter, this._oPriceFilter], true);
			} else if (this._oGlobalFilter) {
				oFilter = this._oGlobalFilter;
			} else if (this._oPriceFilter) {
				oFilter = this._oPriceFilter;
			}
			
			this.getView().byId("table1").getBinding("rows").filter(oFilter, "Application");
		},
		
		filterGlobally : function(oEvent) {
			var sQuery = oEvent.getParameter("query");
			this._oGlobalFilter = null;
			
			if (sQuery) {
				this._oGlobalFilter = new Filter([
					new Filter("Name", FilterOperator.Contains, sQuery),
					new Filter("ProductId", FilterOperator.Contains, sQuery)
				], false);
			}
				
			this._filter();
		},
		
	

		initSampleDataModel : function() {
			var oModel = new JSONModel();

			var oDateFormat = DateFormat.getDateInstance({source: {pattern: "timestamp"}, pattern: "dd/MM/yyyy"});

			jQuery.ajax(jQuery.sap.getModulePath("sap.ui.demo.mock", "/prods.json"), {
				dataType: "json",
				success: function (oData) {
				/*	var aTemp1 = [];
					var aTemp2 = [];
					var aSuppliersData = [];
					var aCategoryData = [];
					for (var i = 0; i < oData.ProductCollection.length; i++) {
						var oProduct = oData.ProductCollection[i];
						if (oProduct.SupplierName && jQuery.inArray(oProduct.SupplierName, aTemp1) < 0) {
							aTemp1.push(oProduct.SupplierName);
							aSuppliersData.push({Name: oProduct.SupplierName});
						}
						if (oProduct.Category && jQuery.inArray(oProduct.Category, aTemp2) < 0) {
							aTemp2.push(oProduct.Category);
							aCategoryData.push({Name: oProduct.Category});
						}
						oProduct.DeliveryDate = (new Date()).getTime() - (i % 10 * 4 * 24 * 60 * 60 * 1000);
						oProduct.DeliveryDateStr = oDateFormat.format(new Date(oProduct.DeliveryDate));
						oProduct.Heavy = oProduct.WeightMeasure > 1000 ? "true" : "false";
						oProduct.Available = oProduct.Status == "Available" ? true : false;
					}

					oData.Suppliers = aSuppliersData;
					oData.Categories = aCategoryData;*/

					oModel.setData(oData);
				},
				error: function () {
					jQuery.sap.log.error("failed to load json");
				}
			});

			return oModel;
		},

		formatAvailableToObjectState : function (bAvailable) {
			return bAvailable ? "Success" : "Error";
		},

		formatAvailableToIcon : function(bAvailable) {
			return bAvailable ? "sap-icon://accept" : "sap-icon://decline";
		},

		handleDetailsPress : function(oEvent) {
			MessageToast.show("Details for product with id " + this.getView().getModel().getProperty("ProductId", oEvent.getSource().getBindingContext()));
			
			
		},
		
		clearAllFilters : function(oEvent) {
			var oTable = this.getView().byId("table1");
			
 
			var oUiModel = this.getView().getModel("ui");
			oUiModel.setProperty("/globalFilter", "");
			oUiModel.setProperty("/availabilityFilterOn", false);
 
			this._oGlobalFilter = null;
			this._oPriceFilter = null;
			this._filter();
 
			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				if(aColumns[i].getFiltered())
				{
				oTable.filter(aColumns[i], null);
				aColumns[i].setFiltered(true);
				}
			}
		},

		addButtonPress : function (oEvent) {
			var oView = this.getView(),
				oTable = oView.byId("table1");
				
			
			
				var Total = 0 ;
			 var val = 0;
			 var context = oTable.getBinding("rows").getContexts();
			// Fixed column count exceeds the total column count
			for(var i=0;i<context.length;i++)
			{
			val = context[i].getProperty("AvgThree");
			 Total = val + Total ;
			}
			
				MessageToast.show(Total);

		
	
		},
			toView2: function()
	{
		this.getRouter().navTo("view 2");
	},
		
				buttonPress : function (oEvent) {
			var oView = this.getView(),
				oTable = oView.byId("table1"),
				sColumnCount = oView.byId("inputColumn").getValue() || 0,
				sRowCount = oView.byId("inputRow").getValue() || 0,
				sBottomRowCount =0, //oView.byId("inputButtomRow").getValue() || 0,
				iColumnCount = parseInt(sColumnCount,10),
				iRowCount = parseInt(sRowCount,10),
				iBottomRowCount = parseInt(sBottomRowCount,10),
				iTotalColumnCount = oTable.getColumns().length,
				iTotalRowCount = oTable.getRows().length;

			// Fixed column count exceeds the total column count
			if (iColumnCount > iTotalColumnCount) {
				iColumnCount = iTotalColumnCount;
				oView.byId("inputColumn").setValue(iTotalColumnCount);
				MessageToast.show("Fixed column count exceeds the total column count. Value in column count input got updated.");
			}

			// Sum of fixed row count and bottom row count exceeds the total row count
			if (iRowCount + iBottomRowCount > iTotalRowCount) {

				if ((iRowCount < iTotalRowCount) && (iBottomRowCount < iTotalRowCount)) {
					// both row count and bottom count smaller than total row count
					iBottomRowCount = 1;
				} else if ((iRowCount > iTotalRowCount) && (iBottomRowCount < iTotalRowCount)) {
					// row count exceeds total row count
					iRowCount = iTotalRowCount - iBottomRowCount - 1;
				} else if ((iRowCount < iTotalRowCount) && (iBottomRowCount > iTotalRowCount)) {
					// bottom row count exceeds total row count
					iBottomRowCount = iTotalRowCount - iRowCount - 1;
				} else {
					// both row count and bottom count exceed total row count
					iRowCount = 1;
					iBottomRowCount = 1;
				}

				// update inputs
				oView.byId("inputRow").setValue(iRowCount);
				oView.byId("inputButtomRow").setValue(iBottomRowCount);
				MessageToast.show("Sum of fixed row count and buttom row count exceeds the total row count. Input values got updated.");
			}

			oTable.setFixedColumnCount(iColumnCount);
			oTable.setFixedRowCount(iRowCount);
			oTable.setFixedBottomRowCount(iBottomRowCount);
		}

	});

});