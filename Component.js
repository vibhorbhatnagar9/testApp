sap.ui.define([
	'sap/ui/core/UIComponent'
], function(UIComponent) {
	"use strict";

	return UIComponent.extend("sap.ui.table.sample.TableFreeze.Component", {
		metadata: {
			manifest: "json"

		},
			init: function() {
			
			
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
		
			
			// this.getRouter().initialize();
		
		}
		

	});

});