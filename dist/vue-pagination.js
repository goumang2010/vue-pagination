/*!
 * vue-pagination v1.0.0
 * (c) 2016 Luo Ye
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vuePagination = factory());
}(this, (function () { 'use strict';

var mixin = function mixin(source, target) {
	for (var i in target) {
		if (target.hasOwnProperty(i)) {
			source[i] = target[i];
		}
	}
	return source;
};

var warn = function warn(e) {
	console.warn(e);
};

var defaultOptions$1 = {
	firstStr: 'First',
	prevStr: 'Prev',
	nextStr: 'Next',
	lastStr: 'Last',
	first: true,
	prev: true,
	next: true,
	last: true,
	normal: true,
	currentPage: 1,
	itemsPerPage: 10,
	pagesLength: 5,
	totalItems: 0,
	onChange: function onChange() {}
};

function vPagination (componentOptions) {
	return {
		name: 'vue-pagination',
		template: '<div class="pagination-con" v-show="paginationConfig.totalItems !== 0">\n\t\t\t<ul>\n\t\t\t\t<li @click="changePage(1)" v-show="paginationConfig.first && paginationConfig.currentPage !== 1">{{paginationConfig.firstStr}}</li>\n\t\t\t\t<li @click="prevPage()" v-show="paginationConfig.prev" :class="{\'disabled\': paginationConfig.currentPage === 1}">{{paginationConfig.prevStr}}</li>\n\t\t\t\t<li @click="changePage(item)" v-show="paginationConfig.normal" v-for="item in pageList" :class="{\'gap\': item === \'...\', \'active\': paginationConfig.currentPage === item}" track-by="$index">{{item}}</li>\n\t\t\t\t<li @click="nextPage()" v-show="paginationConfig.next" :class="{\'disabled\': paginationConfig.currentPage === numberOfPages}">{{paginationConfig.nextStr}}</li>\n\t\t\t\t<li @click="changePage(numberOfPages)" v-show="paginationConfig.last && paginationConfig.currentPage !== numberOfPages">{{paginationConfig.lastStr}}</li>\n\t\t\t</ul>\n\t\t</div>',
		props: ['paginationConfig'],
		data: function data() {
			return {
				componentOptions: componentOptions,
				pageList: [],
				numberOfPages: 0
			};
		},
		ready: function ready() {
			this.initConfig();
		},

		methods: {
			changePage: function changePage(page) {
				if (page === '...') {
					return;
				}
				this.paginationConfig.currentPage = page;
			},
			prevPage: function prevPage() {
				if (this.paginationConfig.currentPage > 1) {
					this.paginationConfig.currentPage -= 1;
				}
			},
			nextPage: function nextPage() {
				if (this.paginationConfig.currentPage < this.numberOfPages) {
					this.paginationConfig.currentPage += 1;
				}
			},
			initConfig: function initConfig() {
				if (this.paginationConfig === undefined) return;
				this.paginationConfig = mixin(defaultOptions$1, this.paginationConfig);
				this.numberOfPages = Math.ceil(this.paginationConfig.totalItems / this.paginationConfig.itemsPerPage);
				if (this.paginationConfig.pagesLength % 2 === 0) {
					this.paginationConfig.pagesLength = this.paginationConfig.pagesLength - 1;
				}
			},
			generatePageList: function generatePageList() {
				this.pageList = [];
				var from = void 0,
				    to = void 0;
				var offset = (this.paginationConfig.pagesLength + 1) / 2;
				if (this.paginationConfig.currentPage <= offset) {
					from = 1;
					to = this.numberOfPages < this.paginationConfig.pagesLength ? this.numberOfPages : this.paginationConfig.pagesLength;
					while (from <= to) {
						this.pageList.push(from);
						from++;
					}
					if (this.numberOfPages > this.paginationConfig.pagesLength) {
						this.pageList.push('...');
					}
				} else if (this.paginationConfig.currentPage >= this.numberOfPages - offset) {
					from = this.numberOfPages - this.paginationConfig.pagesLength;
					to = this.numberOfPages;
					while (from <= to) {
						this.pageList.push(from);
						from++;
					}
					this.pageList.unshift('...');
				} else {
					from = this.paginationConfig.currentPage - offset + 1;
					to = this.paginationConfig.currentPage + offset - 1;
					while (from <= to) {
						this.pageList.push(from);
						from++;
					}
					this.pageList.push('...');
					this.pageList.unshift('...');
				}
			}
		},
		watch: {
			'paginationConfig': {
				handler: function handler() {
					this.initConfig();
					this.generatePageList();
				},

				deep: true
			},
			'paginationConfig.currentPage': {
				handler: function handler() {
					this.generatePageList();
					if (typeof this.paginationConfig.onChange !== 'function') {
						warn('Config of "onChange" must be a function!');
						return;
					}
					this.paginationConfig.onChange && this.paginationConfig.onChange();
				}
			}
		}
	};
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var defaultOptions$2 = {
	firstStr: 'First',
	prevStr: 'Prev',
	nextStr: 'Next',
	lastStr: 'Last',
	first: true,
	prev: true,
	next: true,
	last: true,
	normal: true,
	currentPage: 1,
	itemsPerPage: 10,
	pagesLength: 5,
	totalItems: 0,
	onChange: function onChange() {}
};

function v2Pagination (componentOptions) {
	return {
		name: 'vue-pagination',
		render: function render(createElement) {
			var _this = this;

			var pageElements = this.pageList.map(function (item, index) {
				return createElement('li', {
					domProps: {
						innerText: item
					},
					style: {
						display: _this.paginationConfig.normal ? 'inline-block' : 'none'
					},
					on: {
						click: function click() {
							return _this.changePage(item);
						}
					},
					class: {
						gap: item === '...',
						active: _this.paginationConfig.currentPage === item
					},
					key: index
				});
			});
			var liLists = [createElement('li', {
				domProps: {
					innerText: this.paginationConfig.firstStr
				},
				style: {
					display: this.paginationConfig.first && this.paginationConfig.currentPage !== 1 ? 'inline-block' : 'none'
				},
				on: {
					click: function click() {
						return _this.changePage(1);
					}
				}
			}), createElement('li', {
				domProps: {
					innerText: this.paginationConfig.prevStr
				},
				style: {
					display: this.paginationConfig.prev ? 'inline-block' : 'none'
				},
				on: {
					click: function click() {
						return _this.prevPage();
					}
				},
				class: { disabled: this.paginationConfig.currentPage === 1 }
			})];
			if (this.pageList.length) {
				liLists.push.apply(liLists, toConsumableArray(pageElements));
			}
			liLists.push(createElement('li', {
				domProps: {
					innerText: this.paginationConfig.nextStr
				},
				style: {
					display: this.paginationConfig.next ? 'inline-block' : 'none'
				},
				on: {
					click: function click() {
						return _this.nextPage();
					}
				},
				class: { disabled: this.paginationConfig.currentPage === this.numberOfPages }
			}), createElement('li', {
				domProps: {
					innerText: this.paginationConfig.lastStr
				},
				style: {
					display: this.paginationConfig.last && this.paginationConfig.currentPage !== this.numberOfPages ? 'inline-block' : 'none'
				},
				on: {
					click: function click() {
						return _this.changePage(_this.numberOfPages);
					}
				}
			}));

			return createElement('div', {
				style: {
					display: this.paginationConfig.totalItems !== 0 ? 'block' : 'none'
				},
				class: { 'pagination-con': true }
			}, [createElement('ul', {}, liLists)]);
		},

		props: ['paginationConfig'],
		data: function data() {
			return {
				componentOptions: componentOptions,
				pageList: [],
				numberOfPages: 0
			};
		},
		mounted: function mounted() {
			this.initConfig();
			this.generatePageList();
		},

		methods: {
			changePage: function changePage(page) {
				if (page === '...') {
					return;
				}
				this.paginationConfig.currentPage = page;
			},
			prevPage: function prevPage() {
				if (this.paginationConfig.currentPage > 1) {
					this.paginationConfig.currentPage -= 1;
				}
			},
			nextPage: function nextPage() {
				if (this.paginationConfig.currentPage < this.numberOfPages) {
					this.paginationConfig.currentPage += 1;
				}
			},
			initConfig: function initConfig() {
				if (this.paginationConfig === undefined) return;
				var mixedobj = mixin(defaultOptions$2, this.paginationConfig);
				mixin(this.paginationConfig, mixedobj);
				this.numberOfPages = Math.ceil(this.paginationConfig.totalItems / this.paginationConfig.itemsPerPage);
				if (this.paginationConfig.pagesLength % 2 === 0) {
					this.paginationConfig.pagesLength = this.paginationConfig.pagesLength - 1;
				}
			},
			generatePageList: function generatePageList() {
				this.pageList = [];
				var from = void 0,
				    to = void 0;
				var offset = (this.paginationConfig.pagesLength + 1) / 2;
				if (this.paginationConfig.currentPage <= offset) {
					from = 1;
					to = this.numberOfPages < this.paginationConfig.pagesLength ? this.numberOfPages : this.paginationConfig.pagesLength;
					while (from <= to) {
						this.pageList.push(from);
						from++;
					}
					if (this.numberOfPages > this.paginationConfig.pagesLength) {
						this.pageList.push('...');
					}
				} else if (this.paginationConfig.currentPage >= this.numberOfPages - offset) {
					from = this.numberOfPages - this.paginationConfig.pagesLength;
					to = this.numberOfPages;
					while (from <= to) {
						this.pageList.push(from);
						from++;
					}
					this.pageList.unshift('...');
				} else {
					from = this.paginationConfig.currentPage - offset + 1;
					to = this.paginationConfig.currentPage + offset - 1;
					while (from <= to) {
						this.pageList.push(from);
						from++;
					}
					this.pageList.push('...');
					this.pageList.unshift('...');
				}
			}
		},
		watch: {
			'paginationConfig': {
				handler: function handler() {
					this.initConfig();
					this.generatePageList();
				},

				deep: true
			},
			'paginationConfig.currentPage': {
				handler: function handler() {
					this.generatePageList();
					if (typeof this.paginationConfig.onChange !== 'function') {
						warn('Config of "onChange" must be a function!');
						return;
					}
					this.paginationConfig.onChange && this.paginationConfig.onChange();
				}
			}
		}
	};
};

var insertStyleStr = function insertStyleStr(styleStr) {
	var head = document.head || document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = styleStr;
	head.appendChild(style);
};

var styleStr = '\n.pagination-con {\n\ttext-align: center;\n}\n\n.pagination-con ul {\n\tfont-size: 0;\n\tmargin: 21px 0;\n\tborder-radius: 3px;\n}\n\n.pagination-con ul li {\n\tcolor: #5c5c5c;\n\tdisplay: inline-block;\n\tvertical-align: middle;\n\tfont-size: 14px;\n\tpadding: 9px 16px;\n\ttext-align: center;\n\tcursor: pointer;\n\tborder: 1px solid #e5e5e5;\n\tmargin-left: -1px;\n\tfont-weight: 600;\n}\n\n.pagination-con ul li:hover {\n\tbackground-color: #f7faff;\n}\n\n.pagination-con ul li.active, .pagination-con ul li.active:hover {\n\tcolor: #2897ce;\n\tbackground: #fff;\n\tcursor: default;\n}\n\n.pagination-con ul li.gap {\n\tcursor: default;\n}\n\n.pagination-con ul .disabled, .pagination-con ul .disabled:hover {\n\tcolor: #cdcdcd;\n\tbackground-color: #fafafa;\n\tcursor: not-allowed;\n} \n';

insertStyleStr(styleStr);

var Pagination = function Pagination() {
	classCallCheck(this, Pagination);
};

;

var defaultOptions = {
	tagName: 'v-pagination'
};

Pagination.install = function (Vue) {
	var customOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var options = mixin(defaultOptions, customOptions);
	if (Vue.version && /^2\..+/.test(Vue.version)) {
		Vue.component(options.tagName, Vue.extend(v2Pagination(options)));
	} else {
		Vue.component(options.tagName, Vue.extend(vPagination(options)));
	}
};

if (typeof window !== 'undefined' && window.Vue) {

	window.Vue.use(Pagination);
}

return Pagination;

})));