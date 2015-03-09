(function(){var e;try{e=angular.module("angularUtils.directives.dirPagination")}catch(u){e=angular.module("angularUtils.directives.dirPagination",[])}e.directive("dirPaginate",["$compile","$parse","$timeout","paginationService",function(c,g,a,d){return{terminal:!0,multiElement:!0,priority:5E3,compile:function(b,a){b[0].hasAttribute("dir-paginate-start")||b[0].hasAttribute("data-dir-paginate-start")?(a.$set("ngRepeatStart",a.dirPaginate),b.eq(b.length-1).attr("ng-repeat-end",!0)):a.$set("ngRepeat",
    a.dirPaginate);var h=a.dirPaginate.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),t=/\|\s*itemsPerPage\s*:[^|]*/;if(null===h[2].match(t))throw"pagination directive: the 'itemsPerPage' filter must be set.";var h=h[2].replace(t,""),p=g(h),f=a.paginationId||"__default";d.registerInstance(f);return function(b,a,h){a=c(a,!1,5E3);var m;h.currentPage?m=g(h.currentPage):(m=f+"__currentPage",b[m]=1,m=g(m));d.setCurrentPageParser(f,m,b);"undefined"!==typeof h.totalItems?(d.setAsyncModeTrue(f),
    b.$watch(function(){return g(h.totalItems)(b)},function(b){0<=b&&d.setCollectionLength(f,b)})):b.$watchCollection(function(){return p(b)},function(b){b&&d.setCollectionLength(f,b.length)});a(b)}}}}]);e.directive("dirPaginationControls",["paginationService","paginationTemplate",function(c,g){function a(b,a,c,d){var g=[];a=Math.ceil(a/c);c=Math.ceil(d/2);c=b<=c?"start":a-c<b?"end":"middle";for(var f=d<a,l=1;l<=a&&l<=d;){var k;k=l;var n=b,e=d,q=a,r=Math.ceil(e/2);k=k===e?q:1===k?k:e<q?q-r<n?q-e+k:r<
n?n-r+k:k:k;n=2===l&&("middle"===c||"end"===c);e=l===d-1&&("middle"===c||"start"===c);f&&(n||e)?g.push("..."):g.push(k);l++}return g}var d=/^\d+$/;return{restrict:"AE",templateUrl:function(b,a){return a.templateUrl||g.getPath()},scope:{maxSize:"=?",onPageChange:"&?"},link:function(b,g,h){function e(d){if(p(d)&&(b.pages=a(d,c.getCollectionLength(f),c.getItemsPerPage(f),l),b.pagination.current=d,b.onPageChange))b.onPageChange({newPageNumber:d})}function p(a){return d.test(a)&&0<a&&a<=b.pagination.last}
    var f;f=h.paginationId||"__default";b.maxSize||(b.maxSize=9);b.directionLinks=angular.isDefined(h.directionLinks)?b.$parent.$eval(h.directionLinks):!0;b.boundaryLinks=angular.isDefined(h.boundaryLinks)?b.$parent.$eval(h.boundaryLinks):!1;if(!c.isRegistered(f))throw"pagination directive: the pagination controls"+("__default"!==f?" (id: "+f+") ":" ")+"cannot be used without the corresponding pagination directive.";var l=Math.max(b.maxSize,5);b.pages=[];b.pagination={last:1,current:1};b.$watch(function(){return(c.getCollectionLength(f)+
        1)*c.getItemsPerPage(f)},function(d){0<d&&(d=parseInt(c.getCurrentPage(f))||1,b.pages=a(d,c.getCollectionLength(f),c.getItemsPerPage(f),l),b.pagination.current=d,b.pagination.last=b.pages[b.pages.length-1],b.pagination.last<b.pagination.current&&b.setCurrentPage(b.pagination.last))});b.$watch(function(){return c.getItemsPerPage(f)},function(a,c){a!=c&&e(b.pagination.current)});b.$watch(function(){return c.getCurrentPage(f)},function(a,b){a!=b&&e(a)});b.setCurrentPage=function(a){p(a)&&c.setCurrentPage(f,
        a)};b.getCurrentPage=function(){return c.getCurrentPage(f)}}}}]);e.filter("itemsPerPage",["paginationService",function(c){return function(g,a,d){"undefined"===typeof d&&(d="__default");if(!c.isRegistered(d))throw"pagination directive: the itemsPerPage id argument (id: "+d+") does not match a registered pagination-id.";var b,e;return g instanceof Array?(a=parseInt(a)||9999999999,e=c.isAsyncMode(d)?0:(c.getCurrentPage(d)-1)*a,b=e+a,c.setItemsPerPage(d,a),g.slice(e,b)):g}}]);e.service("paginationService",
    function(){var c={},e;this.registerInstance=function(a){"undefined"===typeof c[a]&&(c[a]={asyncMode:!1},e=a)};this.isRegistered=function(a){return"undefined"!==typeof c[a]};this.getLastInstanceId=function(){return e};this.setCurrentPageParser=function(a,d,b){c[a].currentPageParser=d;c[a].context=b};this.setCurrentPage=function(a,d){c[a].currentPageParser.assign(c[a].context,d)};this.getCurrentPage=function(a){var d=c[a].currentPageParser;return d?d(c[a].context):1};this.setItemsPerPage=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        d){c[a].itemsPerPage=d};this.getItemsPerPage=function(a){return c[a].itemsPerPage};this.setCollectionLength=function(a,d){c[a].collectionLength=d};this.getCollectionLength=function(a){return c[a].collectionLength};this.setAsyncModeTrue=function(a){c[a].asyncMode=!0};this.isAsyncMode=function(a){return c[a].asyncMode}});e.provider("paginationTemplate",function(){var c="directives/pagination/dirPagination.tpl.html";this.setPath=function(e){c=e};this.$get=function(){return{getPath:function(){return c}}}})})();