(function ($) {
	$.delta = $.delta || {};
	
	var Img = function(){
		var self = this;
		
		//init
		self.init = function(scope){
			$(scope).each(function () { 
				ko.applyBindings(self, this); 
			});
		};
		
		//window detection observables
		self.windowSize = ko.observable($(window).width());
		
		//your break point... could be an array or obj
		self.maxMobileBreakpoint = ko.observable(767);
			
		//some kind of object with my image possibilites
		self.possibleImages = 
		{
			"image1":
			{
				"mobile":"http://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Helvellyn_Striding_Edge_360_Panorama%2C_Lake_District_-_June_09.jpg/800px-Helvellyn_Striding_Edge_360_Panorama%2C_Lake_District_-_June_09.jpg",
				"desktop":"http://upload.wikimedia.org/wikipedia/commons/6/6f/Helvellyn_Striding_Edge_360_Panorama,_Lake_District_-_June_09.jpg"
			}
		}
		
		self.fakeVm = ko.observable(self.possibleImages);
		
		self.loadingIcon = ko.observable();
		
		
		self.preLoadImage = function(imgSrc){
		  var objImagePreloader = new Image();

		  objImagePreloader.src = imgSrc;
		  if(objImagePreloader.complete){
		    objImagePreloader.onload=function(){};
		  }
		  else{
		    objImagePreloader.onload = function() {
			  
		      //    clear onLoad, IE behaves irratically with animated gifs otherwise
		      objImagePreloader.onload=function(){};
		    }
		  }
		}
		
		
		//evaluations and triggering... subscribed to the window
		self.loadImagery = ko.computed(function(){
			read:{
				if(self.windowSize() <= self.maxMobileBreakpoint()){
					self.preLoadImage(self.possibleImages.image1.mobile);
					return self.possibleImages.image1.mobile;
				} else {
					self.preLoadImage(self.possibleImages.image1.desktop);
					return self.possibleImages.image1.desktop;
				}
			}
		});
		
		//subscribe to the observable
		self.windowSize.subscribe(function(){
			//on new val update the observable
			self.windowSize(window.outerWidth);
		});
		
	}
	
	$.delta.img = new Img();
	
	$(document).ready(function(){
		$.delta.img.init('body');
		$(window).resize(function(){
			//update the observable
			$.delta.img.windowSize(window.outerWidth);
		});
	})
	
})(jQuery);