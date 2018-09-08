sap.ui.define([
	"./CoreService",
	"sap/ui/model/Sorter"
], function (CoreService,Sorter) {
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
				ID: id
			});
			return this.odata("/"+sObjectPath).get();
		},
		geSupplierNextID:function(){
			var mParameters = {
				sorters:[new Sorter("ID",true)],
				urlParameters:"$top=1"
			};
			return this.odata("/Suppliers").get(mParameters).then(function(response){
				return response.data.results && response.data.results.length > 0 ? response.data.results[0].ID + 1:0;
			});
		},
		createSupplier: function(oSupplier){
			return this.odata("/Suppliers").post(oSupplier);
		}
	});
	return new NorthwindService();
});