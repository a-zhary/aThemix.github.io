const smartGrid = require('smart-grid');

const options = {
	filename: "smart-grid",
	outputStyle: "scss",
	columns: 12,
	offset: "30px",
	mobileFirst: false,
	container: {
		maxWidth: "1140px",
		fields: "30px"
	},
	breakPoints: {
		lg: {
			width: "1024px"
		},
		md: {
			width: "992px",
			fields: "15px"
		},
		sm: {
			width: "720px"
		},
		xs: {
			width: "576px"
		},
		xxs: {
			width: "320px"
		}
	},
	mixinNames: {
		container: "wrapper",
		row: "row-flex",
		rowFloat: "row-float",
		rowInlineBlock: "row-ib",
		rowOffsets: "row-offsets",
		column: "col",
		size: "size",
		columnFloat: "col-float",
		columnInlineBlock: "col-ib",
		columnPadding: "col-padding",
		columnOffsets: "col-offsets",
		shift: "shift",
		from: "from",
		to: "to",
		fromTo: "from-to",
		reset: "reset",
		clearfix: "clearfix",
		debug: "debug",
		uRowFlex: "u-row-flex",
		uColumn: "u-col",
		uSize: "u-size"
	},
	tab: "    ",
	defaultMediaDevice: "screen",
	detailedCalc: false
};

smartGrid('./app/libs/smart-grid/', options);
