/*
jQuery imgLoading-1.0
par Gildas P. / www.gildasp.fr
https://github.com/GildasP/jQuery-imgLoading
*/

(function($) {

	$.fn.imgLoadingLoop = function(nbImg){
		// la cible peut être un multiple

		imageCount = 0;  
	    this.cible.each(function(){
	        // get(0) pour atteindre l'objet du DOM directement
	        if ($(this).get(0).complete) {
	            imageCount++;         
	        };
	    });   
	    //$('#debug').append(' '+imageCount+'/'+nbImg);
	    
	    if(imageCount >= nbImg){ 

		    // end loop
		    clearInterval(this.imgLoadingTimer);

		    // trigger final event
		    this.trigger("onImgLoaded", {loaded: imageCount, total: nbImg, target: this});

		    // unbind ?
		    this.unbind("onImgProgress");
		    this.unbind("onImgLoaded");

	    } else {
	    	// progress event
	    	this.trigger("onImgProgress", {loaded: imageCount, total: nbImg, target: this});
	    }
	};


    $.fn.imgLoading = function(params) {

    	if(typeof params == 'function'){
    		params = {end: params};
    	}

    	params = $.extend({
    		start: function(){},
    		progress: function(){},
    		end: function(){}
    	}, params);

    	/////

    	// sécurité : cherche les images dans l'objet, y compris l'objet lui-même...
		this.cible = this.find('img').add(this.filter('img'));

		// nb d'images à précharger
		this.nbImg = this.cible.length;

		// clear previous events
		this.unbind("onImgLoadStart onImgProgress onImgLoaded");

		// onImgLoadStart event
		this.bind("onImgLoadStart", function(e, data){
			params.start(e, data);
			data.target.unbind("onImgLoadStart");
		});

		if(this.nbImg>0){
			// trigger start
			this.cible.trigger("onImgLoadStart", {loaded: 0, total: this.nbImg, target: this});

			// onImgProgress event
			this.bind("onImgProgress", function(e, data){
				params.progress(e, data);
			});
		}

		// onImgLoaded event
		this.bind("onImgLoaded", function(e, data){
			params.end(e, data);
			data.target.unbind("onImgLoaded");
		});

		// start loop dans un objet local, pour pouvoir cumuler plusieurs écoutes distinctes
		this.imgLoadingTimer = setInterval($.proxy(
			this.imgLoadingLoop, this, this.nbImg
		), 100);

    	/////
    	return this;
    };

})(jQuery);