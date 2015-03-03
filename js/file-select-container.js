angular.module('main')
    .directive('fileSelectContainer', function($compile) {
        return {
            scope: {

            },
            link: function(scope, element, attrs) {
                var input;
                var previewContainerId = attrs.previewContainerId;
                var selectFileButtonId = attrs.selectFileButtonId;
                var previewWidth = attrs.previewWidth || 100;
                var previewHeight = attrs.previewHeight || 100;
                element = $(element);
                var img;
                scope.onFileSelect = function($files) {
                    var file = scope.$parent.file = $files[0];
                    if(!file){
                        if(img){
                            img.remove();
                        }
                        return;
                    }

                    var reader = new FileReader();

                    reader.onload = function (e) {
                        var url = e.target.result;
                        img = $('<img src="' + url + '" />');
                        img.css({
                            maxWidth: previewWidth + "px",
                            maxHeight: previewHeight + "px"
                        });

                        var parent = element;
                        if(previewContainerId){
                            parent = element.find("#" + previewContainerId);
                        }

                        parent.html("");
                        parent.append(img);
                    };

                    reader.readAsDataURL(file);
                };

                input = $($compile('<input style="opacity:0;width:0px;height:0px;" ' +
                'class="custom-file-input" type="file" name="file" ' +
                'ng-file-select="onFileSelect($files)" multiple accept="image/*">')(scope));
                input.insertBefore(element);

                var button = element;
                if(selectFileButtonId){
                    button = element.find("#" + selectFileButtonId);
                }

                button.click(function(){
                    input.click();
                });
            }
        };
    });
