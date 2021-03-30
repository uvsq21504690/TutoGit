
// *** Choose language (en|fr|de) ***
GLOBAL.labels.setLanguage(e.language.English);

// Global Systray object
var systray = ctx.systray();

/** Show diagnostic popup */
GLOBAL.addOn({ evShowDiagnostic: function(ev) {
	ctx.diagnostic.showSubmitPopup();
}});

/** Show diagnostic recorder popup */
GLOBAL.addOn({ evShowDiagRecorder: function(ev) {
	ctx.diagnostic.showRecordInitPopup();
}});

/** main process start handler */
GLOBAL.events.START.on(function (ev) {

	// *** Create Systray ***
	systray.loadImage('stop', 'FILE', ctx.options.path.resources + '/bmp/stop.png');
	systray.loadImage('restart', 'FILE', ctx.options.path.resources + '/bmp/repeat.png');
	systray.loadImage('about', 'FILE', ctx.options.path.resources + '/bmp/help.png');
	systray.createSystrayMenu(ctx.options.projectName, 'ICON1');

	/** 'About...' menu handler */
	systray.addMenu('', 'evCtxtAbout', GLOBAL.labels.menu.about, 'about', function (ev) {
		var label = "<H4>" + ctx.options.projectLabel + "</H4>" 
			+ GLOBAL.labels.aboutPopup.projectVersion + ": <b>" + ctx.options.projectVersion + "</b>&nbsp; (<b>" + ctx.options.projectDate + "</b>)<br/>" 
			+ GLOBAL.labels.aboutPopup.productVersion + ": <b>" + ctx.options.productVersion + "</b><br/>" 
			+ GLOBAL.labels.aboutPopup.frameworkVersion + ": <b>" + ctx.options.frameworkVersion + "</b><br/>";
		if (ctx.options.productVersions && ctx.options.productVersions['UnifiedStudio'])
			label += GLOBAL.labels.aboutPopup.studioVersion + ": <b>" + ctx.options.productVersions['UnifiedStudio'] + "</b><br/>" 
		if (ctx.options.env != e.env.prod)
			label += GLOBAL.labels.aboutPopup.environment + ": <b>" + GLOBAL.labels.env[ctx.options.env] + "</b><br/>";
		
		ctx.popup('pAbout', e.popup.template.Ok).open({
			title:  GLOBAL.labels.aboutPopup.title,
			CX: 500,
			CY: 300,
			message: label, 
			icon: ctx.options.path.resources + '/bmp64/hello128.png'
		});
	});
	
	/** Stop menu handler */
	systray.addMenu('', 'evCtxtStop', GLOBAL.labels.menu.stop, 'stop', function(ev) {
		ctx.popup('pClose', e.popup.template.YesNo).open({
			title: GLOBAL.labels.stopPopup.title,
			CX: 500,
			CY: 180,
			message: '<br/><br/><b>' + GLOBAL.labels.stopPopup.label + '</b><br/><br/>', 
			icon: ctx.options.path.resources + '/bmp64/hello.png'
		}).waitResult(function(res) {
			if (res == e.item.id.Yes) {
				ctx.shutdownContextor();				
			}
		});
	});

	systray.loadImage('ICON2', 'FILE', ctx.options.path.resources + '/bmp/record.png');
	/** Diagnostic */
	ctx.regHotKey(e.key.Ctrl + e.key.Shift + 'D', GLOBAL.events.evShowDiagnostic);	// shortcut Ctrl+Shift+D to display diagnostic
	systray.addMenu('', 'evReportBug', GLOBAL.labels.menu.reportIncident + ' (Ctrl+Shift+D)', 'ICON2', function(ev) {
		GLOBAL.notify(GLOBAL.events.evShowDiagnostic);
	});

	/** Trace recorder */
	ctx.regHotKey(e.key.Ctrl + e.key.Shift + 'R', GLOBAL.events.evShowDiagRecorder);  // shortcut Ctrl+Shift+R to display recorder
	systray.addMenu('', 'evRecordTraces', GLOBAL.labels.menu.recordTraces + ' (Ctrl+Shift+R)', 'ICON2', function(ev) {
		GLOBAL.notify(GLOBAL.events.evShowDiagRecorder);
	});
});

/** Auto-update menu handler */
GLOBAL.events.UPDATECTX.on(function(ev) {
	if (ctx.options.updateConfirmation) {
		ctx.popup('pUpdate', e.popup.template.YesNo).open({
			title: GLOBAL.labels.updatePopup.title,
			CX: 500,
			CY: 180,
			message: '<br/><br/><b>' + GLOBAL.labels.updatePopup.label + '</b><br/><br/>', 
			icon: ctx.options.path.resources + '/bmp64/hello.png'
		}).waitResult(function(res) {
			if (res == e.item.id.Yes) {
				ctx.shutdownContextor(true);				
			}
		});
	} else {
		ctx.shutdownContextor(true);				
	}
});


