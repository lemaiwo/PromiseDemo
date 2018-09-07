sap.ui.define([
	"./CoreService"
], function (CoreService) {
	"use strict";

	var NorthwindService = CoreService.extend("be.wl.PromisesDemo.service.NorthwindService", {
		getSuppliers: function () {
			return this.odata("/Suppliers").get();
		},
		getSuppliersWithFilter: function (aFilters) {
			var mParameters = {
				filters:aFilters
			};
			return this.odata("/Suppliers").get(mParameters);
		},
		getSupplierById: function (id) {
			var sObjectPath = this.model.createKey("Suppliers", {
				SupplierID: id
			});
			return this.odata("/"+sObjectPath).get();
		}
	});
	return new NorthwindService();
});