

ctx.popup({ pAbout: {
	template: e.popup.template.Ok,
	title:  GLOBAL.labels.aboutPopup.title,
	IEHost: true,
	CX: 450,
	CY: 300,
	fade: 500,
	display: e.popup.display.Right,
	color: e.popup.color.Yellow,
	transparency: 90
}});


ctx.popup({ pClose: {
	template: e.popup.template.YesNo,
	title: GLOBAL.labels.stopPopup.title,
	CX: 500,
	CY: 130,
	fade: 500,
	message: '<br/><b>' + GLOBAL.labels.stopPopup.label + '</b><br/>', 
	transparency: 90,
	icon: '/gif/eyeball.gif'
}});


ctx.popup({ pUpdate: {
	template: e.popup.template.YesNo,
	title: GLOBAL.labels.updatePopup.title,
	CX: 500,
	CY: 180,
	message: '<br/><b>' + GLOBAL.labels.updatePopup.label + '</b><br/><br/>', 
	icon: e.popup.icon64.hello
}});

