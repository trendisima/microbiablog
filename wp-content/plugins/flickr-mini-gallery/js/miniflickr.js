// JavaScript Document..
jQuery(function($){
	//image folder
	var imgs_url = theblogurl+'/wp-content/plugins/flickr-mini-gallery/images';
	function initialize_flickr(){
		if($('.flickr-mini-gallery')){
			if($('.fmg-hover-image')){
				$("body").append('<div id="fmg-float-img"><img class="fmg-float-img-loading" src="'+imgs_url+'/lightbox-ico-loading.gif" /><img class="fmg-float-img-tag" src=""/><p class="fmg-description"></p></div>');
			
			}
			
			$('.flickr-mini-gallery').each(function (i) {
					$(this).empty();					 
					var filter = $(this).attr('rel');
					//var format = $(this).attr("lang"); modificado por GENO;
					var format = flickr_mini_gallery_img_format;
					var hasTitle = $(this).hasClass("fmg-hover-image");
					build_gallery(filter, this, format, hasTitle);
					
			});
			
		}
		
		
	}
	function build_gallery(filter, obj, format, hasTitle){
	var myVar=1;
	var imgID ='myImage';
	  var api = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=36c8b00c47e8934ff302dcad7775d0a2&tag_mode=all&"+filter; 
		$.getJSON(api+"&format=json&jsoncallback=?",
	        function(data){
	          $.each(data.photos.photo, function(i,item){
		          if(hasTitle){
		          	var attrib = {src: "http://static.flickr.com/"+item.server+"/"+item.id+"_"+item.secret+format+".jpg", alt:item.title}
		          }else{
		          	var attrib = {src: "http://static.flickr.com/"+item.server+"/"+item.id+"_"+item.secret+format+".jpg", alt:item.title, title:item.title}
		          }
			  $("<img/>").attr(attrib).appendTo(obj).wrap("<a href=http://static.flickr.com/"+item.server+"/"+item.id+"_"+item.secret+".jpg alt="+item.id+"></a>").addClass("flickr-mini-gallery-thumb");
			  myVar++;
	         });
			 $(".flickr-mini-gallery a:has(img)").lightBox();
	      });	 
	}
	
	
	
	// reveals bigger image when you pass the mouse over it
	$(".fmg-hover-image a:has(img)").live("mouseover", function(){
		var src = $("img", this).attr("src");
		var title = $("img", this).attr("alt");
		var img = src.replace("_t", "_m");
		var url = img.replace("_s", "_m");
		$("#fmg-float-img").show()
		$("#fmg-float-img .fmg-description").hide()		
		$("#fmg-float-img .fmg-float-img-loading").show()
		$("#fmg-float-img .fmg-float-img-tag").hide().attr("src",url).load(function() {
  			$("#fmg-float-img .fmg-float-img-loading").hide()
  			$(".fmg-float-img-tag").fadeIn(500, function(){
  				//console.log(title)
  				
  			});
  			$("#fmg-float-img .fmg-description").text(title).slideDown()
		})
	});
	
	$(".fmg-hover-image a:has(img)").live("mouseout", function(){
		$("#fmg-float-img").hide()
		$("#fmg-float-img .fmg-description").hide()		
		$("#fmg-float-img .fmg-float-img-loading").hide()
	});
	$('.fmg-hover-image').live("mousemove",function(e) {
		var pos = $(this).position()
		var h = $("#fmg-float-img").height() 
  		$("#fmg-float-img").css({top:e.pageY-40, left:e.pageX+20})
  		//console.log((e.pageY - pos.top) +", "+(e.pageX - pos.left))
	});
	
	function add_description(n){
		//var img_id = $(".felickr a[alt]:eq["+n+"]");
		var img_id = '2388852124';
		$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=36c8b00c47e8934ff302dcad7775d0a2&photo_id='+img_id+'&format=json&jsoncallback=?',
	        	function(data){
					var textInfo = data.photo.description._content;
					$(".felickr:first").append(textInfo+"<br/>");					
	         	});
	}
	function description(){
		$(".felickr img").each(function(i){
				add_description(i)						
		})
	}
	$(document).ready(function(){
		initialize_flickr()	;
	});
});