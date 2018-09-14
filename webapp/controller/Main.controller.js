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
			var aFilters = [new Filter("Address/City", FilterOperator.EQ, "Redmond")];
			me.getView().setModel(oViewModel, "view");

			this.getOwnerComponent().getModel().metadataLoaded()
				.then(NorthwindService.getSupplierById.bind(NorthwindService, "20"))
				.then(function (oSupplier) {
					oViewModel.setProperty("/progress", 30);
					MessageToast.show("Company name of the first Supplier:" + oSupplier.data.CompanyName);
					return true;
				}).catch(function (error) {
					MessageToast.show("Supplier with ID 20 does not exist");
					jQuery.sap.log.error("Supplier with ID 20 does not exist");
				})
				.then(NorthwindService.getSuppliersWithFilter.bind(NorthwindService, aFilters))
				.then(function (aSuppliers) {
					oViewModel.setProperty("/progress", 70);
					MessageToast.show("Suppliers in Redmond:" + aSuppliers.data.results.length);
					return true;
				})
				.then(NorthwindService.getSuppliers.bind(NorthwindService))
				.then(function (response) {
					oViewModel.setProperty("/progress", 100);
					me.getView().setModel(new JSONModel({
						Suppliers: response.data.results
					}), "nw");
				})
				.catch(function (error) {
					jQuery.sap.log.error("This should never have happened:" + error);
				});
		},
		generateNewSupplier: function (oEvent) {
			var me = this;
			var oNewSupplier = {
				Name: "Test" + new Date().getTime(),
				Address: {
					Street: "TestStreet",
					City: "TestCity",
					State: "TestState",
					ZipCode: "TestZip",
					Country: "Belgium"
				}
			};
			NorthwindService.geSupplierNextID().then(function (id) {
					oNewSupplier.ID = id;
					return NorthwindService.createSupplier(oNewSupplier);
				}).then(function (response) {
					MessageToast.show("Suppliers created!");
				}).catch(function (error) {
					jQuery.sap.log.error("Error during create:" + error);
				}).then(NorthwindService.getSuppliers.bind(NorthwindService))
				.then(function (response) {
					me.getView().setModel(new JSONModel({
						Suppliers: response.data.results
					}), "nw");
				}).catch(function (error) {
					jQuery.sap.log.error("Error refreshing data:" + error);
				});
		}
	});
});