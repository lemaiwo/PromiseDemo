sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../service/NorthwindService",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, NorthwindService, JSONModel, MessageToast, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("be.wl.PromisesDemo.controller.Main", {
		onInit: function () {
			var me = this;
			var oViewModel = new JSONModel({
				progress: 10
			});
			var aFilters = [new Filter("Country", FilterOperator.EQ, "Germany")];
			me.getView().setModel(oViewModel, "view");
			this.getOwnerComponent().getModel().metadataLoaded()
				.then(NorthwindService.getSupplierById.bind(NorthwindService, "1"))
				.then(function (oSupplier) {
					oViewModel.setProperty("/progress", 30);
					MessageToast.show("Company name of the first Supplier:" + oSupplier.data.CompanyName);
					return true;
				})
				.then(NorthwindService.getSupplierById.bind(NorthwindService, "5"))
				.then(function (oSupplier) {
					oViewModel.setProperty("/progress", 40);
					MessageToast.show("Company name of the fifth Supplier:" + oSupplier.data.CompanyName);
					return true;
				})
				.then(NorthwindService.getSuppliersWithFilter.bind(NorthwindService, aFilters))
				.then(function (aSuppliers) {
					oViewModel.setProperty("/progress", 70);
					MessageToast.show("Suppliers in Germany:" + aSuppliers.data.results.length);
					return true;
				})
				.then(NorthwindService.getSuppliers.bind(NorthwindService))
				.then(function (response) {
					oViewModel.setProperty("/progress", 100);
					me.getView().setModel(new JSONModel({
						Suppliers: response.data.results
					}), "nw");
				});
		}
	});
});