sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"be/wl/PromisesDemo/model/models",
	"./service/NorthwindService"
], function (UIComponent, Device, models, NorthwindService) {
	"use strict";

	return UIComponent.extend("be.wl.PromisesDemo.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			NorthwindService.setModel(this.getModel());
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});